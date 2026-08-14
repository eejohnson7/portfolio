-- Migration unit 1: schema_changes
-- Transaction mode: transactional
-- Boundary reason: default

SET check_function_bodies = false;
DROP EXTENSION pg_net;
DROP EXTENSION pg_graphql;
CREATE SCHEMA projects AUTHORIZATION postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT DELETE, INSERT, SELECT, UPDATE ON TABLES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT SELECT, USAGE ON SEQUENCES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON ROUTINES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT DELETE, INSERT, SELECT, UPDATE ON TABLES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT SELECT, USAGE ON SEQUENCES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON ROUTINES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT DELETE, INSERT, SELECT, UPDATE ON TABLES TO service_role;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT SELECT, USAGE ON SEQUENCES TO service_role;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON ROUTINES TO service_role;
CREATE FUNCTION public.set_updated_at()
  RETURNS TRIGGER
  LANGUAGE plpgsql
  AS $function$
begin
  new.updated_at = now();
  return new;
end;
$function$;
GRANT ALL ON FUNCTION public.set_updated_at() TO anon;
GRANT ALL ON FUNCTION public.set_updated_at() TO authenticated;
GRANT ALL ON FUNCTION public.set_updated_at() TO service_role;
CREATE TABLE public.about_page (
  id           uuid                     DEFAULT gen_random_uuid() NOT NULL,
  intro_title  text,
  intro_text   text,
  path_title   text,
  path_text    text,
  values_title text,
  values_text  text,
  life_title   text,
  life_text    text,
  created_at   timestamp with time zone DEFAULT now() NOT NULL,
  updated_at   timestamp with time zone DEFAULT now() NOT NULL
);
ALTER TABLE public.about_page
  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.about_page
  ADD CONSTRAINT about_page_pkey PRIMARY KEY (id);
GRANT ALL ON public.about_page TO anon;
GRANT ALL ON public.about_page TO authenticated;
GRANT ALL ON public.about_page TO service_role;
CREATE UNIQUE INDEX one_about_page_only_idx ON public.about_page ((true));
CREATE TRIGGER set_about_page_updated_at
  BEFORE UPDATE ON public.about_page
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();
CREATE POLICY "Public can read about page" ON public.about_page
  FOR SELECT
  USING (true);
CREATE TABLE public.education (
  id         uuid                     DEFAULT gen_random_uuid() NOT NULL,
  profile_id uuid                     NOT NULL,
  school     text                     NOT NULL,
  degree     text,
  sort_order integer                  DEFAULT 0 NOT NULL,
  created_at timestamp with time zone DEFAULT now() NOT NULL
);
ALTER TABLE public.education
  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.education
  ADD CONSTRAINT education_pkey PRIMARY KEY (id);
GRANT ALL ON public.education TO anon;
GRANT ALL ON public.education TO authenticated;
GRANT ALL ON public.education TO service_role;
CREATE INDEX education_profile_id_idx ON public.education (profile_id, sort_order);
CREATE POLICY "Public can read education" ON public.education
  FOR SELECT
  USING (true);
CREATE TABLE public.experience_bullets (
  id          uuid                     DEFAULT gen_random_uuid() NOT NULL,
  role_id     uuid                     NOT NULL,
  bullet_text text                     NOT NULL,
  sort_order  integer                  DEFAULT 0 NOT NULL,
  created_at  timestamp with time zone DEFAULT now() NOT NULL
);
ALTER TABLE public.experience_bullets
  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experience_bullets
  ADD CONSTRAINT experience_bullets_pkey PRIMARY KEY (id);
GRANT ALL ON public.experience_bullets TO anon;
GRANT ALL ON public.experience_bullets TO authenticated;
GRANT ALL ON public.experience_bullets TO service_role;
CREATE INDEX experience_bullets_role_id_idx ON public.experience_bullets (role_id, sort_order);
CREATE POLICY "Public can read experience bullets" ON public.experience_bullets
  FOR SELECT
  USING (true);
CREATE TABLE public.experience_roles (
  id            uuid                     DEFAULT gen_random_uuid() NOT NULL,
  profile_id    uuid                     NOT NULL,
  title         text                     NOT NULL,
  company       text,
  location_type text,
  dates_text    text,
  start_date    date,
  end_date      date,
  is_current    boolean                  DEFAULT false NOT NULL,
  sort_order    integer                  DEFAULT 0 NOT NULL,
  created_at    timestamp with time zone DEFAULT now() NOT NULL
);
ALTER TABLE public.experience_roles
  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experience_roles
  ADD CONSTRAINT experience_roles_pkey PRIMARY KEY (id);
ALTER TABLE public.experience_bullets
  ADD CONSTRAINT experience_bullets_role_id_fkey FOREIGN KEY (role_id) REFERENCES public.experience_roles(id) ON DELETE CASCADE;
GRANT ALL ON public.experience_roles TO anon;
GRANT ALL ON public.experience_roles TO authenticated;
GRANT ALL ON public.experience_roles TO service_role;
CREATE INDEX experience_roles_profile_id_idx ON public.experience_roles (profile_id, sort_order);
CREATE POLICY "Public can read experience roles" ON public.experience_roles
  FOR SELECT
  USING (true);
CREATE TABLE public.home_page (
  id                 bigint                   GENERATED BY DEFAULT AS IDENTITY NOT NULL,
  created_at         timestamp with time zone DEFAULT now() NOT NULL,
  description        text                     DEFAULT ''::text,
  title              text                     DEFAULT ''::text,
  eyebrow            text                     DEFAULT ''::text,
  primary_cta_text    text                     DEFAULT ''::text,
  primary_cta_url     text                     DEFAULT ''::text,
  secondary_cta_text  text                     DEFAULT ''::text,
  secondary_cta_url   text                     DEFAULT ''::text
);
ALTER TABLE public.home_page
  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.home_page
  ADD CONSTRAINT home_page_pkey PRIMARY KEY (id);
GRANT ALL ON public.home_page TO anon;
GRANT ALL ON public.home_page TO authenticated;
GRANT ALL ON public.home_page TO service_role;
CREATE POLICY "Public can read home page" ON public.home_page
  FOR SELECT
  USING (true);
CREATE TABLE public.languages (
  id            uuid                     DEFAULT gen_random_uuid() NOT NULL,
  profile_id    uuid                     DEFAULT '9287c45f-1b1c-4308-8b53-01d0ab97e6b7'::uuid NOT NULL,
  language_name text                     NOT NULL,
  proficiency   text,
  sort_order    integer                  DEFAULT 0 NOT NULL,
  created_at    timestamp with time zone DEFAULT now() NOT NULL
);
ALTER TABLE public.languages
  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.languages
  ADD CONSTRAINT languages_pkey PRIMARY KEY (id);
GRANT ALL ON public.languages TO anon;
GRANT ALL ON public.languages TO authenticated;
GRANT ALL ON public.languages TO service_role;
CREATE INDEX languages_profile_id_idx ON public.languages (profile_id, sort_order);
CREATE POLICY "Public can read languages" ON public.languages
  FOR SELECT
  USING (true);
CREATE TABLE public.profile (
  id         uuid                     DEFAULT gen_random_uuid() NOT NULL,
  location   text,
  email      text,
  phone      text,
  summary    text,
  created_at timestamp with time zone DEFAULT now() NOT NULL
);
ALTER TABLE public.profile
  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profile
  ADD CONSTRAINT profile_pkey PRIMARY KEY (id);
ALTER TABLE public.education
  ADD CONSTRAINT education_profile_id_fkey FOREIGN KEY (profile_id) REFERENCES public.profile(id) ON DELETE CASCADE;
ALTER TABLE public.experience_roles
  ADD CONSTRAINT experience_roles_profile_id_fkey FOREIGN KEY (profile_id) REFERENCES public.profile(id) ON DELETE CASCADE;
ALTER TABLE public.languages
  ADD CONSTRAINT languages_profile_id_fkey FOREIGN KEY (profile_id) REFERENCES public.profile(id) ON DELETE CASCADE;
GRANT ALL ON public.profile TO anon;
GRANT ALL ON public.profile TO authenticated;
GRANT ALL ON public.profile TO service_role;
CREATE UNIQUE INDEX one_profile_only_idx ON public.profile ((true));
CREATE POLICY "Public can read profile" ON public.profile
  FOR SELECT
  USING (true);
CREATE TABLE public.project_bullets (
  id          uuid                     DEFAULT gen_random_uuid() NOT NULL,
  project_id  text                     NOT NULL,
  bullet_text text                     NOT NULL,
  sort_order  integer                  DEFAULT 0 NOT NULL,
  created_at  timestamp with time zone DEFAULT now() NOT NULL
);
ALTER TABLE public.project_bullets
  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_bullets
  ADD CONSTRAINT project_bullets_pkey PRIMARY KEY (id);
GRANT ALL ON public.project_bullets TO anon;
GRANT ALL ON public.project_bullets TO authenticated;
GRANT ALL ON public.project_bullets TO service_role;
CREATE INDEX project_bullets_project_id_idx ON public.project_bullets (project_id, sort_order);
CREATE POLICY "Public can read project bullets" ON public.project_bullets
  FOR SELECT
  USING (true);
CREATE TABLE public.project_code_samples (
  id          uuid                     DEFAULT gen_random_uuid() NOT NULL,
  project_id  text                     NOT NULL,
  title       text                     NOT NULL,
  description text,
  code_text   text,
  sort_order  integer                  DEFAULT 0 NOT NULL,
  created_at  timestamp with time zone DEFAULT now() NOT NULL
);
ALTER TABLE public.project_code_samples
  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_code_samples
  ADD CONSTRAINT project_code_samples_pkey PRIMARY KEY (id);
GRANT ALL ON public.project_code_samples TO anon;
GRANT ALL ON public.project_code_samples TO authenticated;
GRANT ALL ON public.project_code_samples TO service_role;
CREATE INDEX project_code_samples_project_id_idx ON public.project_code_samples (project_id, sort_order);
CREATE POLICY "Public can read project code samples" ON public.project_code_samples
  FOR SELECT
  USING (true);
CREATE TABLE public.project_diagrams (
  id           uuid                     DEFAULT gen_random_uuid() NOT NULL,
  project_id   text                     NOT NULL,
  title        text                     NOT NULL,
  description  text,
  diagram_text text,
  sort_order   integer                  DEFAULT 0 NOT NULL,
  created_at   timestamp with time zone DEFAULT now() NOT NULL
);
ALTER TABLE public.project_diagrams
  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_diagrams
  ADD CONSTRAINT project_diagrams_pkey PRIMARY KEY (id);
GRANT ALL ON public.project_diagrams TO anon;
GRANT ALL ON public.project_diagrams TO authenticated;
GRANT ALL ON public.project_diagrams TO service_role;
CREATE INDEX project_diagrams_project_id_idx ON public.project_diagrams (project_id, sort_order);
CREATE POLICY "Public can read project diagrams" ON public.project_diagrams
  FOR SELECT
  USING (true);
CREATE TABLE public.project_stack_items (
  id         uuid                     DEFAULT gen_random_uuid() NOT NULL,
  project_id text                     NOT NULL,
  tech_name  text                     NOT NULL,
  sort_order integer                  DEFAULT 0 NOT NULL,
  created_at timestamp with time zone DEFAULT now() NOT NULL
);
ALTER TABLE public.project_stack_items
  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_stack_items
  ADD CONSTRAINT project_stack_items_pkey PRIMARY KEY (id);
GRANT ALL ON public.project_stack_items TO anon;
GRANT ALL ON public.project_stack_items TO authenticated;
GRANT ALL ON public.project_stack_items TO service_role;
CREATE INDEX project_stack_items_project_id_idx ON public.project_stack_items (project_id, sort_order);
CREATE POLICY "Public can read project stack items" ON public.project_stack_items
  FOR SELECT
  USING (true);
CREATE TABLE public.projects (
  id                 text                     NOT NULL,
  title              text                     NOT NULL,
  description        text,
  long_description   text,
  architecture_notes text,
  sort_order         integer                  DEFAULT 0 NOT NULL,
  created_at         timestamp with time zone DEFAULT now() NOT NULL
);
ALTER TABLE public.projects
  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects
  ADD CONSTRAINT projects_pkey PRIMARY KEY (id);
ALTER TABLE public.project_bullets
  ADD CONSTRAINT project_bullets_project_id_fkey FOREIGN KEY (project_id) REFERENCES public.projects(id) ON DELETE CASCADE;
ALTER TABLE public.project_code_samples
  ADD CONSTRAINT project_code_samples_project_id_fkey FOREIGN KEY (project_id) REFERENCES public.projects(id) ON DELETE CASCADE;
ALTER TABLE public.project_diagrams
  ADD CONSTRAINT project_diagrams_project_id_fkey FOREIGN KEY (project_id) REFERENCES public.projects(id) ON DELETE CASCADE;
ALTER TABLE public.project_stack_items
  ADD CONSTRAINT project_stack_items_project_id_fkey FOREIGN KEY (project_id) REFERENCES public.projects(id) ON DELETE CASCADE;
GRANT ALL ON public.projects TO anon;
GRANT ALL ON public.projects TO authenticated;
GRANT ALL ON public.projects TO service_role;
CREATE POLICY "Public can read projects" ON public.projects
  FOR SELECT
  USING (true);
CREATE TABLE public.toolbox_categories (
  id            uuid                     DEFAULT gen_random_uuid() NOT NULL,
  profile_id    uuid                     NOT NULL,
  category_name text                     NOT NULL,
  sort_order    integer                  DEFAULT 0 NOT NULL,
  created_at    timestamp with time zone DEFAULT now() NOT NULL
);
ALTER TABLE public.toolbox_categories
  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.toolbox_categories
  ADD CONSTRAINT toolbox_categories_pkey PRIMARY KEY (id);
ALTER TABLE public.toolbox_categories
  ADD CONSTRAINT toolbox_categories_profile_id_fkey FOREIGN KEY (profile_id) REFERENCES public.profile(id) ON DELETE CASCADE;
GRANT ALL ON public.toolbox_categories TO anon;
GRANT ALL ON public.toolbox_categories TO authenticated;
GRANT ALL ON public.toolbox_categories TO service_role;
CREATE INDEX toolbox_categories_profile_id_idx ON public.toolbox_categories (profile_id, sort_order);
CREATE POLICY "Public can read toolbox categories" ON public.toolbox_categories
  FOR SELECT
  USING (true);
CREATE TABLE public.toolbox_items (
  id          uuid                     DEFAULT gen_random_uuid() NOT NULL,
  category_id uuid                     NOT NULL,
  item_name   text                     NOT NULL,
  sort_order  integer                  DEFAULT 0 NOT NULL,
  created_at  timestamp with time zone DEFAULT now() NOT NULL
);
ALTER TABLE public.toolbox_items
  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.toolbox_items
  ADD CONSTRAINT toolbox_items_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.toolbox_categories(id) ON DELETE CASCADE;
ALTER TABLE public.toolbox_items
  ADD CONSTRAINT toolbox_items_pkey PRIMARY KEY (id);
GRANT ALL ON public.toolbox_items TO anon;
GRANT ALL ON public.toolbox_items TO authenticated;
GRANT ALL ON public.toolbox_items TO service_role;
CREATE INDEX toolbox_items_category_id_idx ON public.toolbox_items (category_id, sort_order);
CREATE POLICY "Public can read toolbox items" ON public.toolbox_items
  FOR SELECT
  USING (true);
