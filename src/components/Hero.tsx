import { motion } from "framer-motion";
import { Shield, Heart, Users, Award, Trophy } from "lucide-react";
import heroImage from "@/assets/hero-advisor.jpg";
import { useSiteContent, HeroContent } from "@/hooks/useSiteContent";

const iconMap: Record<string, any> = {
  "Happy Clients": Users,
  "Policies Served": Shield,
  "Years Experience": Heart,
  "MDRT Member": Award,
};

export function Hero() {
  const { data: content } = useSiteContent<HeroContent>("hero");

  // Default content fallback
  const heroContent = content || {
    badge: "MDRT 2025 - Malaysia Award & Club Member",
    subtitle: "Secure Your Future",
    title: "LIFE INSURANCE",
    description: "Brings Peace of Mind, Happiness and Satisfaction To You and Your Family",
    stats: [
      { label: "Happy Clients", value: "500+" },
      { label: "Policies Served", value: "1000+" },
      { label: "Years Experience", value: "12+" },
      { label: "MDRT Member", value: "2025" },
    ],
  };

  return (
    <section id="home" className="relative min-h-[600px] md:min-h-[700px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Happy family protected by life insurance"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative container py-20 md:py-32">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* MDRT Badge */}
            <div className="inline-flex items-center gap-2 bg-accent/20 border border-accent/50 rounded-full px-4 py-2 mb-6">
              <Trophy className="w-5 h-5 text-accent" />
              <span className="text-accent font-semibold text-sm">{heroContent.badge}</span>
            </div>
            
            <h2 className="text-accent font-display text-2xl md:text-3xl mb-4 italic">
              {heroContent.subtitle}
            </h2>
            <h1 className="text-4xl md:text-6xl font-display font-bold text-primary-foreground leading-tight mb-6">
              {heroContent.title}
            </h1>
            <p className="text-xl md:text-2xl text-primary-foreground/90 font-display italic leading-relaxed mb-8">
              {heroContent.description}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-wrap gap-4"
          >
            <a
              href="#insurance"
              className="inline-flex items-center gap-2 bg-accent hover:bg-coral-dark text-accent-foreground px-8 py-4 rounded-lg font-semibold transition-all hover:shadow-lg"
            >
              <Shield className="w-5 h-5" />
              Explore Plans
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-primary-foreground/10 hover:bg-primary-foreground/20 text-primary-foreground border border-primary-foreground/30 px-8 py-4 rounded-lg font-semibold transition-all"
            >
              Get a Quote
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="grid grid-cols-2 sm:flex sm:flex-wrap gap-4 sm:gap-6 md:gap-8 mt-8 md:mt-12"
          >
            {heroContent.stats.map((stat, index) => {
              const Icon = iconMap[stat.label] || Shield;
              return (
                <div key={index} className="flex items-center gap-2 sm:gap-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-accent" />
                  </div>
                  <div>
                    <div className="text-lg sm:text-2xl font-bold text-primary-foreground">{stat.value}</div>
                    <div className="text-primary-foreground/70 text-xs sm:text-sm">{stat.label}</div>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
