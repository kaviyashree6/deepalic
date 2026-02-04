import { motion } from "framer-motion";
import { Star, Quote, Send } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface Review {
  id: string;
  name: string;
  role: string | null;
  content: string;
  rating: number;
}

const defaultTestimonials = [
  {
    id: "default-1",
    name: "Rajesh Kumar",
    role: "Business Owner",
    content: "K.Deepa helped me plan my family's financial future with the perfect insurance policies. Her knowledge and dedication are truly commendable.",
    rating: 5,
  },
  {
    id: "default-2",
    name: "Priya Sharma",
    role: "IT Professional",
    content: "The personalized approach and timely follow-ups made the entire process seamless. I highly recommend K.Deepa for all insurance needs.",
    rating: 5,
  },
  {
    id: "default-3",
    name: "Anand Venkatesh",
    role: "Retired Government Employee",
    content: "Excellent service! K.Deepa guided me through the pension planning process and ensured I made the right decisions for my retirement.",
    rating: 5,
  },
  {
    id: "default-4",
    name: "Meera Krishnan",
    role: "Teacher",
    content: "Very professional and knowledgeable. She explained every policy detail clearly and helped me choose the best plan for my children's future.",
    rating: 5,
  },
  {
    id: "default-5",
    name: "Suresh Babu",
    role: "Entrepreneur",
    content: "Outstanding customer service! Quick responses and genuine care for clients. Highly recommended for all your insurance needs.",
    rating: 5,
  },
];

export function Testimonials() {
  const { toast } = useToast();
  const [reviews, setReviews] = useState<Review[]>(defaultTestimonials);
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // Form state
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(5);

  useEffect(() => {
    fetchReviews();
  }, []);

  // Auto-scroll effect
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

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
  }, [isPaused]);

  const fetchReviews = async () => {
    try {
      const { data, error } = await supabase
        .from("reviews")
        .select("*")
        .eq("is_approved", true)
        .order("created_at", { ascending: false });

      if (error) throw error;
      
      // Combine approved reviews with defaults
      if (data && data.length > 0) {
        setReviews([...data, ...defaultTestimonials]);
      }
    } catch (err) {
      console.error("Error fetching reviews:", err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !content.trim()) {
      toast({
        title: "Missing fields",
        description: "Please fill in your name and review",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from("reviews")
        .insert({
          name: name.trim(),
          role: role.trim() || null,
          content: content.trim(),
          rating,
        });

      if (error) throw error;

      toast({
        title: "Thank you!",
        description: "Your review has been submitted and will be visible after approval.",
      });

      // Reset form
      setName("");
      setRole("");
      setContent("");
      setRating(5);
      setShowForm(false);
    } catch (err) {
      console.error("Error submitting review:", err);
      toast({
        title: "Error",
        description: "Failed to submit review. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="testimonials" className="py-12 md:py-20 bg-primary text-primary-foreground overflow-hidden">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 md:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-3 md:mb-4 italic">What Our Clients Say</h2>
          <p className="text-primary-foreground/70 max-w-2xl mx-auto text-sm md:text-base">
            Trusted by hundreds of families for their life insurance needs
          </p>
        </motion.div>

        {/* Auto-scrolling testimonials */}
        <div 
          ref={scrollRef}
          className="overflow-hidden mb-8 md:mb-12"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          <div className="flex gap-3 md:gap-4" style={{ width: 'max-content' }}>
            {/* Duplicate items for seamless loop */}
            {[...reviews, ...reviews].map((testimonial, index) => (
              <div
                key={`${testimonial.id}-${index}`}
                className="bg-primary-foreground/10 backdrop-blur-sm rounded-xl p-4 sm:p-5 md:p-6 relative w-[280px] sm:w-[320px] md:w-[360px] flex-shrink-0"
              >
                <Quote className="w-6 h-6 sm:w-8 sm:h-8 text-accent/30 absolute top-3 right-3" />
                <div className="flex gap-0.5 sm:gap-1 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 fill-gold text-gold" />
                  ))}
                </div>
                <p className="text-primary-foreground/90 mb-3 sm:mb-4 leading-relaxed text-xs sm:text-sm line-clamp-4">
                  "{testimonial.content}"
                </p>
                <div>
                  <h4 className="font-semibold text-sm">{testimonial.name}</h4>
                  <p className="text-primary-foreground/60 text-xs">{testimonial.role || "Customer"}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Review submission form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-xl mx-auto"
        >
          {!showForm ? (
            <div className="text-center">
              <Button
                onClick={() => setShowForm(true)}
                variant="outline"
                className="bg-primary-foreground/10 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/20"
              >
                <Send className="w-4 h-4 mr-2" />
                Share Your Experience
              </Button>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-primary-foreground/10 backdrop-blur-sm rounded-xl p-4 sm:p-6"
            >
              <h3 className="text-lg sm:text-xl font-semibold mb-4">Share Your Review</h3>
              <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <Input
                      placeholder="Your Name *"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="bg-primary-foreground/10 border-primary-foreground/30 text-primary-foreground placeholder:text-primary-foreground/50 text-sm"
                      required
                    />
                  </div>
                  <div>
                    <Input
                      placeholder="Your Role (optional)"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="bg-primary-foreground/10 border-primary-foreground/30 text-primary-foreground placeholder:text-primary-foreground/50 text-sm"
                    />
                  </div>
                </div>
                
                <div>
                  <Textarea
                    placeholder="Share your experience with K.Deepa's services... *"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows={3}
                    className="bg-primary-foreground/10 border-primary-foreground/30 text-primary-foreground placeholder:text-primary-foreground/50 text-sm"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs sm:text-sm text-primary-foreground/70 mb-2 block">Rating</label>
                  <div className="flex gap-1 sm:gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className="p-0.5 sm:p-1 transition-transform hover:scale-110"
                      >
                        <Star
                          className={`w-6 h-6 sm:w-8 sm:h-8 ${
                            star <= rating
                              ? "fill-gold text-gold"
                              : "text-primary-foreground/30"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2 sm:gap-3">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-accent hover:bg-coral-dark text-accent-foreground text-sm"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Review"}
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setShowForm(false)}
                    className="text-primary-foreground hover:bg-primary-foreground/10 text-sm"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
