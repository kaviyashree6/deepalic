import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface LICNewsItem {
  title: string;
  excerpt: string;
  source: string;
  category: string;
  link?: string;
  date: string;
}

// Generate relevant LIC news based on current events and insurance industry
async function generateLICNews(): Promise<LICNewsItem[]> {
  const apiKey = Deno.env.get("LOVABLE_API_KEY");
  
  if (!apiKey) {
    console.error("LOVABLE_API_KEY not found");
    return getDefaultNews();
  }

  try {
    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          {
            role: "system",
            content: `You are an expert on LIC (Life Insurance Corporation of India) news. Generate 5 realistic and current news items about LIC, insurance policies, financial planning, and related topics. Each news item should be informative and relevant to potential insurance customers in India.
            
Return ONLY a valid JSON array with this exact structure (no markdown, no code blocks):
[
  {
    "title": "News headline (max 80 chars)",
    "excerpt": "Brief description (max 200 chars)",
    "source": "LIC India" or "Economic Times" or "Mint" or "Business Standard",
    "category": "Policy Update" or "Market News" or "Investment Tips" or "Announcements" or "Tax Benefits",
    "link": null
  }
]`
          },
          {
            role: "user",
            content: `Generate 5 current LIC news items for today (${new Date().toISOString().split('T')[0]}). Include topics like new policies, MDRT updates, bonus announcements, tax benefits, and investment tips.`
          }
        ],
        temperature: 0.7,
        max_tokens: 1500,
      }),
    });

    if (!response.ok) {
      console.error("AI API error:", response.status);
      return getDefaultNews();
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "";
    
    // Parse the JSON response
    const newsItems: LICNewsItem[] = JSON.parse(content);
    
    // Add today's date to all items
    const today = new Date().toISOString().split('T')[0];
    return newsItems.map(item => ({
      ...item,
      date: today,
    }));
  } catch (error) {
    console.error("Error generating news:", error);
    return getDefaultNews();
  }
}

function getDefaultNews(): LICNewsItem[] {
  const today = new Date().toISOString().split('T')[0];
  return [
    {
      title: "LIC Announces Enhanced Bonus Rates for Policyholders",
      excerpt: "LIC has announced increased bonus rates for traditional endowment policies, benefiting millions of policyholders across India.",
      source: "LIC India",
      category: "Announcements",
      date: today,
    },
    {
      title: "Tax Benefits Under Section 80C: Maximize Your Savings",
      excerpt: "Learn how LIC policies can help you save up to ₹1.5 lakh under Section 80C while securing your family's future.",
      source: "Economic Times",
      category: "Tax Benefits",
      date: today,
    },
    {
      title: "MDRT 2025: LIC Agents Achieve Global Recognition",
      excerpt: "Record number of LIC agents qualify for Million Dollar Round Table membership, showcasing excellence in insurance advisory.",
      source: "Business Standard",
      category: "Announcements",
      date: today,
    },
    {
      title: "Child Education Plans: Secure Your Child's Future",
      excerpt: "LIC's Jeevan Tarun and New Children's Money Back plans offer guaranteed returns for your child's education and marriage.",
      source: "Mint",
      category: "Investment Tips",
      date: today,
    },
    {
      title: "LIC Term Insurance: Comprehensive Family Protection",
      excerpt: "Affordable term plans now available with enhanced coverage options and rider benefits for complete family security.",
      source: "LIC India",
      category: "Policy Update",
      date: today,
    },
  ];
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Generate fresh news
    const newsItems = await generateLICNews();

    // Deactivate old news (older than 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    await supabase
      .from("news")
      .update({ is_active: false })
      .lt("date", sevenDaysAgo.toISOString().split('T')[0]);

    // Insert new news items
    const insertPromises = newsItems.map(async (item, index) => {
      // Check if similar title already exists today
      const { data: existing } = await supabase
        .from("news")
        .select("id")
        .eq("title", item.title)
        .eq("date", item.date)
        .single();

      if (!existing) {
        return supabase.from("news").insert({
          title: item.title,
          excerpt: item.excerpt,
          source: item.source,
          category: item.category,
          link: item.link || null,
          date: item.date,
          is_active: true,
          display_order: index,
        });
      }
      return null;
    });

    await Promise.all(insertPromises);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: `Processed ${newsItems.length} news items`,
        items: newsItems.length 
      }),
      { 
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200 
      }
    );
  } catch (error: unknown) {
    console.error("Error in fetch-lic-news:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { 
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500 
      }
    );
  }
});
