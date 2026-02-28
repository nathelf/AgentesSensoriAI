import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { getDashboardUrl, getCheckoutUrl } from "@/config";

const navItems = [
  { label: "Problema", href: "#problema" },
  { label: "Nichos", href: "#nichos" },
  { label: "Como Funciona", href: "#como-funciona" },
  { label: "Dashboard", href: getDashboardUrl(), openInNewTab: true },
  { label: "Planos", href: getCheckoutUrl(), openInNewTab: true },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border shadow-lg shadow-background/50"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="flex items-center"
        >
          <img src="/logo-sensoriai-icon.png" alt="SensoriAI" className="h-9 w-auto" />
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) =>
            "openInNewTab" in item && item.openInNewTab ? (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-md block"
              >
                {item.label}
              </a>
            ) : (
              <button
                key={item.href}
                onClick={() => handleClick(item.href)}
                className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-md"
              >
                {item.label}
              </button>
            )
          )}
          <a
            href={getDashboardUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-3 px-5 py-2 text-sm font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors inline-block"
          >
            Demo Grátis
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-foreground"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {navItems.map((item) =>
                "openInNewTab" in item && item.openInNewTab ? (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMobileOpen(false)}
                    className="block w-full text-left px-3 py-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-md"
                  >
                    {item.label}
                  </a>
                ) : (
                  <button
                    key={item.href}
                    onClick={() => handleClick(item.href)}
                    className="block w-full text-left px-3 py-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-md"
                  >
                    {item.label}
                  </button>
                )
              )}
              <a
                href={getDashboardUrl()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileOpen(false)}
                className="block w-full mt-2 px-5 py-2.5 text-sm font-semibold rounded-lg bg-primary text-primary-foreground text-center"
              >
                Demo Grátis
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
