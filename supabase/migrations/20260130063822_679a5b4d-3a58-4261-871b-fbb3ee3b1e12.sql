-- Create news table for admin-managed LIC news
CREATE TABLE public.news (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  source TEXT NOT NULL,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  excerpt TEXT NOT NULL,
  category TEXT NOT NULL,
  link TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create reviews table for user-submitted testimonials
CREATE TABLE public.reviews (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT,
  content TEXT NOT NULL,
  rating INTEGER NOT NULL DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  is_approved BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on both tables
ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- News policies: Anyone can read active news, only admins can manage
CREATE POLICY "Anyone can view active news" 
ON public.news 
FOR SELECT 
USING (is_active = true);

CREATE POLICY "Admins can manage all news" 
ON public.news 
FOR ALL 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Reviews policies: Anyone can read approved reviews, anyone can submit, only admins approve
CREATE POLICY "Anyone can view approved reviews" 
ON public.reviews 
FOR SELECT 
USING (is_approved = true);

CREATE POLICY "Anyone can submit a review" 
ON public.reviews 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Admins can manage all reviews" 
ON public.reviews 
FOR ALL 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Add triggers for updated_at
CREATE TRIGGER update_news_updated_at
BEFORE UPDATE ON public.news
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_reviews_updated_at
BEFORE UPDATE ON public.reviews
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert some initial news data
INSERT INTO public.news (title, source, date, excerpt, category, is_active, display_order) VALUES
('LIC launches special campaign to revive lapsed life insurance policies', 'Business Today', '2026-01-06', 'Campaign running from January 1 to March 2, 2026, allows revival of lapsed individual policies with concessions on late fees.', 'Campaign', true, 1),
('LIC''s Jeevan Utsav - New Single Premium Plan Launched', 'LIC India', '2026-01-15', 'Guaranteed annual payout of 10% of Sum Assured starts 3-6 years after premium payment, ensuring lifelong financial security.', 'New Plan', true, 2),
('LIC''s New Tech Term Plan with Enhanced Features', 'Economic Times', '2026-01-20', 'Choose between Level Sum Assured and Increasing Sum Assured with flexible premium options and policy terms.', 'New Plan', true, 3),
('New Tax Benefits for Life Insurance Policyholders', 'Economic Times', '2026-01-25', 'Government announces enhanced tax deductions under Section 80C for life insurance premiums in the new fiscal year.', 'Tax', true, 4);