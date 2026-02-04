-- Create table for editable site content
CREATE TABLE public.site_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  section_key text UNIQUE NOT NULL,
  content jsonb NOT NULL DEFAULT '{}',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;

-- Anyone can view site content
CREATE POLICY "Anyone can view site content"
ON public.site_content
FOR SELECT
USING (true);

-- Only admins can manage site content
CREATE POLICY "Admins can manage site content"
ON public.site_content
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

-- Add trigger for updated_at
CREATE TRIGGER update_site_content_updated_at
BEFORE UPDATE ON public.site_content
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default content for each section
INSERT INTO public.site_content (section_key, content) VALUES
('hero', '{
  "badge": "MDRT 2025 - Malaysia Award & Club Member",
  "subtitle": "Secure Your Future",
  "title": "LIFE INSURANCE",
  "description": "Brings Peace of Mind, Happiness and Satisfaction To You and Your Family",
  "stats": [
    { "label": "Happy Clients", "value": "500+" },
    { "label": "Policies Served", "value": "1000+" },
    { "label": "Years Experience", "value": "12+" },
    { "label": "MDRT Member", "value": "2025" }
  ]
}'::jsonb),
('about', '{
  "name": "K.DEEPA",
  "badge": "MDRT 2025 Malaysia Award Winner & Club Member",
  "description1": "I am K.DEEPA, a dedicated Life Insurance Advisor with over 12 years of experience. I am proud to be an MDRT (Million Dollar Round Table) 2025 qualifier and Club Member, recognized for excellence in insurance advisory services.",
  "description2": "Over the years, I have helped numerous individuals ranging from businessmen to students, salaried employees, and retired people. My expertise includes planning for happy retirement, child''s education and marriage, as well as financial protection against unforeseen events.",
  "highlights": ["Personalized insurance solutions", "Expert guidance at every step", "Hassle-free claim assistance", "Regular policy reviews", "MDRT certified advisor"]
}'::jsonb),
('insurance', '{
  "title": "LIC Insurance Plans",
  "description": "Comprehensive LIC insurance solutions tailored to protect you and your loved ones at every stage of life"
}'::jsonb);