import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { isMissingProjectMetadata } from "./projectQueries";

export default function useProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function loadProjects() {
      try {
        setLoading(true);
        setError(null);

        async function loadProjectRows() {
          const enrichedResult = await supabase
            .from("projects")
            .select(
              "id, title, description, sort_order, homepage_featured, category, context_label, role, impact"
            )
            .order("sort_order");

          if (!isMissingProjectMetadata(enrichedResult.error)) return enrichedResult;

          return supabase
            .from("projects")
            .select("id, title, description, sort_order, homepage_featured")
            .order("sort_order");
        }

        const [projectsResult, stacksResult] = await Promise.all([
          loadProjectRows(),
          supabase
            .from("project_stack_items")
            .select("project_id, tech_name, sort_order")
            .order("sort_order")
        ]);

        const firstError = projectsResult.error || stacksResult.error;
        if (firstError) throw firstError;

        const projectRows = projectsResult.data ?? [];
        const stackRows = stacksResult.data ?? [];
        const grouped = projectRows.map((project) => ({
          ...project,
          stack: stackRows
            .filter((item) => item.project_id === project.id)
            .map((item) => item.tech_name)
        }));

        if (!cancelled) setProjects(grouped);
      } catch (err) {
        console.error(err);
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadProjects();

    return () => {
      cancelled = true;
    };
  }, []);

  return { projects, loading, error };
}
