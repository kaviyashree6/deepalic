-- Fix user_roles security: Add explicit DENY policies for INSERT, UPDATE, DELETE
-- These prevent any non-admin from modifying roles

-- Drop existing policies if any and recreate with proper security
DROP POLICY IF EXISTS "Admins can view all roles" ON public.user_roles;

-- Create secure policies for user_roles
CREATE POLICY "Admins can view all roles" 
ON public.user_roles 
FOR SELECT 
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Only admins can insert roles" 
ON public.user_roles 
FOR INSERT 
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Only admins can update roles" 
ON public.user_roles 
FOR UPDATE 
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Only admins can delete roles" 
ON public.user_roles 
FOR DELETE 
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Fix contacts table: Make policies PERMISSIVE for proper security
DROP POLICY IF EXISTS "Anyone can submit contact form" ON public.contacts;
DROP POLICY IF EXISTS "No direct select access" ON public.contacts;

CREATE POLICY "Anyone can submit contact form" 
ON public.contacts 
FOR INSERT 
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Admins can view contacts" 
ON public.contacts 
FOR SELECT 
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete contacts" 
ON public.contacts 
FOR DELETE 
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));