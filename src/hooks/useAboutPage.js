import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

const ABOUT_PAGE_FIELDS = [
  "id",
  "intro_title",
  "headline",
  "intro_text",
  "path_eyebrow",
  "path_title",
  "path_text",
  "values_eyebrow",
  "values_title",
  "values_text",
  "life_eyebrow",
  "life_title",
  "life_text",
  "business_eyebrow",
  "business_title",
  "business_text",
  "hospitality_title",
  "hospitality_text",
  "interests_title",
  "interest_items",
  "cta_eyebrow",
  "cta_title",
  "cta_text",
  "cta_links"
].join(", ");

export default function useAboutPage() {
  const [about, setAbout] = useState(null);
  const [values, setValues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function loadAbout() {
      try {
        setLoading(true);
        setError(null);

        const [aboutResult, valuesResult] = await Promise.all([
          supabase
            .from("about_page")
            .select(ABOUT_PAGE_FIELDS)
            .order("id")
            .limit(1)
            .maybeSingle(),
          supabase
            .from("about_values")
            .select("id, title, icon_key, sort_order")
            .eq("active", true)
            .order("sort_order")
        ]);

        const firstError = aboutResult.error || valuesResult.error;
        if (firstError) throw firstError;

        if (!aboutResult.data) {
          throw new Error("About-page content is not configured.");
        }

        if (!cancelled) {
          setAbout(aboutResult.data);
          setValues(valuesResult.data ?? []);
        }
      } catch (err) {
        console.error(err);
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadAbout();

    return () => {
      cancelled = true;
    };
  }, []);

  return { about, values, loading, error };
}
