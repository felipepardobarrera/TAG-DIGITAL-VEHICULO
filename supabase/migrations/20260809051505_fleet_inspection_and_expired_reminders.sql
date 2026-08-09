alter table public.vehicles
  add column if not exists is_fleet boolean not null default false,
  add column if not exists driver_name text,
  add column if not exists driver_whatsapp text,
  add column if not exists driver_email text;

alter table public.vehicles
  drop constraint if exists vehicles_driver_whatsapp_check,
  add constraint vehicles_driver_whatsapp_check
    check (driver_whatsapp is null or driver_whatsapp ~ '^\\+569[0-9]{8}$'),
  drop constraint if exists vehicles_fleet_driver_check,
  add constraint vehicles_fleet_driver_check
    check (
      not is_fleet or (
        nullif(btrim(driver_name), '') is not null
        and driver_whatsapp ~ '^\\+569[0-9]{8}$'
      )
    );

alter table public.reminder_deliveries
  add column if not exists recipient_email text,
  add column if not exists recipient_whatsapp text;

create index if not exists idx_vehicles_fleet_driver
  on public.vehicles (user_id, is_fleet)
  where is_fleet = true;

create index if not exists idx_vehicles_inspection_active
  on public.vehicles (inspection_token, inspection_expires_at)
  where inspection_enabled = true;

create schema if not exists private;

create or replace function private.queue_expired_document_reminders()
returns integer
language plpgsql
security definer
set search_path = ''
as $$
declare
  inserted_count integer := 0;
begin
  with queued as (
    insert into public.reminder_deliveries (
      user_id, document_id, channel, reminder_key, status,
      recipient_email, recipient_whatsapp
    )
    select d.user_id, d.id, 'email',
      'expired:' || current_date::text || ':owner', 'pending',
      u.email, null
    from public.documents d
    join auth.users u on u.id = d.user_id
    left join public.notification_preferences p on p.user_id = d.user_id
    where d.expires_on < current_date
      and not exists (
        select 1 from public.documents newer
        where newer.vehicle_id = d.vehicle_id
          and newer.document_type = d.document_type
          and newer.created_at > d.created_at
          and (newer.expires_on is null or newer.expires_on >= current_date)
      )
      and coalesce(p.email_enabled, true)
      and u.email is not null
    union all
    select d.user_id, d.id, 'email',
      'expired:' || current_date::text || ':driver', 'pending',
      v.driver_email, null
    from public.documents d
    join public.vehicles v on v.id = d.vehicle_id and v.user_id = d.user_id
    where d.expires_on < current_date
      and not exists (
        select 1 from public.documents newer
        where newer.vehicle_id = d.vehicle_id
          and newer.document_type = d.document_type
          and newer.created_at > d.created_at
          and (newer.expires_on is null or newer.expires_on >= current_date)
      )
      and v.is_fleet
      and nullif(btrim(v.driver_email), '') is not null
    union all
    select d.user_id, d.id, 'whatsapp',
      'expired:' || current_date::text || ':driver', 'pending',
      null, v.driver_whatsapp
    from public.documents d
    join public.vehicles v on v.id = d.vehicle_id and v.user_id = d.user_id
    where d.expires_on < current_date
      and not exists (
        select 1 from public.documents newer
        where newer.vehicle_id = d.vehicle_id
          and newer.document_type = d.document_type
          and newer.created_at > d.created_at
          and (newer.expires_on is null or newer.expires_on >= current_date)
      )
      and v.is_fleet
      and v.driver_whatsapp ~ '^\\+569[0-9]{8}$'
    union all
    select d.user_id, d.id, 'whatsapp',
      'expired:' || current_date::text || ':owner', 'pending',
      null, p.phone
    from public.documents d
    join public.profiles p on p.user_id = d.user_id
    where d.expires_on < current_date
      and not exists (
        select 1 from public.documents newer
        where newer.vehicle_id = d.vehicle_id
          and newer.document_type = d.document_type
          and newer.created_at > d.created_at
          and (newer.expires_on is null or newer.expires_on >= current_date)
      )
      and p.whatsapp_enabled
      and p.phone ~ '^\\+569[0-9]{8}$'
    on conflict (document_id, channel, reminder_key) do nothing
    returning 1
  )
  select count(*) into inserted_count from queued;

  return inserted_count;
end;
$$;

revoke all on function private.queue_expired_document_reminders() from public, anon, authenticated;

create extension if not exists pg_cron with schema pg_catalog;

do $$
declare
  existing_job bigint;
begin
  select jobid into existing_job
  from cron.job
  where jobname = 'queue-expired-document-reminders-daily';

  if existing_job is not null then
    perform cron.unschedule(existing_job);
  end if;

  perform cron.schedule(
    'queue-expired-document-reminders-daily',
    '5 12 * * *',
    'select private.queue_expired_document_reminders();'
  );
end;
$$;
