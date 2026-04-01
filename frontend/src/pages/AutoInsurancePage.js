import { Phone, Mail, MapPin, MessageCircle, Building2, ClipboardList, Shield, ChevronDown, ChevronUp, Car, Users, Clock } from "lucide-react";
import { useState } from "react";
import Header from "@/components/Header";
import ContactSection from "@/components/ContactSection";

/* ─── Image URLs ─── */
const IMG = {
  dealership: "https://images.pexels.com/photos/6816996/pexels-photo-6816996.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  dashboard: "https://images.unsplash.com/photo-1758411898007-6a17c74ef528?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA2OTV8MHwxfHNlYXJjaHwxfHxjYXIlMjBkYXNoYm9hcmQlMjBzcGVlZG9tZXRlciUyMGludGVyaW9yJTIwbW9kZXJufGVufDB8fHx8MTc3NTA3MjYwNXww&ixlib=rb-4.1.0&q=85",
  commercial: "https://images.pexels.com/photos/6169129/pexels-photo-6169129.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  carInterior: "https://images.pexels.com/photos/67088/pexels-photo-67088.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  piggyBank: "https://images.pexels.com/photos/11624819/pexels-photo-11624819.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  darkRoad: "https://images.unsplash.com/photo-1762118329817-1621c8cf3438?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzR8MHwxfHNlYXJjaHwxfHxkYXJrJTIwY2FyJTIwaW50ZXJpb3IlMjBibHVycmVkJTIwbmlnaHQlMjBkcml2aW5nfGVufDB8fHx8MTc3NTA3MjY0MHww&ixlib=rb-4.1.0&q=85",
  highway: "https://images.pexels.com/photos/8783583/pexels-photo-8783583.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
};

/* ─── Coverage Accordion Data ─── */
const COVERAGES = [
  {
    title: "Liability Coverage (Required by Law)",
    content: [
      { sub: "Bodily Injury Liability", text: "Pays for injuries you cause to other people in an accident. This includes medical bills, lost wages, pain and suffering, and legal defense costs if you're sued." },
      { sub: "Property Damage Liability", text: "Covers damage you cause to someone else's property—their car, a fence, a building, or other structures." },
      { sub: "Recommended Liability Limits", text: "California's minimum limits (15/30/5) are dangerously low. We typically recommend at least 100/300/100 for most drivers, with an umbrella policy for additional protection." },
    ],
  },
  {
    title: "Collision Coverage",
    content: [{ text: "Pays to repair or replace your vehicle when it's damaged in an accident, regardless of who's at fault. This is especially important for newer or financed vehicles." }],
  },
  {
    title: "Comprehensive Coverage",
    content: [{ text: "Covers damage from events other than collisions—theft, vandalism, fire, natural disasters, falling objects, and animal strikes. In Southern California, this includes protection from wildfire damage and the occasional earthquake-related hazard." }],
  },
  {
    title: "Uninsured/Underinsured Motorist Coverage",
    content: [{ text: "Protects you when the at-fault driver has no insurance or insufficient coverage. According to the Insurance Information Institute, about 16.6% of California drivers are uninsured—one of the highest rates in the nation." }],
  },
  {
    title: "Medical Payments Coverage",
    content: [{ text: "Pays medical expenses for you and your passengers after an accident, regardless of fault. This can cover hospital visits, surgery, X-rays, and even funeral expenses." }],
  },
  {
    title: "Rental Reimbursement",
    content: [{ text: "Covers the cost of a rental car while your vehicle is being repaired after a covered claim. This is one of the most affordable add-ons and one of the most appreciated when needed." }],
  },
  {
    title: "Roadside Assistance",
    content: [{ text: "Provides help when you're stranded—towing, flat tire changes, battery jumps, lockout service, and fuel delivery. Peace of mind for every trip." }],
  },
];

/* ─── Section 4 Data ─── */
const LOCAL_AGENT_SECTIONS = [
  {
    icon: MessageCircle,
    title: "Personal Service You Can Count On",
    content: "When you call us, you speak with a real person in Cerritos who knows you by name—not a call center on the other side of the country. We build relationships with our clients because we're part of the same community. We see you at local restaurants, shop at the same stores, and understand the driving conditions and risks specific to our area.",
  },
  {
    icon: Building2,
    title: "Independent Agency Advantage",
    content: null,
    bullets: [
      "More choices – We shop your coverage with several companies, not just one",
      "Better prices – Competition among carriers works in your favor",
      "Unbiased advice – We recommend what's best for you, not what benefits one insurance company",
      "Flexibility – If your current carrier raises rates, we can easily move you to a better option",
    ],
    summary: "One conversation, multiple quotes, best value. That's the independent agency advantage.",
  },
  {
    icon: ClipboardList,
    title: "Local Knowledge of California Requirements and Risks",
    content: "We know California insurance law inside and out—from minimum liability requirements to the specific risks Southern California drivers face, including high-traffic corridors, wildfire zones, and uninsured motorist statistics. Our local expertise means we can recommend coverage that truly protects you.",
  },
  {
    icon: Shield,
    title: "Claims Support When You Need It Most",
    content: "When an accident happens, you need an advocate—not a website. We guide you through the entire claims process: filing the claim, communicating with the insurance company, arranging repairs, and ensuring you receive fair compensation. You're never alone when you work with us.",
  },
];

/* ─── Rate Factors ─── */
const RATE_FACTORS = [
  "Driving record and claims history",
  "Vehicle year, make, model, and safety features",
  "Coverage limits and deductible choices",
  "Annual mileage and commute distance",
  "Credit-based insurance score (where permitted)",
  "Location and where you park overnight",
  "Age, gender, and marital status",
  "Multi-policy and multi-vehicle discounts",
];

/* ─── Service Areas ─── */
const SERVICE_AREAS = [
  { county: "Los Angeles County", cities: "Cerritos, Norwalk, Artesia, La Mirada, Bellflower, Lakewood, Hawaiian Gardens, Long Beach, and Downey" },
  { county: "Orange County", cities: "Buena Park, La Palma, Fullerton, Cypress, Anaheim, Orange, Irvine, Tustin, and Mission Viejo" },
  { county: "Riverside County", cities: "Corona, Norco, Riverside, Jurupa Valley, Moreno Valley, Murrieta, Temecula, and Lake Elsinore" },
  { county: "San Bernardino County", cities: "Chino Hills, Claremont, Upland, Ontario, Rancho Cucamonga, Fontana, Rialto, Redlands, San Bernardino, Colton, and Victorville" },
  { county: "San Diego County", cities: "Oceanside, Carlsbad, Encinitas, Del Mar, Vista, Escondido, San Marcos, Poway, El Cajon, Chula Vista, Ocean Beach, and San Diego" },
  { county: "Ventura County", cities: "Ventura, Oxnard, Camarillo, Thousand Oaks, Ojai, Simi Valley, Santa Paula, and Port Hueneme" },
];

/* ─── Reusable Buttons ─── */
function GoldBtn({ children, className = "" }) {
  return (
    <a
      href="#contact"
      className={`inline-flex items-center justify-center rounded-full bg-[#FDB813] px-8 py-3.5 text-base font-bold text-black transition-all hover:bg-[#E5A700] hover:scale-[1.02] active:scale-[0.98] shadow-md ${className}`}
    >
      {children}
    </a>
  );
}

function BlackBtn({ children, href = "#contact", className = "" }) {
  return (
    <a
      href={href}
      className={`inline-flex items-center justify-center rounded-full bg-black px-7 py-3 text-[15px] font-semibold text-white transition-all hover:bg-gray-800 hover:scale-[1.02] active:scale-[0.98] ${className}`}
    >
      {children}
    </a>
  );
}

function OutlinedBtn({ children, className = "" }) {
  return (
    <a
      href="#contact"
      className={`inline-flex items-center justify-center rounded-full border-2 border-black px-7 py-3 text-[15px] font-semibold text-black transition-all hover:bg-black hover:text-white ${className}`}
    >
      {children}
    </a>
  );
}

/* ─── Accordion Item ─── */
function CoverageAccordion({ item, index }) {
  const [open, setOpen] = useState(index === 0);
  return (
    <div
      data-testid={`coverage-accordion-${index}`}
      className="border-b border-gray-200 last:border-b-0"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left transition-colors hover:text-[#2563EB]"
        aria-expanded={open}
      >
        <span className="text-xl sm:text-2xl font-bold text-[#2563EB]">{item.title}</span>
        {open ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>
      {open && (
        <div className="pb-5 space-y-3 animate-fade-in">
          {item.content.map((c, i) => (
            <div key={i}>
              {c.sub && <p className="font-semibold text-[#1F2937] text-lg">{c.sub}</p>}
              <p className="text-[#6B7280] text-base leading-relaxed">{c.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════ */
export default function AutoInsurancePage() {
  return (
    <div className="min-h-screen" data-testid="auto-insurance-page">
      <Header />

      {/* ─── SECTION 1: HERO ─── */}
      <section
        data-testid="auto-hero-section"
        className="bg-gradient-to-br from-[#1E3A5F] via-[#1a3354] to-[#152a45] py-20 md:py-24 lg:py-28"
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center animate-fade-in-up">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight">
            Get Your Auto Insurance Quote
          </h1>
          <p className="mt-4 text-base sm:text-lg text-white/90 leading-relaxed max-w-[700px] mx-auto">
            Protect your car and belongings. We match you with carriers that offer strong coverage and fair prices.
          </p>
          <div className="mt-8">
            <GoldBtn>Start Auto Quote</GoldBtn>
          </div>
        </div>
      </section>

      {/* ─── SECTION 2: AUTO INSURANCE GUIDE ─── */}
      <section data-testid="auto-guide-section" className="bg-white py-16 md:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="animate-fade-in-up">
              <h2 className="text-3xl md:text-4xl font-bold text-[#1F2937] leading-tight">
                Your Auto Insurance Guide
              </h2>
              <p className="mt-4 text-base md:text-lg text-[#6B7280] leading-relaxed">
                Helping you understand auto insurance so you can protect what matters most on the road.
              </p>
              <div className="mt-6">
                <OutlinedBtn>Get Quote</OutlinedBtn>
              </div>
            </div>
            <div className="relative animate-fade-in-up delay-200">
              <img
                src={IMG.dealership}
                alt="Person at car dealership smiling"
                loading="lazy"
                className="w-full rounded-2xl object-cover h-[350px] sm:h-[420px]"
                onLoad={(e) => e.target.classList.add("loaded")}
              />
              <div className="absolute bottom-4 right-4 bg-[#2563EB] rounded-xl p-5 shadow-xl">
                <div className="flex items-center gap-2 text-white">
                  <Users size={20} />
                  <span className="text-xl font-bold">2000+</span>
                  <span className="text-sm text-white/80">Clients Served</span>
                </div>
                <div className="flex items-center gap-2 text-white mt-3">
                  <Clock size={20} />
                  <span className="text-xl font-bold">30+</span>
                  <span className="text-sm text-white/80">Years in Service</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 3: ABOUT US / CONTACT ─── */}
      <section data-testid="auto-about-section" className="bg-white py-12 md:py-16">
        <div className="max-w-[900px] mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1F2937]">
            Get Your Free Auto Insurance Quote Today
          </h2>
          <div className="mt-6 space-y-3 inline-block text-left">
            <a href="tel:+15624021737" className="flex items-center gap-3 text-[#1F2937] text-lg hover:text-[#2563EB] transition-colors">
              <Phone size={20} className="text-pink-500 flex-shrink-0" />
              Call us at (562) 402 - 1737
            </a>
            <a href="mailto:info@pinoygeneralinsurance.com" className="flex items-center gap-3 text-[#1F2937] text-lg hover:text-[#2563EB] transition-colors">
              <Mail size={20} className="text-pink-500 flex-shrink-0" />
              Email: info@pinoygeneralinsurance.com
            </a>
            <p className="flex items-center gap-3 text-[#1F2937] text-lg">
              <MapPin size={20} className="text-pink-500 flex-shrink-0" />
              Visit our Cerritos office at 17304 Norwalk Blvd., Cerritos, CA 90703
            </p>
          </div>
          <p className="mt-4 text-base text-[#6B7280] italic">
            Serving Southern California drivers since 1993 | Compare rates from multiple A-rated carriers in one easy conversation
          </p>
          <div className="mt-8">
            <GoldBtn>Get Quote</GoldBtn>
          </div>
        </div>
      </section>

      {/* ─── SECTION 4: WHY CHOOSE A LOCAL AGENT ─── */}
      <section
        data-testid="auto-local-agent-section"
        className="relative overflow-hidden"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${IMG.darkRoad})` }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-black/75" aria-hidden="true" />
        <div className="relative z-10 py-20 md:py-24 lg:py-28 px-4 sm:px-6">
          <div className="max-w-[1000px] mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12 lg:mb-16">
              Why Choose a Local Agent for Auto Insurance
            </h2>
            <div className="space-y-10">
              {LOCAL_AGENT_SECTIONS.map((section, i) => {
                const Icon = section.icon;
                return (
                  <div
                    key={i}
                    data-testid={`local-agent-item-${i}`}
                    className="animate-fade-in-up"
                    style={{ animationDelay: `${i * 100}ms` }}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                        <Icon size={20} className="text-white" />
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold text-white">{section.title}</h3>
                    </div>
                    {section.content && (
                      <p className="text-white/85 text-base leading-relaxed ml-[52px]">{section.content}</p>
                    )}
                    {section.bullets && (
                      <ul className="ml-[52px] mt-3 space-y-2">
                        {section.bullets.map((b, j) => (
                          <li key={j} className="text-white/85 text-base leading-relaxed flex gap-2">
                            <span className="text-[#FDB813] mt-1">&#8226;</span>
                            {b}
                          </li>
                        ))}
                      </ul>
                    )}
                    {section.summary && (
                      <p className="text-white font-semibold text-base mt-4 ml-[52px]">{section.summary}</p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 5: COVERAGE OPTIONS ─── */}
      <section data-testid="auto-coverage-section" className="bg-white py-16 md:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1F2937] leading-tight">
                Understanding Your Auto Insurance Coverage Options
              </h2>
              <p className="mt-4 text-base md:text-lg text-[#6B7280] leading-relaxed">
                Auto insurance policies contain several types of coverage. Understanding what each covers—and what it doesn't—helps you make informed decisions about the protection you need.
              </p>
              <div className="mt-8 divide-y divide-gray-200 border-t border-gray-200">
                {COVERAGES.map((item, i) => (
                  <CoverageAccordion key={i} item={item} index={i} />
                ))}
              </div>
            </div>
            <div className="lg:sticky lg:top-28 animate-fade-in-up delay-200">
              <img
                src={IMG.dashboard}
                alt="Car speedometer and dashboard"
                loading="lazy"
                className="w-full rounded-2xl object-cover h-[300px] sm:h-[400px]"
                onLoad={(e) => e.target.classList.add("loaded")}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 6: COMMERCIAL AUTO ─── */}
      <section data-testid="auto-commercial-section" className="bg-white py-16 md:py-20 lg:py-24 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="order-2 lg:order-1 animate-fade-in-up">
              <img
                src={IMG.commercial}
                alt="Person driving commercial delivery vehicle"
                loading="lazy"
                className="w-full rounded-2xl object-cover h-[300px] sm:h-[400px]"
                onLoad={(e) => e.target.classList.add("loaded")}
              />
            </div>
            <div className="order-1 lg:order-2 animate-fade-in-up delay-200">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1F2937] leading-tight">
                Commercial Auto Insurance for Southern California Businesses
              </h2>
              <p className="mt-4 text-base md:text-lg text-[#6B7280] leading-relaxed">
                If your business uses vehicles for deliveries, service calls, transporting goods, or employee travel, you likely need commercial auto insurance. Personal auto policies typically exclude business use.
              </p>
              <p className="mt-3 text-base text-[#6B7280] leading-relaxed">
                Commercial auto covers liability, collision, comprehensive, medical payments, and uninsured motorist protection—specifically designed for business vehicles and business use.
              </p>
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <BlackBtn>Commercial Insurance</BlackBtn>
                <GoldBtn>Get an Auto Insurance Quote</GoldBtn>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 7: FACTORS AFFECTING RATES ─── */}
      <section data-testid="auto-rates-section" className="bg-[#F9FAFB] py-16 md:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="animate-fade-in-up">
              <h2 className="text-3xl md:text-4xl font-bold text-[#1F2937] leading-tight">
                Factors that Affect Your Auto Insurance Rate
              </h2>
              <ul className="mt-6 space-y-3">
                {RATE_FACTORS.map((factor, i) => (
                  <li key={i} className="flex items-start gap-3 text-[#6B7280] text-base leading-relaxed">
                    <Car size={18} className="text-[#2563EB] mt-1 flex-shrink-0" />
                    {factor}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-base text-[#6B7280] leading-relaxed italic">
                Living in Cerritos, for example, with its well-maintained roads and relatively low crime, generally results in competitive rates compared to other Southern California communities.
              </p>
              <div className="mt-8 text-center lg:text-left">
                <GoldBtn>Get a Quote</GoldBtn>
              </div>
            </div>
            <div className="animate-fade-in-up delay-200">
              <img
                src={IMG.carInterior}
                alt="Blurred car interior at night"
                loading="lazy"
                className="w-full rounded-2xl object-cover h-[300px] sm:h-[380px]"
                onLoad={(e) => e.target.classList.add("loaded")}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 8: SMART WAYS TO SAVE ─── */}
      <section data-testid="auto-savings-section" className="bg-white py-16 md:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="animate-fade-in-up">
              <h2 className="text-3xl md:text-4xl font-bold text-[#1F2937] leading-tight">
                Smart Ways to Save on Car Insurance in Cerritos (and Southern California)
              </h2>
              <p className="mt-4 text-base md:text-lg text-[#6B7280] leading-relaxed">
                As an independent agency, we do the comparison shopping for you. One conversation with us covers multiple companies—you don't waste time contacting multiple companies—we handle it all.
              </p>
              <div className="mt-8">
                <GoldBtn>Get an Auto Insurance Quote</GoldBtn>
              </div>
            </div>
            <div className="animate-fade-in-up delay-200">
              <img
                src={IMG.piggyBank}
                alt="Pink piggy bank with savings"
                loading="lazy"
                className="w-full rounded-2xl object-cover h-[300px] sm:h-[380px]"
                onLoad={(e) => e.target.classList.add("loaded")}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 9: SERVING SOUTHERN CALIFORNIA ─── */}
      <section
        data-testid="auto-serving-section"
        className="relative overflow-hidden"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${IMG.highway})` }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-black/70" aria-hidden="true" />
        <div className="relative z-10 py-20 md:py-24 lg:py-28 px-4 sm:px-6">
          <div className="max-w-[1000px] mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Serving Drivers Throughout Southern California
            </h2>
            <p className="text-base md:text-lg text-white/90 leading-relaxed max-w-[750px] mx-auto">
              Pinoy General Insurance Services provides auto insurance solutions to drivers throughout Cerritos and surrounding communities:
            </p>

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
              {SERVICE_AREAS.map((area, i) => (
                <div
                  key={i}
                  data-testid={`service-area-${i}`}
                  className="bg-white/10 rounded-xl p-5 backdrop-blur-sm"
                >
                  <h3 className="text-lg font-bold text-[#FDB813]">{area.county}</h3>
                  <p className="mt-2 text-sm text-white/80 leading-relaxed">
                    Including, but not limited to the cities of {area.cities}
                  </p>
                </div>
              ))}
            </div>

            <p className="mt-10 text-base text-white/85 leading-relaxed italic max-w-[800px] mx-auto">
              Local Expertise for Local Drivers – We understand the traffic patterns, road conditions, and driving risks in our area. From the congested 91 and 605 interchange to the busy surface streets around the Cerritos Towne Center, we know the roads you drive and the coverage you need.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <ContactSection />
    </div>
  );
}
