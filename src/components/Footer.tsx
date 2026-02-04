import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin, Twitter, Trophy } from "lucide-react";

const quickLinks = [
  { name: "Home", href: "#home" },
  { name: "About Us", href: "#about" },
  { name: "Insurance Plans", href: "#insurance" },
  { name: "News", href: "#news" },
  { name: "Gallery", href: "#gallery" },
  { name: "Contact", href: "#contact" },
];

const insuranceLinks = [
  { name: "Endowment Plans", href: "#insurance" },
  { name: "Children Plans", href: "#insurance" },
  { name: "Pension Plans", href: "#insurance" },
  { name: "Money Back Plans", href: "#insurance" },
  { name: "Health Plans", href: "#insurance" },
  { name: "Term Plans", href: "#insurance" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container py-8 sm:py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 sm:gap-3 mb-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-accent-foreground font-display font-bold text-lg sm:text-xl">KD</span>
              </div>
              <div>
                <h3 className="font-display font-bold text-lg sm:text-xl">K.DEEPA</h3>
                <p className="text-primary-foreground/70 text-xs">Life Insurance Advisor</p>
              </div>
            </div>
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <Trophy className="w-4 h-4 text-accent flex-shrink-0" />
              <span className="text-xs sm:text-sm text-accent">MDRT 2025 - Club Member</span>
            </div>
            <p className="text-primary-foreground/70 text-xs sm:text-sm mb-4 sm:mb-6 hidden sm:block">
              Providing trusted life insurance solutions with personalized service and expert guidance for over 15 years.
            </p>
            <div className="flex gap-2 sm:gap-3">
              <a
                href="https://www.facebook.com/share/1CYwZtCXBt/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 sm:w-10 sm:h-10 bg-primary-foreground/10 hover:bg-accent rounded-full flex items-center justify-center transition-colors"
              >
                <Facebook className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a
                href="https://www.instagram.com/deepa859k?igsh=MTl3NXZ1aDJta2tuZw=="
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 sm:w-10 sm:h-10 bg-primary-foreground/10 hover:bg-accent rounded-full flex items-center justify-center transition-colors"
              >
                <Instagram className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 sm:w-10 sm:h-10 bg-primary-foreground/10 hover:bg-accent rounded-full flex items-center justify-center transition-colors"
              >
                <Twitter className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/k-deepa-mdrt-usa-4983061a8"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 sm:w-10 sm:h-10 bg-primary-foreground/10 hover:bg-accent rounded-full flex items-center justify-center transition-colors"
              >
                <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-bold text-base sm:text-lg mb-3 sm:mb-4">Quick Links</h4>
            <ul className="space-y-1.5 sm:space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-primary-foreground/70 hover:text-accent transition-colors text-xs sm:text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Insurance Plans */}
          <div className="hidden sm:block">
            <h4 className="font-display font-bold text-base sm:text-lg mb-3 sm:mb-4">Insurance Plans</h4>
            <ul className="space-y-1.5 sm:space-y-2">
              {insuranceLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-primary-foreground/70 hover:text-accent transition-colors text-xs sm:text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-display font-bold text-base sm:text-lg mb-3 sm:mb-4">Contact Info</h4>
            <div className="space-y-2 sm:space-y-4">
              <a href="tel:+919789858708" className="flex items-center gap-2 sm:gap-3 text-primary-foreground/70 hover:text-accent transition-colors text-xs sm:text-sm">
                <Phone className="w-3 h-3 sm:w-4 sm:h-4 text-accent flex-shrink-0" />
                +91 9789858708
              </a>
              <a href="mailto:kdeepa3323@gmail.com" className="flex items-center gap-2 sm:gap-3 text-primary-foreground/70 hover:text-accent transition-colors text-xs sm:text-sm break-all">
                <Mail className="w-3 h-3 sm:w-4 sm:h-4 text-accent flex-shrink-0" />
                kdeepa3323@gmail.com
              </a>
              <div className="flex items-start gap-2 sm:gap-3 text-primary-foreground/70 text-xs sm:text-sm">
                <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-accent flex-shrink-0 mt-0.5" />
                Tamil Nadu, India
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container py-4 sm:py-6 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
          <div className="flex items-center gap-2">
            <a
              href="/admin"
              className="text-primary-foreground/20 hover:text-primary-foreground/40 transition-colors"
              title="Admin"
            >
              <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </a>
            <p className="text-primary-foreground/60 text-xs sm:text-sm text-center sm:text-left">
              © {currentYear} K.DEEPA - Life Insurance Advisor
            </p>
          </div>
          <div className="flex gap-4 sm:gap-6 text-xs sm:text-sm">
            <a href="#" className="text-primary-foreground/60 hover:text-accent transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-primary-foreground/60 hover:text-accent transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
