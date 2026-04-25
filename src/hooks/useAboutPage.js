import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export default function useAboutPage() {
  const [about, setAbout] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadAbout() {
      try {
        setLoading(true);

        const { data, error: err } = await supabase
          .from("about_page")
          .select("*")
          .limit(1)
          .single();

        if (err) throw err;

        setAbout(data);
      } catch (e) {
        console.error(e);
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }

    loadAbout();
  }, []);

  return { about, loading, error };
}