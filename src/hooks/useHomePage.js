import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

const HOMEPAGE_SKILL_CATEGORIES = new Set([
  "Languages",
  "Frontend",
  "Backend",
  "Data & Analytics",
  "Databases",
  "Cloud & DevOps"
]);

const HOME_PAGE_FIELDS = [
  "title",
  "eyebrow",
  "headline",
  "description",
  "secondary_description",
  "focus_items",
  "process_label",
  "process_text",
  "primary_cta_text",
  "primary_cta_url",
  "secondary_cta_text",
  "secondary_cta_url",
  "capabilities_eyebrow",
  "capabilities_title",
  "capabilities_description",
  "work_eyebrow",
  "work_title",
  "work_description",
  "skills_eyebrow",
  "skills_title",
  "skills_description",
  "range_eyebrow",
  "range_title",
  "range_description",
  "final_cta_title",
  "final_cta_description",
  "final_primary_cta_text",
  "final_primary_cta_url",
  "final_secondary_cta_text",
  "final_secondary_cta_url",
  "final_tertiary_cta_text",
  "final_tertiary_cta_url"
].join(", ");

export default function useHomePage() {
  const [home, setHome] = useState(null);
  const [capabilities, setCapabilities] = useState([]);
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [professionalRange, setProfessionalRange] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function loadHome() {
      try {
        setLoading(true);
        setError(null);

        const [
          homeResult,
          capabilitiesResult,
          projectsResult,
          stacksResult,
          categoriesResult,
          itemsResult,
          professionalRangeResult
        ] = await Promise.all([
          supabase
            .from("home_page")
            .select(HOME_PAGE_FIELDS)
            .order("id")
            .limit(1)
            .maybeSingle(),
          supabase
            .from("home_capabilities")
            .select("id, title, description, detail, icon_key, sort_order")
            .eq("active", true)
            .order("sort_order"),
          supabase
            .from("projects")
            .select("id, title, homepage_description, sort_order")
            .eq("homepage_featured", true)
            .order("sort_order"),
          supabase
            .from("project_stack_items")
            .select("project_id, tech_name, sort_order")
            .order("sort_order"),
          supabase
            .from("toolbox_categories")
            .select("id, category_name, sort_order")
            .order("sort_order"),
          supabase
            .from("toolbox_items")
            .select("category_id, item_name, sort_order")
            .eq("homepage_featured", true)
            .order("sort_order"),
          supabase
            .from("home_professional_range")
            .select(
              "id, eyebrow, title, description, icon_key, featured, sort_order"
            )
            .eq("active", true)
            .order("sort_order")
        ]);

        const firstError = [
          homeResult,
          capabilitiesResult,
          projectsResult,
          stacksResult,
          categoriesResult,
          itemsResult,
          professionalRangeResult
        ].find((result) => result.error)?.error;

        if (firstError) throw firstError;

        if (!homeResult.data) {
          throw new Error("Homepage content is not configured.");
        }

        const projectStackItems = stacksResult.data ?? [];
        const toolboxCategories = categoriesResult.data ?? [];
        const toolboxItems = itemsResult.data ?? [];

        const projects = (projectsResult.data ?? []).map((project) => ({
          ...project,
          description: project.homepage_description,
          stack: projectStackItems
            .filter((item) => item.project_id === project.id)
            .map((item) => item.tech_name)
        }));

        const skillGroups = toolboxCategories
          .filter((category) => HOMEPAGE_SKILL_CATEGORIES.has(category.category_name))
          .map((category) => ({
            category: category.category_name,
            items: toolboxItems
              .filter((item) => item.category_id === category.id)
              .map((item) => item.item_name)
          }))
          .filter((group) => group.items.length > 0);

        if (!cancelled) {
          setHome(homeResult.data);
          setCapabilities(capabilitiesResult.data ?? []);
          setFeaturedProjects(projects);
          setSkills(skillGroups);
          setProfessionalRange(professionalRangeResult.data ?? []);
        }
      } catch (err) {
        console.error(err);
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadHome();

    return () => {
      cancelled = true;
    };
  }, []);

  return {
    home,
    capabilities,
    featuredProjects,
    skills,
    professionalRange,
    loading,
    error
  };
}
