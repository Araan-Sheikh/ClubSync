/*
          # [Operation Name]
          Create User Roles and Profiles Table

          [This migration introduces a role-based system by creating a 'profiles' table to store user-specific data, including a new 'role' column. It also sets up a trigger to automatically create a profile for each new user upon sign-up.]

          ## Query Description: [This operation creates a new table 'public.profiles' to store application-specific user data, separating it from the core authentication data in 'auth.users'. It adds a 'role' field that defaults to 'user' for all new sign-ups, ensuring a secure-by-default permission model. No existing data will be lost, but this change is foundational for future role-based features.]
          
          ## Metadata:
          - Schema-Category: "Structural"
          - Impact-Level: "Medium"
          - Requires-Backup: false
          - Reversible: true
          
          ## Structure Details:
          - Creates ENUM type: `public.user_role` ('user', 'admin')
          - Creates TABLE: `public.profiles` (id, full_name, role, created_at)
          - Creates FUNCTION: `public.handle_new_user()`
          - Creates TRIGGER: `on_auth_user_created` on `auth.users`
          - Enables RLS on `public.profiles`
          - Creates RLS Policies for `public.profiles`
          
          ## Security Implications:
          - RLS Status: Enabled
          - Policy Changes: Yes
          - Auth Requirements: Policies are based on `auth.uid()`.
          
          ## Performance Impact:
          - Indexes: A primary key index is added on `profiles.id`.
          - Triggers: Adds a new trigger on `auth.users` table for `INSERT` operations. The impact is minimal.
          - Estimated Impact: Low performance impact.
          */

-- 1. Create a user_role ENUM type
CREATE TYPE public.user_role AS ENUM ('user', 'admin');

-- 2. Create the profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  role user_role NOT NULL DEFAULT 'user',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 3. Create a function to handle new user sign-ups
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name)
  VALUES (new.id, new.raw_user_meta_data->>'full_name');
  RETURN new;
END;
$$;

-- 4. Create a trigger to call the function when a new user is created
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- 5. Enable Row Level Security (RLS) for the profiles table
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 6. Create RLS policies
CREATE POLICY "Users can view their own profile."
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile."
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- 7. Grant usage to authenticated role
GRANT SELECT, INSERT, UPDATE, DELETE ON public.profiles TO authenticated;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO authenticated;
