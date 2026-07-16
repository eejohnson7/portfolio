import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export default function useHomePage() {
  const [home, setHome] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadHome() {
      try {
        setLoading(true);

        const { data, error: err } = await supabase
          .from("home_page")
          .select("*")
          .limit(1)
          .single();

        if (err) throw err;

        setHome(data);
      } catch (e) {
        console.error(e);
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }

    loadHome();
  }, []);

  return { home, loading, error };
}