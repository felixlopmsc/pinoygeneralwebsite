import { Phone, Mail, Facebook, Linkedin } from "lucide-react";

const LOGO_URL =
"https://customer-assets.emergentagent.com/job_61bf6bb0-964b-427a-a361-a1498f70c7d0/artifacts/l7sb3dj3_Copy%20of%20Pinoy%20General%20Insurance%20Logo%20%28800%20%C3%97%20800%20px%29.png";

export default function ContactSection() {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <section
      id="contact"
      data-testid="contact-section"
      className="bg-[#334155] py-16 md:py-20 lg:py-24"
      aria-label="Contact us">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Column – Contact Info */}
          <div className="animate-fade-in-up">
            <h2
              data-testid="contact-headline"
              className="text-3xl md:text-4xl font-bold text-white">

              Contact Us Today
            </h2>
            <p className="mt-4 text-base text-white/80 leading-relaxed max-w-md">
              Contact us here at Pinoy General Insurance Services today for all
              your insurance needs.
            </p>

            {/* Contact Details */}
            <div className="mt-8 space-y-4">
              <a
                href="tel:+15624021737"
                data-testid="contact-phone"
                className="flex items-center gap-3 text-white text-lg hover:text-[#F4C430] transition-colors">

                <Phone size={20} className="flex-shrink-0" />
                <span>(562) 402 - 1737</span>
              </a>
              <a
                href="mailto:info@pinoygeneralinsurance.com"
                data-testid="contact-email"
                className="flex items-center gap-3 text-white text-lg hover:text-[#F4C430] transition-colors">

                <Mail size={20} className="flex-shrink-0" />
                <span>info@pinoygeneralinsurance.com</span>
              </a>
            </div>

            {/* Social Icons */}
            <div className="mt-6 flex items-center gap-4">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="social-facebook"
                className="text-white hover:text-[#F4C430] transition-colors"
                aria-label="Facebook">

                <Facebook size={24} />
              </a>
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="social-linkedin"
                className="text-white hover:text-[#F4C430] transition-colors"
                aria-label="LinkedIn">

                <Linkedin size={24} />
              </a>
            </div>
          </div>

          {/* Right Column – Form + Image */}
          <div className="animate-fade-in-up delay-200">
            <form
              onSubmit={handleSubmit}
              data-testid="contact-form"
              className="space-y-4">

              <input
                type="text"
                placeholder="Your Full Name"
                aria-label="Your Full Name"
                data-testid="contact-name-input"
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3.5 text-[#1F2937] text-base placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent transition-all" />

              <button
                type="submit"
                data-testid="contact-submit-btn"
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-full bg-[#2563EB] px-8 py-3.5 text-base font-semibold text-white transition-all hover:bg-[#1D4ED8] hover:scale-[1.02] active:scale-[0.98]">

                Get a Quote
              </button>
            </form>

            {/* Logo below form */}
            <div className="mt-8">
              <img
                src={LOGO_URL}
                alt="Pinoy General Insurance Services"
                loading="lazy"
                className="max-w-[200px] loaded p-3 rounded-2xl !shadow-xl bg-white"
                onLoad={(e) => e.target.classList.add("loaded")} />

            </div>
          </div>
        </div>

        {/* Footer */}
        <footer data-testid="site-footer" className="mt-12 lg:mt-16 pt-8 border-t border-white/10">
          <p className="text-sm text-white/60 text-center">
            &copy; 2026 Pinoy General Insurance Services. All rights reserved.
          </p>
        </footer>
      </div>
    </section>);

}