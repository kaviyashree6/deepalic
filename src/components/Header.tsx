import { useState } from "react";
import { Phone, Mail, Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About Us", href: "#about" },
  {
    name: "Life Insurance",
    href: "#insurance",
    subLinks: [
      { name: "Endowment Plans", href: "/plans/endowment" },
      { name: "Children Plans", href: "/plans/children" },
      { name: "Pension Plans", href: "/plans/pension" },
      { name: "Money Back Plans", href: "/plans/moneyback" },
      { name: "Health Plans", href: "/plans/health" },
      { name: "Term Plans", href: "/plans/term" },
      { name: "ULIP Plans", href: "/plans/ulip" },
      { name: "Whole Life Plans", href: "/plans/wholelife" },
    ],
  },
  { name: "News", href: "#news" },
  { name: "Gallery", href: "#gallery" },
  { name: "Testimonials", href: "#testimonials" },
  { name: "Contact Us", href: "#contact" },
];

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-primary text-primary-foreground py-2">
        <div className="container flex justify-between items-center text-sm">
          <div className="flex items-center gap-6">
            <a href="tel:+919789858708" className="flex items-center gap-2 hover:text-accent transition-colors">
              <Phone className="w-4 h-4" />
              <span className="hidden sm:inline">Call Us Today:</span>
              <span className="font-semibold">+91 9789858708</span>
            </a>
            <a href="mailto:kdeepa3323@gmail.com" className="hidden md:flex items-center gap-2 hover:text-accent transition-colors">
              <Mail className="w-4 h-4" />
              <span>kdeepa3323@gmail.com</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="bg-primary/95 backdrop-blur-sm shadow-custom">
        <div className="container flex justify-between items-center py-4">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-3">
            <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center">
              <span className="text-accent-foreground font-display font-bold text-xl">KD</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-primary-foreground font-display font-bold text-xl">K.DEEPA</h1>
              <p className="text-primary-foreground/70 text-xs">Life Insurance Advisor</p>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-0.5 xl:gap-1">
            {navLinks.map((link) => (
              <div
                key={link.name}
                className="relative"
                onMouseEnter={() => link.subLinks && setOpenDropdown(link.name)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <a
                  href={link.href}
                  className="nav-link px-2 xl:px-4 py-2 flex items-center gap-1 text-sm xl:text-base"
                >
                  {link.name}
                  {link.subLinks && <ChevronDown className="w-4 h-4" />}
                </a>
                {link.subLinks && openDropdown === link.name && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 bg-card rounded-lg shadow-custom-lg py-2 min-w-[200px]"
                  >
                    {link.subLinks.map((subLink) => (
                      <Link
                        key={subLink.name}
                        to={subLink.href}
                        className="block px-4 py-2 text-foreground hover:bg-secondary hover:text-accent transition-colors"
                      >
                        {subLink.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-primary-foreground p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden bg-primary border-t border-primary-foreground/10 overflow-hidden"
            >
              <div className="container py-4 space-y-2">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="block text-primary-foreground py-2 hover:text-accent transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
