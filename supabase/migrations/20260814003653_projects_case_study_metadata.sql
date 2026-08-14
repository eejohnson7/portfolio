alter table public.projects
  add column if not exists category text,
  add column if not exists context_label text,
  add column if not exists role text,
  add column if not exists impact text;

alter table public.projects
  add constraint projects_category_check
  check (
    category is null
    or category in (
      'backend',
      'full_stack',
      'data_analytics',
      'platform',
      'personal'
    )
  );

update public.projects as project
set
  category = metadata.category,
  context_label = metadata.context_label,
  role = metadata.role,
  impact = metadata.impact
from (
  values
    (
      'payout-job-revamp',
      'backend',
      'Production System',
      'Software Engineer',
      'Eliminated database timeouts and reduced manual reruns to near zero.'
    ),
    (
      'account-updater',
      'backend',
      'Production System',
      'Software Engineer I / II',
      'Reduced Autoship billing failures and improved recurring revenue capture.'
    ),
    (
      'bank-account-validation-card',
      'full_stack',
      'Financial Product Feature',
      'Software Engineer',
      'Improved the reliability and clarity of financial onboarding through end-to-end validation.'
    ),
    (
      'financial-analytics-pipeline',
      'data_analytics',
      'Data Platform',
      'Software Engineer',
      'Enabled finance and operations teams to monitor revenue, payouts, and regional performance in real time.'
    ),
    (
      'service-selector',
      'personal',
      'Personal Project',
      'Frontend Developer',
      'Created a reusable, accessible service-selection pattern for a faster booking flow.'
    )
) as metadata(id, category, context_label, role, impact)
where project.id = metadata.id;

comment on column public.projects.category is
  'Semantic category used by the Projects presentation layer.';

comment on column public.projects.context_label is
  'Portfolio-safe project context such as Production System or Personal Project.';

comment on column public.projects.role is
  'The portfolio owner role for this project, when supported by the case-study content.';

comment on column public.projects.impact is
  'A concise project outcome supported by the existing case-study content.';
