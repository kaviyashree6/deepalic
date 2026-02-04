import { motion } from "framer-motion";
import { CheckCircle, Award, Clock, Users, Trophy, Medal, Star } from "lucide-react";
import { useSiteContent, AboutContent } from "@/hooks/useSiteContent";
import deepaProfile from "@/assets/deepa-profile.png";

const strengths = [
  { icon: Award, title: "Sound Industry Knowledge", description: "Deep expertise in life insurance products" },
  { icon: Clock, title: "Regular Financial Reviews", description: "Continuous assessment of your needs" },
  { icon: Users, title: "Timely Services", description: "Quick and reliable customer support" },
];

const awards = [
  { icon: Trophy, title: "MDRT 2025", subtitle: "Malaysia Award", description: "Million Dollar Round Table Member" },
  { icon: Medal, title: "Club Member", subtitle: "Elite Status", description: "Recognized for excellence in service" },
  { icon: Star, title: "Top Performer", subtitle: "12+ Years", description: "Consistent high performance" },
];

export function About() {
  const { data: content } = useSiteContent<AboutContent>("about");

  // Default content fallback
  const aboutContent = content || {
    name: "K.DEEPA",
    badge: "MDRT 2025 Malaysia Award Winner & Club Member",
    description1: "I am K.DEEPA, a dedicated Life Insurance Advisor with over 12 years of experience. I am proud to be an MDRT (Million Dollar Round Table) 2025 qualifier and Club Member, recognized for excellence in insurance advisory services.",
    description2: "Over the years, I have helped numerous individuals ranging from businessmen to students, salaried employees, and retired people. My expertise includes planning for happy retirement, child's education and marriage, as well as financial protection against unforeseen events.",
    highlights: [
      "Personalized insurance solutions",
      "Expert guidance at every step",
      "Hassle-free claim assistance",
      "Regular policy reviews",
      "MDRT certified advisor",
    ],
  };

  return (
    <section id="about" className="py-16 md:py-24 bg-card">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Profile Image & About Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Profile Image */}
            <div className="flex justify-center lg:justify-start mb-8">
              <div className="relative">
                <div className="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-accent shadow-xl">
                  <img 
                    src={deepaProfile} 
                    alt="K.DEEPA - Life Insurance Advisor" 
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-accent text-accent-foreground rounded-full p-3 shadow-lg">
                  <Trophy className="w-6 h-6" />
                </div>
              </div>
            </div>
            <h2 className="section-title mb-6">{aboutContent.name}</h2>
            
            {/* MDRT Badge */}
            <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/30 rounded-full px-4 py-2 mb-6">
              <Trophy className="w-5 h-5 text-accent" />
              <span className="text-accent font-semibold">{aboutContent.badge}</span>
            </div>
            
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              {aboutContent.description1.split(/\b(K\.DEEPA|MDRT|Million Dollar Round Table|Club Member)\b/).map((part, i) => 
                ["K.DEEPA"].includes(part) ? <strong key={i} className="text-foreground">{part}</strong> :
                ["MDRT", "Million Dollar Round Table", "Club Member"].includes(part) ? <strong key={i} className="text-accent">{part}</strong> :
                part
              )}
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              {aboutContent.description2}
            </p>

            <div className="space-y-4">
              {aboutContent.highlights.map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                  <span className="text-foreground">{item}</span>
                </motion.div>
              ))}
            </div>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-primary hover:bg-navy-light text-primary-foreground px-8 py-3 rounded-lg font-semibold transition-all mt-8"
            >
              Contact Me
            </a>
          </motion.div>

          {/* Right: Strengths & Awards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* Awards Section */}
            <div className="bg-gradient-to-br from-accent to-coral-dark rounded-2xl p-8 text-accent-foreground">
              <h3 className="text-2xl font-display font-bold mb-6 flex items-center gap-2">
                <Trophy className="w-7 h-7" />
                Awards & Recognition
              </h3>
              <div className="grid gap-4">
                {awards.map((award, index) => (
                  <motion.div
                    key={award.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15 }}
                    className="flex gap-4 bg-white/10 rounded-xl p-4"
                  >
                    <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <award.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg">{award.title}</h4>
                      <p className="text-sm opacity-90">{award.subtitle}</p>
                      <p className="text-xs opacity-70">{award.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Strengths Section */}
            <div className="bg-primary rounded-2xl p-8 text-primary-foreground">
              <h3 className="text-2xl font-display font-bold mb-6 italic">Our Strength</h3>
              <div className="space-y-6">
                {strengths.map((strength, index) => (
                  <motion.div
                    key={strength.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15 }}
                    className="flex gap-4"
                  >
                    <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <strength.icon className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg">{strength.title}</h4>
                      <p className="text-primary-foreground/70 text-sm">{strength.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
