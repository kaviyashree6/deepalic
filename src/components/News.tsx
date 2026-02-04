import { motion } from "framer-motion";
import { Calendar, ArrowRight, RefreshCw } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";

interface NewsItem {
  id: string;
  title: string;
  source: string;
  date: string;
  excerpt: string;
  category: string;
  link: string | null;
}

export function News() {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchNews();
  }, []);

  // Auto-scroll effect
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer || newsItems.length === 0) return;

    let animationFrameId: number;
    let scrollPosition = 0;

    const scroll = () => {
      if (!isPaused && scrollContainer) {
        scrollPosition += 0.4;
        if (scrollPosition >= scrollContainer.scrollWidth / 2) {
          scrollPosition = 0;
        }
        scrollContainer.scrollLeft = scrollPosition;
      }
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused, newsItems]);

  const fetchNews = async () => {
    try {
      const { data, error } = await supabase
        .from("news")
        .select("*")
        .eq("is_active", true)
        .order("date", { ascending: false });

      if (error) throw error;
      setNewsItems(data || []);
    } catch (err) {
      console.error("Error fetching news:", err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <section id="news" className="py-12 md:py-20 bg-secondary">
        <div className="container text-center">
          <RefreshCw className="w-6 h-6 sm:w-8 sm:h-8 text-accent animate-spin mx-auto" />
          <p className="text-muted-foreground mt-4 text-sm">Loading news...</p>
        </div>
      </section>
    );
  }

  if (newsItems.length === 0) {
    return null;
  }

  return (
    <section id="news" className="py-12 md:py-20 bg-secondary overflow-hidden">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 md:mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-3 md:mb-4">
            <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5 text-accent animate-spin" style={{ animationDuration: '3s' }} />
            <span className="text-accent font-medium text-xs sm:text-sm">Daily Updates</span>
          </div>
          <h2 className="section-title mx-auto">Latest News</h2>
          <p className="text-muted-foreground mt-4 md:mt-6 max-w-2xl mx-auto text-sm md:text-base">
            Stay updated with the latest news from LIC and the insurance industry
          </p>
        </motion.div>

        {/* Auto-scrolling news */}
        <div 
          ref={scrollRef}
          className="overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          <div className="flex gap-3 md:gap-4" style={{ width: 'max-content' }}>
            {/* Duplicate items for seamless loop */}
            {[...newsItems, ...newsItems].map((news, index) => (
              <article
                key={`${news.id}-${index}`}
                className="bg-card rounded-xl overflow-hidden shadow-custom card-hover group w-[280px] sm:w-[320px] md:w-[360px] flex-shrink-0"
              >
                <div className="p-4 sm:p-5 md:p-6">
                  <div className="flex items-center gap-2 mb-2 sm:mb-3">
                    <span className="px-2 py-0.5 sm:py-1 bg-accent/10 text-accent text-xs font-medium rounded">
                      {news.category}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">
                    <span className="text-accent font-medium truncate">{news.source}</span>
                    <span className="flex items-center gap-1 flex-shrink-0">
                      <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                      {format(new Date(news.date), "dd/MM/yyyy")}
                    </span>
                  </div>
                  <h3 className="font-semibold text-sm sm:text-base md:text-lg text-foreground mb-2 sm:mb-3 group-hover:text-accent transition-colors line-clamp-2">
                    {news.title}
                  </h3>
                  <p className="text-muted-foreground text-xs sm:text-sm line-clamp-3 mb-3 sm:mb-4">
                    {news.excerpt}
                  </p>
                  {news.link ? (
                    <a
                      href={news.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 sm:gap-2 text-accent font-medium text-xs sm:text-sm hover:gap-2 sm:hover:gap-3 transition-all"
                    >
                      Read more <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                    </a>
                  ) : (
                    <span className="inline-flex items-center gap-1 sm:gap-2 text-accent font-medium text-xs sm:text-sm">
                      Latest update <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                    </span>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
