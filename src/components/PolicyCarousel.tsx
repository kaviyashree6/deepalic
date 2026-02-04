import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useRef, useEffect, useState } from "react";

import policyTerm from "@/assets/policy-term-new.jpg";
import policyEndowment from "@/assets/policy-endowment.jpg";
import policyChildren from "@/assets/policy-children.jpg";
import policyPension from "@/assets/policy-pension.jpg";
import policyHealth from "@/assets/policy-health.jpg";

const policySlides = [
  {
    id: "term",
    image: policyTerm,
    title: "Term Insurance",
    description: "Pure protection at affordable premiums",
    highlight: "From ₹500/month",
  },
  {
    id: "endowment",
    image: policyEndowment,
    title: "Endowment Plans",
    description: "Savings + Protection with guaranteed returns",
    highlight: "Bonus Benefits",
  },
  {
    id: "children",
    image: policyChildren,
    title: "Children Plans",
    description: "Secure your child's education & future",
    highlight: "Education Planning",
  },
  {
    id: "pension",
    image: policyPension,
    title: "Pension Plans",
    description: "Retire comfortably with lifetime income",
    highlight: "Retirement Security",
  },
  {
    id: "health",
    image: policyHealth,
    title: "Health Insurance",
    description: "Medical protection for you & family",
    highlight: "Critical Illness Cover",
  },
];

export function PolicyCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-scroll effect
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationFrameId: number;
    let scrollPosition = 0;

    const scroll = () => {
      if (!isPaused && scrollContainer) {
        scrollPosition += 0.5;
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

  return (
    <section className="py-12 md:py-20 bg-background">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 md:mb-12"
        >
          <h2 className="section-title mx-auto">Insurance Solutions For Every Need</h2>
          <p className="text-muted-foreground mt-4 md:mt-6 max-w-2xl mx-auto text-sm md:text-base">
            Explore our range of LIC policies designed to protect every stage of your life journey
          </p>
        </motion.div>

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
            {[...policySlides, ...policySlides].map((slide, index) => (
              <Link 
                key={`${slide.id}-${index}`} 
                to={`/plans/${slide.id}`}
                className="block w-[280px] sm:w-[320px] md:w-[360px] flex-shrink-0"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="group cursor-pointer"
                >
                  <div className="overflow-hidden rounded-xl shadow-custom hover:shadow-custom-lg transition-all duration-300">
                    <div className="relative h-[200px] sm:h-[220px] md:h-[260px] overflow-hidden">
                      <img
                        src={slide.image}
                        alt={slide.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
                      <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4">
                        <span className="inline-block bg-accent text-accent-foreground text-xs font-semibold px-2 sm:px-3 py-1 rounded-full mb-1 sm:mb-2">
                          {slide.highlight}
                        </span>
                        <h3 className="text-base sm:text-lg md:text-xl font-display font-bold text-primary-foreground">
                          {slide.title}
                        </h3>
                      </div>
                    </div>
                    <div className="p-3 sm:p-4 bg-card">
                      <p className="text-muted-foreground text-xs sm:text-sm">
                        {slide.description}
                      </p>
                      <span className="inline-flex items-center text-accent font-medium text-xs sm:text-sm mt-2 group-hover:underline">
                        Learn More →
                      </span>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
