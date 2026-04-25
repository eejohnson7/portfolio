import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export default function useProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadProjects() {
      try {
        setLoading(true);

        // 1. Load base project rows
        const { data: projectRows, error: projectErr } = await supabase
          .from("projects")
          .select("*")
          .order("sort_order");

        if (projectErr) throw projectErr;

        // 2. Load stack items
        const { data: stackRows } = await supabase
          .from("project_stack_items")
          .select("*")
          .order("sort_order");

        // 3. Load bullets
        const { data: bulletRows } = await supabase
          .from("project_bullets")
          .select("*")
          .order("sort_order");

        // 4. Load diagrams
        const { data: diagramRows } = await supabase
          .from("project_diagrams")
          .select("*")
          .order("sort_order");

        // 5. Load code samples
        const { data: codeRows } = await supabase
          .from("project_code_samples")
          .select("*")
          .order("sort_order");

        // 6. Group everything by project
        const grouped = projectRows.map((proj) => ({
          ...proj,
          stack: stackRows
            .filter((s) => s.project_id === proj.id)
            .map((s) => s.tech_name),

          bullets: bulletRows
            .filter((b) => b.project_id === proj.id)
            .map((b) => b.bullet_text),

          diagrams: diagramRows
            .filter((d) => d.project_id === proj.id)
            .map((d) => ({
              title: d.title,
              description: d.description,
              diagram: d.diagram_text
            })),

          codeSamples: codeRows
            .filter((c) => c.project_id === proj.id)
            .map((c) => ({
              title: c.title,
              description: c.description,
              code: c.code_text
            }))
        }));

        setProjects(grouped);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadProjects();
  }, []);

  return { projects, loading, error };
}