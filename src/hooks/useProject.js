import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export default function useProject(id) {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadProject() {
      try {
        setLoading(true);

        // 1. Load the base project row
        const { data: proj, error: projErr } = await supabase
          .from("projects")
          .select("*")
          .eq("id", id)
          .single();

        if (projErr) throw projErr;

        // 2. Load related data
        const { data: stackRows } = await supabase
          .from("project_stack_items")
          .select("*")
          .eq("project_id", id)
          .order("sort_order");

        const { data: bulletRows } = await supabase
          .from("project_bullets")
          .select("*")
          .eq("project_id", id)
          .order("sort_order");

        const { data: diagramRows } = await supabase
          .from("project_diagrams")
          .select("*")
          .eq("project_id", id)
          .order("sort_order");

        const { data: codeRows } = await supabase
          .from("project_code_samples")
          .select("*")
          .eq("project_id", id)
          .order("sort_order");

        // 3. Build the final project object
        setProject({
          ...proj,
          stack: stackRows?.map((s) => s.tech_name) || [],
          bullets: bulletRows?.map((b) => b.bullet_text) || [],
          diagrams:
            diagramRows?.map((d) => ({
              title: d.title,
              description: d.description,
              diagram: d.diagram_text
            })) || [],
          codeSamples:
            codeRows?.map((c) => ({
              title: c.title,
              description: c.description,
              code: c.code_text
            })) || []
        });
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadProject();
  }, [id]);

  return { project, loading, error };
}