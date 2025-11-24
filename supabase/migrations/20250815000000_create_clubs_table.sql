/*
# [Operation] Create `clubs` table

This script creates a new table `clubs` to store club information dynamically.
It also configures Row Level Security (RLS) to control access.

## Query Description:
This is a non-destructive operation that adds a new table. The table is designed 
to store club details including name and icon. RLS policies ensure only admin 
users can add or modify clubs, while all logged-in users can view them.

## Metadata:
- Schema-Category: "Structural"
- Impact-Level: "Low"
- Requires-Backup: false
- Reversible: true

## Structure Details:
- **New Table: `clubs`**
  - Columns: `id`, `created_at`, `name`, `icon`, `club_id`, `created_by`

## Security Implications:
- RLS Status: Enabled.
- Policy Changes: Yes, new policies are created.
  - `clubs`:
    - Admins can perform all actions (INSERT, SELECT, UPDATE, DELETE).
    - All authenticated users can view (SELECT).
*/

-- 1. Create the `clubs` table
CREATE TABLE IF NOT EXISTS public.clubs (
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    name text NOT NULL,
    icon text NOT NULL DEFAULT 'HelpCircle',
    club_id text NOT NULL UNIQUE,
    created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
    CONSTRAINT clubs_pkey PRIMARY KEY (id)
);

-- 2. Enable RLS
ALTER TABLE public.clubs ENABLE ROW LEVEL SECURITY;

-- 3. Create RLS policies
CREATE POLICY "Allow all users to read clubs"
ON public.clubs
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Allow admins to manage clubs"
ON public.clubs
FOR ALL
TO authenticated
USING ((EXISTS ( SELECT 1
   FROM profiles
  WHERE ((profiles.id = auth.uid()) AND (profiles.role = 'admin'::text)))));

-- 4. Insert existing clubs
INSERT INTO public.clubs (name, icon, club_id) VALUES
('Finite Loop Club', 'Code', 'finite-loop'),
('Grey Matter', 'HelpCircle', 'grey-matter'),
('SACA', 'Mic', 'saca'),
('Taaleem', 'Drama', 'taaleem'),
('Stereo', 'Music', 'stereo')
ON CONFLICT (club_id) DO NOTHING;
