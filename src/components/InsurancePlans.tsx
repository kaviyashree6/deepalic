import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useRef, useEffect, useState } from "react";
import { 
  Wallet, 
  GraduationCap, 
  Clock, 
  RefreshCw, 
  Heart, 
  Shield, 
  TrendingUp, 
  FileText,
  ArrowRight,
  Car,
  Bike,
  Activity
} from "lucide-react";
import { useSiteContent, InsuranceContent } from "@/hooks/useSiteContent";

const planCategories = [
  {
    id: "term",
    icon: FileText,
    name: "Term Plans",
    description: "Pure life protection at affordable premiums",
    highlight: "Starting ₹500/month"
  },
  {
    id: "endowment",
    icon: Wallet,
    name: "Endowment Plans",
    description: "Savings with life protection & bonuses",
    highlight: "Guaranteed Returns"
  },
  {
    id: "children",
    icon: GraduationCap,
    name: "Children Plans",
    description: "Secure your child's future milestones",
    highlight: "Education & Marriage"
  },
  {
    id: "pension",
    icon: Clock,
    name: "Pension Plans",
    description: "Retirement security with regular income",
    highlight: "Lifetime Annuity"
  },
  {
    id: "moneyback",
    icon: RefreshCw,
    name: "Money Back Plans",
    description: "Periodic returns with full protection",
    highlight: "Regular Payouts"
  },
  {
    id: "health",
    icon: Heart,
    name: "Health Plans",
    description: "Medical coverage for critical illness",
    highlight: "Cancer & Health Cover"
  },
  {
    id: "ulip",
    icon: TrendingUp,
    name: "ULIP Plans",
    description: "Market-linked returns with life cover",
    highlight: "Wealth Creation"
  },
  {
    id: "wholelife",
    icon: Shield,
    name: "Whole Life Plans",
    description: "Lifetime protection till age 100",
    highlight: "Legacy Planning"
  },
  {
    id: "vehicle-2wheeler",
    icon: Bike,
    name: "2 Wheeler Insurance",
    description: "Complete protection for your bike/scooter",
    highlight: "Comprehensive Cover",
    isVehicle: true
  },
  {
    id: "vehicle-4wheeler",
    icon: Car,
    name: "4 Wheeler Insurance",
    description: "Car insurance with extensive coverage",
    highlight: "Third Party + OD",
    isVehicle: true
  },
  {
    id: "health-family",
    icon: Activity,
    name: "Family Health Insurance",
    description: "Complete health protection for family",
    highlight: "Cashless Treatment",
    isVehicle: true
  },
];

export function InsurancePlans() {
  const { data: content } = useSiteContent<InsuranceContent>("insurance");
  const scrollRef = useRef<HTMLDivElement>(null);
  const vehicleScrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [vehiclePaused, setVehiclePaused] = useState(false);

  const insuranceContent = content || {
    title: "Insurance Solutions for Every Need",
    description: "Comprehensive insurance solutions tailored to protect you and your loved ones at every stage of life",
  };

  // LIC Plans (non-vehicle)
  const licPlans = planCategories.filter(cat => !cat.isVehicle);
  // Vehicle & Additional Health (auto-scroll section)
  const additionalPlans = planCategories.filter(cat => cat.isVehicle);

  // Auto-scroll effect for LIC plans
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

  // Auto-scroll effect for vehicle plans (reverse direction)
  useEffect(() => {
    const scrollContainer = vehicleScrollRef.current;
    if (!scrollContainer) return;

    let animationFrameId: number;
    let scrollPosition = scrollContainer.scrollWidth / 2;

    const scroll = () => {
      if (!vehiclePaused && scrollContainer) {
        scrollPosition -= 0.5;
        if (scrollPosition <= 0) {
          scrollPosition = scrollContainer.scrollWidth / 2;
        }
        scrollContainer.scrollLeft = scrollPosition;
      }
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(animationFrameId);
  }, [vehiclePaused]);

  return (
    <section id="insurance" className="py-12 md:py-20 bg-secondary overflow-hidden">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 md:mb-12"
        >
          <h2 className="section-title mx-auto">{insuranceContent.title}</h2>
          <p className="text-muted-foreground mt-4 md:mt-6 max-w-2xl mx-auto text-sm md:text-base">
            {insuranceContent.description}
          </p>
        </motion.div>

        {/* LIC Insurance Plans - Auto-scrolling */}
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
            {[...licPlans, ...licPlans].map((category, index) => (
              <Link
                key={`${category.id}-${index}`}
                to={`/plans/${category.id}`}
                className="group block bg-card rounded-xl p-4 sm:p-5 md:p-6 shadow-custom card-hover text-center w-[200px] sm:w-[240px] md:w-[280px] flex-shrink-0"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto mb-2 sm:mb-3 md:mb-4 bg-accent/10 rounded-full flex items-center justify-center group-hover:bg-accent transition-colors">
                  <category.icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-accent group-hover:text-accent-foreground transition-colors" />
                </div>
                <h3 className="font-semibold text-sm sm:text-base text-foreground group-hover:text-accent transition-colors">
                  {category.name}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1 sm:mt-2 line-clamp-2">{category.description}</p>
                <span className="inline-block mt-2 sm:mt-3 text-xs font-medium text-accent bg-accent/10 px-2 sm:px-3 py-1 rounded-full">
                  {category.highlight}
                </span>
                <div className="mt-2 sm:mt-3 flex items-center justify-center gap-1 text-xs sm:text-sm text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                  View Plans <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Vehicle & Additional Health Insurance - Separate auto-scroll */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 md:mb-12"
        >
          <h3 className="text-lg sm:text-xl font-display font-bold text-foreground mb-4 sm:mb-6 text-center">
            Vehicle & Additional Health Insurance
          </h3>
          <div 
            ref={vehicleScrollRef}
            className="overflow-hidden"
            onMouseEnter={() => setVehiclePaused(true)}
            onMouseLeave={() => setVehiclePaused(false)}
            onTouchStart={() => setVehiclePaused(true)}
            onTouchEnd={() => setVehiclePaused(false)}
          >
            <div className="flex gap-3 md:gap-4" style={{ width: 'max-content' }}>
              {/* Duplicate items for seamless loop */}
              {[...additionalPlans, ...additionalPlans].map((category, index) => (
                <a
                  key={`${category.id}-${index}`}
                  href="#contact"
                  className="group block bg-card rounded-xl p-4 sm:p-5 md:p-6 shadow-custom card-hover text-center w-[200px] sm:w-[240px] md:w-[260px] flex-shrink-0"
                >
                  <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto mb-2 sm:mb-3 md:mb-4 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary transition-colors">
                    <category.icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <h3 className="font-semibold text-sm sm:text-base text-foreground group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1 sm:mt-2 line-clamp-2">{category.description}</p>
                  <span className="inline-block mt-2 sm:mt-3 text-xs font-medium text-primary bg-primary/10 px-2 sm:px-3 py-1 rounded-full">
                    {category.highlight}
                  </span>
                  <div className="mt-2 sm:mt-3 flex items-center justify-center gap-1 text-xs sm:text-sm text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    Get Quote <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="text-center mt-6 sm:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
          <a
            href="#calculator"
            className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-6 sm:px-8 py-3 rounded-lg font-semibold transition-all hover:shadow-lg text-sm sm:text-base"
          >
            Calculate Premium
          </a>
          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-coral-dark text-accent-foreground px-6 sm:px-8 py-3 rounded-lg font-semibold transition-all hover:shadow-lg text-sm sm:text-base"
          >
            Get Free Consultation
          </a>
        </div>
      </div>
    </section>
  );
}
