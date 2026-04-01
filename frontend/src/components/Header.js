import { useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const LOGO_URL =
  "https://customer-assets.emergentagent.com/job_61bf6bb0-964b-427a-a361-a1498f70c7d0/artifacts/l7sb3dj3_Copy%20of%20Pinoy%20General%20Insurance%20Logo%20%28800%20%C3%97%20800%20px%29.png";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Insurance Tips", href: "/insurance-tips" },
  { label: "Quote Center", href: "/quote-center" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const handleNavClick = useCallback((e, href) => {
    e.preventDefault();
    if (href.startsWith("/#")) {
      const hash = href.slice(1);
      if (location.pathname !== "/") {
        navigate("/");
        setTimeout(() => {
          document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
        }, 150);
      } else {
        document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
      }
    } else if (href.startsWith("#")) {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate(href);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [navigate, location.pathname]);

  const isActive = (href) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname === href || location.pathname.startsWith(href + "/");
  };

  return (
    <>
      <header
        data-testid="site-header"
        className={`sticky top-0 z-[1000] w-full transition-all duration-300 border-b border-[#E5E7EB] ${
          scrolled
            ? "bg-white shadow-[0_2px_10px_rgba(0,0,0,0.1)]"
            : "bg-white"
        }`}
      >
        <div className="max-w-[1200px] mx-auto px-5 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[72px]">
            {/* Logo */}
            <a
              href="/"
              onClick={(e) => handleNavClick(e, "/")}
              data-testid="header-logo"
              className="flex-shrink-0"
            >
              <img
                src={LOGO_URL}
                alt="Pinoy General Insurance Services"
                className="h-12 sm:h-14 w-auto !shadow-2xl"
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
                  onClick={(e) => handleNavClick(e, link.href)}
                  data-testid={`nav-link-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                  className={`font-medium text-base transition-all duration-300 relative pb-1 ${
                    isActive(link.href)
                      ? "text-[#2563EB] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-[#2563EB]"
                      : "text-[#1F2937] hover:text-[#2563EB] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-[#2563EB] after:transition-all hover:after:w-full"
                  }`}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="/quote-center"
                onClick={(e) => handleNavClick(e, "/quote-center")}
                data-testid="header-get-quote-btn"
                className="inline-flex items-center justify-center rounded-full bg-black px-6 py-2.5 text-base font-semibold text-white transition-all hover:opacity-90 hover:scale-[1.02] active:scale-[0.98]"
              >
                Get Quote
              </a>
            </nav>

            {/* Mobile Hamburger - only show when menu closed */}
            {!mobileOpen && (
              <button
                data-testid="mobile-menu-toggle"
                className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
                aria-expanded={false}
              >
                <Menu size={24} />
              </button>
            )}
            {mobileOpen && <div className="md:hidden w-10" aria-hidden="true" />}
          </div>
        </div>
      </header>

      {/* Full-screen Mobile Nav Overlay */}
      <div
        data-testid="mobile-nav-overlay"
        className={`fixed inset-0 z-[1001] md:hidden transition-all duration-400 ${
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Dark backdrop */}
        <div
          className="absolute inset-0 bg-black/40"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />

        {/* Slide-in panel */}
        <nav
          data-testid="mobile-nav"
          className={`absolute top-0 right-0 h-full w-[85%] max-w-[360px] bg-[#1E3A5F] shadow-2xl transition-transform duration-400 ease-out ${
            mobileOpen ? "translate-x-0" : "translate-x-full"
          }`}
          aria-label="Mobile navigation"
        >
          {/* Close button */}
          <div className="flex justify-end p-5">
            <button
              onClick={() => setMobileOpen(false)}
              data-testid="mobile-menu-close"
              className="p-2 rounded-lg text-white hover:bg-white/10 transition-colors"
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </div>

          {/* Nav Links */}
          <div className="flex flex-col px-6 mt-4 gap-2">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  handleNavClick(e, link.href);
                  setMobileOpen(false);
                }}
                data-testid={`mobile-nav-link-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                className={`text-2xl font-medium py-3 px-3 rounded-lg transition-colors ${
                  isActive(link.href)
                    ? "text-[#FDB813] bg-white/10"
                    : "text-white hover:bg-white/10"
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Get Quote button at bottom */}
          <div className="absolute bottom-10 left-6 right-6">
            <a
              href="/quote-center"
              onClick={(e) => {
                handleNavClick(e, "/quote-center");
                setMobileOpen(false);
              }}
              data-testid="mobile-get-quote-btn"
              className="w-full inline-flex items-center justify-center rounded-full bg-[#FDB813] px-7 py-3.5 text-base font-bold text-black transition-all hover:bg-[#E5A700]"
            >
              Get Quote
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}
