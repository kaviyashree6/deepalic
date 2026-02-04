-- Create insurance_plans table for admin-managed plans
CREATE TABLE public.insurance_plans (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  category_id TEXT NOT NULL,
  plan_number TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  min_age INTEGER DEFAULT 18,
  max_age INTEGER DEFAULT 65,
  min_term INTEGER DEFAULT 10,
  max_term INTEGER DEFAULT 30,
  min_sum_assured INTEGER DEFAULT 100000,
  features JSONB DEFAULT '[]'::jsonb,
  benefits JSONB DEFAULT '[]'::jsonb,
  eligibility JSONB DEFAULT '[]'::jsonb,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.insurance_plans ENABLE ROW LEVEL SECURITY;

-- Anyone can view active plans
CREATE POLICY "Anyone can view active plans"
ON public.insurance_plans
FOR SELECT
USING (is_active = true);

-- Admins can manage all plans
CREATE POLICY "Admins can manage all plans"
ON public.insurance_plans
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create trigger for updated_at
CREATE TRIGGER update_insurance_plans_updated_at
BEFORE UPDATE ON public.insurance_plans
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create index for faster lookups
CREATE INDEX idx_insurance_plans_category ON public.insurance_plans(category_id);
CREATE INDEX idx_insurance_plans_plan_number ON public.insurance_plans(plan_number);