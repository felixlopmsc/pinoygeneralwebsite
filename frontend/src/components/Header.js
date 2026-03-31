import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const LOGO_URL =
  "https://customer-assets.emergentagent.com/job_61bf6bb0-964b-427a-a361-a1498f70c7d0/artifacts/l7sb3dj3_Copy%20of%20Pinoy%20General%20Insurance%20Logo%20%28800%20%C3%97%20800%20px%29.png";

const NAV_LINKS = [
  { label: "Home", href: "#hero" },
  { label: "Insurance Tips", href: "#" },
  { label: "Quote Center", href: "#contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-testid="site-header"
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-xl shadow-md"
          : "bg-white"
      } border-b border-gray-100`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a
            href="#hero"
            data-testid="header-logo"
            className="flex-shrink-0"
          >
            <img
              src={LOGO_URL}
              alt="Pinoy General Insurance Services"
              className="h-14 sm:h-16 w-auto"
            />
          </a>

          {/* Desktop Nav */}
          <nav
            className="hidden md:flex items-center gap-8"
            data-testid="desktop-nav"
            aria-label="Main navigation"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                data-testid={`nav-link-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                className="text-[#1F2937] font-medium text-[15px] transition-colors hover:text-[#2563EB] relative after:absolute after:bottom-[-2px] after:left-0 after:h-[2px] after:w-0 after:bg-[#2563EB] after:transition-all hover:after:w-full"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              data-testid="header-get-quote-btn"
              className="inline-flex items-center justify-center rounded-full bg-black px-7 py-2.5 text-[15px] font-semibold text-white transition-all hover:bg-gray-800 hover:scale-[1.02] active:scale-[0.98]"
            >
              Get Quote
            </a>
          </nav>

          {/* Mobile Hamburger */}
          <button
            data-testid="mobile-menu-toggle"
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <nav
            data-testid="mobile-nav"
            className="md:hidden pb-6 pt-2 border-t border-gray-100 animate-fade-in"
            aria-label="Mobile navigation"
          >
            <div className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-[#1F2937] font-medium text-base px-3 py-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                data-testid="mobile-get-quote-btn"
                className="mt-2 inline-flex items-center justify-center rounded-full bg-black px-7 py-3 text-base font-semibold text-white transition-all hover:bg-gray-800"
              >
                Get Quote
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
