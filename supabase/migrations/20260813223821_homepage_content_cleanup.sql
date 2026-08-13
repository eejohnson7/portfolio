alter table public.home_page
  add column if not exists headline text not null default '',
  add column if not exists secondary_description text not null default '',
  add column if not exists focus_items text[] not null default '{}',
  add column if not exists process_label text not null default '',
  add column if not exists process_text text not null default '',
  add column if not exists capabilities_eyebrow text not null default '',
  add column if not exists capabilities_title text not null default '',
  add column if not exists capabilities_description text not null default '',
  add column if not exists work_eyebrow text not null default '',
  add column if not exists work_title text not null default '',
  add column if not exists work_description text not null default '',
  add column if not exists skills_eyebrow text not null default '',
  add column if not exists skills_title text not null default '',
  add column if not exists skills_description text not null default '',
  add column if not exists range_eyebrow text not null default '',
  add column if not exists range_title text not null default '',
  add column if not exists range_description text not null default '',
  add column if not exists final_cta_title text not null default '',
  add column if not exists final_cta_description text not null default '',
  add column if not exists final_primary_cta_text text not null default '',
  add column if not exists final_primary_cta_url text not null default '',
  add column if not exists final_secondary_cta_text text not null default '',
  add column if not exists final_secondary_cta_url text not null default '',
  add column if not exists final_tertiary_cta_text text not null default '',
  add column if not exists final_tertiary_cta_url text not null default '';

alter table public.projects
  add column if not exists homepage_featured boolean not null default false,
  add column if not exists homepage_description text not null default '';

alter table public.toolbox_items
  add column if not exists homepage_featured boolean not null default false;

create table if not exists public.home_capabilities (
  id text primary key,
  title text not null,
  description text not null default '',
  detail text not null default '',
  icon_key text not null default 'software',
  sort_order integer not null default 0,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.home_professional_range (
  id text primary key,
  eyebrow text not null default '',
  title text not null,
  description text not null default '',
  icon_key text not null default 'software',
  featured boolean not null default false,
  sort_order integer not null default 0,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

alter table public.home_capabilities enable row level security;
alter table public.home_professional_range enable row level security;

revoke all on table public.home_capabilities from anon, authenticated;
revoke all on table public.home_professional_range from anon, authenticated;
grant select on table public.home_capabilities to anon, authenticated;
grant select on table public.home_professional_range to anon, authenticated;

drop policy if exists "Active home capabilities are publicly readable"
  on public.home_capabilities;
create policy "Active home capabilities are publicly readable"
  on public.home_capabilities
  for select
  to anon, authenticated
  using (active);

drop policy if exists "Active professional range cards are publicly readable"
  on public.home_professional_range;
create policy "Active professional range cards are publicly readable"
  on public.home_professional_range
  for select
  to anon, authenticated
  using (active);

update public.home_page
set
  eyebrow = 'ENGINEERING · DATA · OPERATIONS · CHICAGO',
  title = 'Hi, I’m Erin.',
  headline = 'Full-Stack Software Engineer · Backend Systems · Data & Analytics',
  description = 'I build reliable payment systems, cloud services, data products, and user-facing tools.',
  secondary_description = 'My work combines backend depth with product thinking and an operator’s eye for real-world needs.',
  primary_cta_text = 'Explore my work',
  primary_cta_url = '/projects',
  secondary_cta_text = 'View resume',
  secondary_cta_url = '/resume',
  focus_items = array[
    'Payments & distributed systems',
    'Cloud & data',
    'People-first delivery'
  ],
  process_label = 'How I work',
  process_text = 'clarify → build → ship → improve',
  capabilities_eyebrow = 'What I do',
  capabilities_title = 'From architecture to outcomes.',
  capabilities_description = 'I work across production systems, user-facing products, and the data between them.',
  work_eyebrow = 'Featured engineering work',
  work_title = 'Systems with measurable impact.',
  work_description = 'Payments, batch performance, real-time analytics, and safer runtime configuration.',
  skills_eyebrow = 'Technical toolkit',
  skills_title = 'Built for the whole system.',
  skills_description = 'A focused toolkit across product, platform, and data work.',
  range_eyebrow = 'Beyond engineering',
  range_title = 'Experience beyond the code.',
  range_description = 'Client service and entrepreneurship sharpen how I communicate, adapt, and earn trust.',
  final_cta_title = 'Let’s build something dependable.',
  final_cta_description = 'Explore the work, experience, and path behind both.',
  final_primary_cta_text = 'View projects',
  final_primary_cta_url = '/projects',
  final_secondary_cta_text = 'About me',
  final_secondary_cta_url = '/about',
  final_tertiary_cta_text = 'View experience',
  final_tertiary_cta_url = '/resume'
where id = (select min(id) from public.home_page);

insert into public.home_capabilities (
  id,
  title,
  description,
  detail,
  icon_key,
  sort_order,
  active
)
values
  (
    'reliable-systems',
    'Reliable backend systems',
    'APIs, microservices, and event-driven workflows built for production.',
    'Java · Spring Boot · Kafka · AWS',
    'systems',
    0,
    true
  ),
  (
    'full-stack-delivery',
    'Full-stack delivery',
    'Backend architecture and React interfaces shaped around user needs.',
    'React · TypeScript · Node.js · SQL',
    'software',
    1,
    true
  ),
  (
    'data-analytics',
    'Data & analytics',
    'Pipelines and dashboards that turn operations into clear decisions.',
    'Python · Databricks · Power BI',
    'analytics',
    2,
    true
  )
on conflict (id) do update
set
  title = excluded.title,
  description = excluded.description,
  detail = excluded.detail,
  icon_key = excluded.icon_key,
  sort_order = excluded.sort_order,
  active = excluded.active;

insert into public.home_professional_range (
  id,
  eyebrow,
  title,
  description,
  icon_key,
  featured,
  sort_order,
  active
)
values
  (
    'engineering-analytics',
    'Core practice',
    'Engineering & analytics',
    'Production software, financial workflows, cloud delivery, and reporting.',
    'software',
    true,
    0,
    true
  ),
  (
    'hospitality-nightlife',
    'People under pressure',
    'Hospitality & nightlife',
    'Communication, adaptability, and composure in fast-moving client environments.',
    'hospitality',
    false,
    1,
    true
  ),
  (
    'le-minou',
    'Owner & operator',
    'Le Minou Pet Concierge',
    'Client relationships, scheduling, service operations, and trust as a small-business owner.',
    'pets',
    false,
    2,
    true
  )
on conflict (id) do update
set
  eyebrow = excluded.eyebrow,
  title = excluded.title,
  description = excluded.description,
  icon_key = excluded.icon_key,
  featured = excluded.featured,
  sort_order = excluded.sort_order,
  active = excluded.active;

update public.projects
set
  homepage_featured = case
    when id in (
      'payout-job-revamp',
      'account-updater',
      'financial-analytics-pipeline'
    ) then true
    else false
  end,
  homepage_description = case id
    when 'payout-job-revamp' then
      'Redesigned a failing Spring Boot payout job, eliminating timeouts and daily manual reruns.'
    when 'account-updater' then
      'Automated card refreshes through Cybersource to reduce recurring payment failures.'
    when 'financial-analytics-pipeline' then
      'Built a distributed pipeline for real-time transaction reporting and operational insight.'
    else homepage_description
  end;

update public.toolbox_items i
set homepage_featured = case
  when i.item_name in (
    'Java',
    'JavaScript/TypeScript',
    'SQL',
    'Python',
    'React',
    'Material UI',
    'Spring Boot',
    'Node.js',
    'REST APIs',
    'GraphQL',
    'Microservices',
    'PySpark',
    'Azure Databricks',
    'Power BI',
    'Kafka',
    'SQL optimization',
    'MySQL',
    'MongoDB',
    'PostgreSQL',
    'Snowflake',
    'AWS (EC2/S3)',
    'Docker',
    'Kubernetes',
    'CI/CD (Azure Pipelines, Harness, GitHub Actions)'
  ) then true
  else false
end;
