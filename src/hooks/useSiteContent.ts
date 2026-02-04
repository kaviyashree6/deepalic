import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface HeroContent {
  badge: string;
  subtitle: string;
  title: string;
  description: string;
  stats: Array<{ label: string; value: string }>;
}

export interface AboutContent {
  name: string;
  badge: string;
  description1: string;
  description2: string;
  highlights: string[];
}

export interface InsuranceContent {
  title: string;
  description: string;
}

type SectionKey = "hero" | "about" | "insurance";

export function useSiteContent<T>(sectionKey: SectionKey) {
  return useQuery({
    queryKey: ["site-content", sectionKey],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("site_content")
        .select("content")
        .eq("section_key", sectionKey)
        .single();

      if (error) throw error;
      return data?.content as T;
    },
  });
}

export function useUpdateSiteContent<T>(sectionKey: SectionKey) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (content: T) => {
      const { error } = await supabase
        .from("site_content")
        .update({ content: content as any })
        .eq("section_key", sectionKey);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["site-content", sectionKey] });
      toast.success("Content updated successfully!");
    },
    onError: (error) => {
      console.error("Error updating content:", error);
      toast.error("Failed to update content");
    },
  });
}
