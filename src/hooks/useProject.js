import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { isMissingProjectMetadata } from "./projectQueries";

export default function useProject(id) {
  const [project, setProject] = useState(null);
  const [previousProject, setPreviousProject] = useState(null);
  const [nextProject, setNextProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function loadProject() {
      try {
        setLoading(true);
        setError(null);
        setProject(null);

        async function loadBaseProject() {
          const enrichedResult = await supabase
            .from("projects")
            .select(
              "id, title, description, long_description, architecture_notes, sort_order, homepage_featured, category, context_label, role, impact"
            )
            .eq("id", id)
            .single();

          if (!isMissingProjectMetadata(enrichedResult.error)) return enrichedResult;

          return supabase
            .from("projects")
            .select(
              "id, title, description, long_description, architecture_notes, sort_order, homepage_featured"
            )
            .eq("id", id)
            .single();
        }

        const [
          projectResult,
          stacksResult,
          bulletsResult,
          diagramsResult,
          codeResult,
          navigationResult
        ] = await Promise.all([
          loadBaseProject(),
          supabase
            .from("project_stack_items")
            .select("tech_name, sort_order")
            .eq("project_id", id)
            .order("sort_order"),
          supabase
            .from("project_bullets")
            .select("bullet_text, sort_order")
            .eq("project_id", id)
            .order("sort_order"),
          supabase
            .from("project_diagrams")
            .select("title, description, diagram_text, sort_order")
            .eq("project_id", id)
            .order("sort_order"),
          supabase
            .from("project_code_samples")
            .select("title, description, code_text, sort_order")
            .eq("project_id", id)
            .order("sort_order"),
          supabase
            .from("projects")
            .select("id, title, sort_order")
            .order("sort_order")
        ]);

        const firstError = [
          projectResult,
          stacksResult,
          bulletsResult,
          diagramsResult,
          codeResult,
          navigationResult
        ].find((result) => result.error)?.error;

        if (firstError) throw firstError;

        const projectRows = navigationResult.data ?? [];
        const projectIndex = projectRows.findIndex((item) => item.id === id);

        if (!cancelled) {
          setProject({
            ...projectResult.data,
            stack: (stacksResult.data ?? []).map((item) => item.tech_name),
            bullets: (bulletsResult.data ?? []).map((item) => item.bullet_text),
            diagrams: (diagramsResult.data ?? []).map((item) => ({
              title: item.title,
              description: item.description,
              diagram: item.diagram_text
            })),
            codeSamples: (codeResult.data ?? []).map((item) => ({
              title: item.title,
              description: item.description,
              code: item.code_text
            }))
          });
          setPreviousProject(projectIndex > 0 ? projectRows[projectIndex - 1] : null);
          setNextProject(
            projectIndex >= 0 && projectIndex < projectRows.length - 1
              ? projectRows[projectIndex + 1]
              : null
          );
        }
      } catch (err) {
        console.error(err);
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadProject();

    return () => {
      cancelled = true;
    };
  }, [id]);

  return { project, previousProject, nextProject, loading, error };
}
