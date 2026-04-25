import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export default function useResume() {
  const [profile, setProfile] = useState(null);
  const [languages, setLanguages] = useState([]);
  const [toolbox, setToolbox] = useState([]);
  const [education, setEducation] = useState([]);
  const [experience, setExperience] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadResume() {
      try {
        setLoading(true);

        // 1. Profile
        const { data: profileData, error: profileErr } = await supabase
          .from("profile")
          .select("*")
          .limit(1)
          .single();

        if (profileErr) throw profileErr;

        // 2. Languages
        const { data: langData } = await supabase
          .from("languages")
          .select("*")
          .order("sort_order");

        // 3. Toolbox categories + items
        const { data: categories } = await supabase
          .from("toolbox_categories")
          .select("*")
          .order("sort_order");

        const { data: items } = await supabase
          .from("toolbox_items")
          .select("*")
          .order("sort_order");

        const groupedToolbox = categories.map((cat) => ({
          category: cat.category_name,
          items: items
            .filter((i) => i.category_id === cat.id)
            .map((i) => i.item_name)
        }));

        // 4. Education
        const { data: eduData } = await supabase
          .from("education")
          .select("*")
          .order("sort_order");

        // 5. Experience roles + bullets
        const { data: roles } = await supabase
          .from("experience_roles")
          .select("*")
          .order("sort_order");

        const { data: bullets } = await supabase
          .from("experience_bullets")
          .select("*")
          .order("sort_order");

        const groupedExperience = roles.map((role) => ({
          title: role.title,
          company: role.company,
          dates: role.dates_text,
          bullets: bullets
            .filter((b) => b.role_id === role.id)
            .map((b) => b.bullet_text)
        }));

        // Set state
        setProfile(profileData);
        setLanguages(langData);
        setToolbox(groupedToolbox);
        setEducation(eduData);
        setExperience(groupedExperience);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadResume();
  }, []);

  return {
    profile,
    languages,
    toolbox,
    education,
    experience,
    loading,
    error
  };
}