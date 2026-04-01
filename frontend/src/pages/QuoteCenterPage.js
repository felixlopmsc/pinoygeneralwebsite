import { useState } from "react";
import { X } from "lucide-react";
import Header from "@/components/Header";
import ContactSection from "@/components/ContactSection";

const QUOTE_CARDS = [
  {
    title: "Home",
    description: "Protect your home with plans that fit your lifestyle and budget.",
    image: "https://images.pexels.com/photos/8031952/pexels-photo-8031952.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    alt: "White house with lawn",
    link: "#home-quote",
  },
  {
    title: "Auto",
    description: "Find coverage options tailored to your vehicle and driving needs.",
    image: "https://images.unsplash.com/photo-1768066522148-2a9d0df56803?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzV8MHwxfHNlYXJjaHwyfHx3aGl0ZSUyMHNwb3J0cyUyMGNhciUyMGx1eHVyeSUyMG1vZGVybnxlbnwwfHx8fDE3NzUwMDQwNzV8MA&ixlib=rb-4.1.0&q=85",
    alt: "White sports car",
    link: "/auto-insurance",
  },
  {
    title: "Renter's",
    description: "Get protection for your renting needs that fit your lifestyle and budget.",
    image: "https://images.unsplash.com/photo-1772907723263-70940dfd71f2?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAxODF8MHwxfHNlYXJjaHwxfHxhcGFydG1lbnQlMjBidWlsZGluZyUyMGV4dGVyaW9yJTIwbW9kZXJuJTIwcmVudGFsfGVufDB8fHx8MTc3NTAwNDA4Mnww&ixlib=rb-4.1.0&q=85",
    alt: "Apartment building",
    link: "#renters-quote",
  },
  {
    title: "Commercial",
    description: "Secure your business with the right commercial insurance tailored to your specific needs.",
    image: "https://images.unsplash.com/photo-1770530333347-2142ccd028c1?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2OTV8MHwxfHNlYXJjaHwyfHxjb21tZXJjaWFsJTIwb2ZmaWNlJTIwYnVpbGRpbmclMjBuaWdodCUyMGlsbHVtaW5hdGVkfGVufDB8fHx8MTc3NTAwNDEwMnww&ixlib=rb-4.1.0&q=85",
    alt: "Commercial building at night",
    link: "#commercial-quote",
  },
];

const MODAL_IMAGE =
  "https://images.unsplash.com/photo-1758876017967-c023c40c0a53?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzZ8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHRhbGtpbmclMjBwaG9uZSUyMG9mZmljZSUyMGN1c3RvbWVyJTIwc2VydmljZXxlbnwwfHx8fDE3NzUwMDQxMDl8MA&ixlib=rb-4.1.0&q=85";

function QuoteCard({ title, description, image, alt, link, index }) {
  return (
    <div
      data-testid={`quote-card-${title.toLowerCase().replace(/['\s]+/g, "-")}`}
      className="bg-[#F3F4F6] rounded-2xl p-8 sm:p-10 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-xl animate-fade-in-up"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <h3 className="text-2xl sm:text-[32px] font-bold text-[#1F2937]">{title}</h3>
      <p className="mt-3 text-base text-[#6B7280] leading-relaxed">{description}</p>
      <div className="mt-6 overflow-hidden rounded-xl h-[200px]">
        <img
          src={image}
          alt={alt}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          onLoad={(e) => e.target.classList.add("loaded")}
        />
      </div>
      <a
        href={link}
        data-testid={`quote-btn-${title.toLowerCase().replace(/['\s]+/g, "-")}`}
        className="mt-6 inline-flex items-center justify-center rounded-full bg-black px-7 py-3 text-[15px] font-semibold text-white transition-all hover:bg-gray-800 hover:scale-[1.02] active:scale-[0.98]"
      >
        Get a Quote
      </a>
    </div>
  );
}

function CallbackModal({ open, onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    reason: "",
    bestTime: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleClose = () => {
    setSubmitted(false);
    setFormData({ fullName: "", phone: "", reason: "", bestTime: "" });
    onClose();
  };

  if (!open) return null;

  return (
    <div
      data-testid="callback-modal-overlay"
      className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-8"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Request immediate callback"
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70" aria-hidden="true" />

      {/* Modal */}
      <div
        data-testid="callback-modal"
        className="relative z-10 bg-white rounded-2xl w-full max-w-[700px] max-h-[90vh] overflow-y-auto shadow-2xl animate-scale-in"
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          data-testid="callback-modal-close"
          className="absolute top-4 right-4 p-2 rounded-lg hover:bg-gray-100 transition-colors z-10"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        <div className="flex flex-col md:flex-row">
          {/* Form side */}
          <div className="flex-1 p-8 sm:p-10 lg:p-12">
            {submitted ? (
              <div data-testid="callback-success" className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-[#1F2937]">Request Sent!</h3>
                <p className="mt-2 text-[#6B7280]">
                  We&rsquo;ll call you back as soon as possible. Thank you!
                </p>
                <button
                  onClick={handleClose}
                  className="mt-6 inline-flex items-center justify-center rounded-full bg-[#2563EB] px-8 py-3 text-base font-semibold text-white transition-all hover:bg-[#1D4ED8]"
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-2xl sm:text-[32px] font-bold text-[#1F2937]">
                  All Lines Busy?
                </h2>
                <p className="mt-2 text-lg text-[#6B7280]">Called, but missed us?</p>
                <p className="mt-4 text-base text-[#6B7280] leading-relaxed">
                  Request an immediate call back, and we will do our best to call
                  back to address your inquiry.
                </p>

                <form
                  onSubmit={handleSubmit}
                  data-testid="callback-form"
                  className="mt-8 space-y-4"
                >
                  <div>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Full Name*"
                      required
                      data-testid="callback-input-name"
                      className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-[#1F2937] text-base placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent transition-all"
                      aria-label="Full Name"
                    />
                  </div>
                  <div>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Phone* (123-456-7890)"
                      required
                      data-testid="callback-input-phone"
                      className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-[#1F2937] text-base placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent transition-all"
                      aria-label="Phone number"
                    />
                  </div>
                  <div>
                    <textarea
                      name="reason"
                      value={formData.reason}
                      onChange={handleChange}
                      placeholder="Reason for Calling*"
                      required
                      rows={3}
                      data-testid="callback-input-reason"
                      className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-[#1F2937] text-base placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent transition-all resize-none"
                      aria-label="Reason for calling"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      name="bestTime"
                      value={formData.bestTime}
                      onChange={handleChange}
                      placeholder="Best Time To Call (11:00 AM, 2:00 PM, etc.)"
                      data-testid="callback-input-time"
                      className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-[#1F2937] text-base placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent transition-all"
                      aria-label="Best time to call"
                    />
                  </div>
                  <button
                    type="submit"
                    data-testid="callback-submit-btn"
                    className="w-full inline-flex items-center justify-center rounded-full bg-[#2563EB] px-8 py-3.5 text-base font-semibold text-white transition-all hover:bg-[#1D4ED8] hover:scale-[1.01] active:scale-[0.99]"
                  >
                    Request Immediate Call Back
                  </button>
                </form>
              </>
            )}
          </div>

          {/* Image side - hidden on mobile */}
          <div className="hidden md:block w-[240px] flex-shrink-0">
            <img
              src={MODAL_IMAGE}
              alt="Customer service representative on phone"
              className="h-full w-full object-cover rounded-r-2xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function QuoteCenterPage() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="min-h-screen" data-testid="quote-center-page">
      <Header />

      {/* Page Header */}
      <section className="bg-white py-16 md:py-20" data-testid="quote-header-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1
            data-testid="quote-center-headline"
            className="text-4xl sm:text-5xl lg:text-[56px] font-bold text-[#1F2937] tracking-tight"
          >
            Get Quotes
          </h1>
          <p className="mt-4 text-base md:text-lg text-[#6B7280] max-w-[700px] mx-auto leading-relaxed">
            Choose your insurance type below to start your personalized quote
            quickly and easily.
          </p>

          {/* Callback CTA */}
          <div className="mt-10">
            <button
              onClick={() => setModalOpen(true)}
              data-testid="callback-cta-btn"
              className="inline-flex items-center justify-center rounded-full bg-[#8B0000] px-12 py-4 text-base font-bold text-white transition-all hover:bg-[#700000] hover:scale-[1.02] active:scale-[0.98] shadow-lg"
            >
              Request Immediate Call Back
            </button>
          </div>
        </div>
      </section>

      {/* Quote Options Grid */}
      <section
        className="bg-white pb-16 md:pb-24"
        data-testid="quote-grid-section"
      >
        <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {QUOTE_CARDS.map((card, i) => (
              <QuoteCard key={card.title} {...card} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <ContactSection />

      {/* Callback Modal */}
      <CallbackModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
