do $$
begin
  if (
    select count(*)
    from public.experience_roles
    where id in (
      '7612b447-18da-46b7-90e3-597518c18c4b',
      '3a69fba3-65ca-4859-a9fb-80907dfe2c2e',
      '4fe35fba-bd3a-40c8-aaaf-35baafb0269d',
      'b22a81f7-442c-4e48-b85d-42db1f9b2afe',
      'd2a94f10-6ce7-4a6c-823e-7c3d435607b8'
    )
  ) not in (0, 5) then
    raise exception 'Expected either zero or all five Resume experience roles before adding metadata';
  end if;
end
$$;

alter table public.experience_roles
  add column category text,
  add column badge_label text,
  add column is_primary boolean not null default false;

update public.experience_roles as role
set
  title = metadata.title,
  category = metadata.category,
  badge_label = metadata.badge_label,
  is_primary = metadata.is_primary
from (
  values
    (
      '7612b447-18da-46b7-90e3-597518c18c4b'::uuid,
      'Software Engineer II',
      'engineering',
      'Engineering & Data · Primary Focus',
      true
    ),
    (
      '3a69fba3-65ca-4859-a9fb-80907dfe2c2e'::uuid,
      'Software Engineer I',
      'engineering',
      'Software Engineering',
      false
    ),
    (
      '4fe35fba-bd3a-40c8-aaaf-35baafb0269d'::uuid,
      'Software Engineer Intern',
      'engineering',
      'Software Engineering',
      false
    ),
    (
      'b22a81f7-442c-4e48-b85d-42db1f9b2afe'::uuid,
      'Owner',
      'entrepreneurship',
      'Entrepreneurship',
      false
    ),
    (
      'd2a94f10-6ce7-4a6c-823e-7c3d435607b8'::uuid,
      'Hospitality & Nightlife Experience',
      'hospitality',
      'Hospitality & Operations',
      false
    )
) as metadata(id, title, category, badge_label, is_primary)
where role.id = metadata.id;

alter table public.experience_roles
  alter column category set not null,
  alter column badge_label set not null;

alter table public.experience_roles
  add constraint experience_roles_category_check
  check (category in ('engineering', 'data', 'entrepreneurship', 'hospitality'));

comment on column public.experience_roles.category is
  'Semantic role category used by the Resume presentation layer.';

comment on column public.experience_roles.badge_label is
  'Editable label displayed on the Resume experience card.';

comment on column public.experience_roles.is_primary is
  'Marks the Resume role that receives primary career emphasis.';
