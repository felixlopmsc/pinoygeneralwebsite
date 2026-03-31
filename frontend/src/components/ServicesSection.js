const HANDSHAKE_IMG =
  "https://images.unsplash.com/photo-1758518730384-be3d205838e8?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjY2NzZ8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGhhbmRzaGFrZSUyMG1lZXRpbmclMjBwcm9mZXNzaW9uYWx8ZW58MHx8fHwxNzc0OTg3NjUyfDA&ixlib=rb-4.1.0&q=85";

const SERVICES = [
  {
    title: "Home Insurance",
    description:
      "Keep your home and belongings safe with policies that offer peace of mind.",
    image:
      "https://images.pexels.com/photos/7642218/pexels-photo-7642218.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    alt: "House at sunset",
  },
  {
    title: "Auto Insurance",
    description:
      "Protect your vehicle with coverage designed for your driving needs and budget.",
    image:
      "https://images.pexels.com/photos/32272417/pexels-photo-32272417.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    alt: "Person holding car keys",
  },
  {
    title: "Renter's Insurance",
    description:
      "Secure your rented space with the right renter's insurance tailored to your specific needs.",
    image:
      "https://images.pexels.com/photos/279719/pexels-photo-279719.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    alt: "Apartment complex with pool",
  },
  {
    title: "Commercial Insurance",
    description:
      "Secure your business with the right commercial insurance tailored to your specific needs.",
    image:
      "https://images.pexels.com/photos/36729739/pexels-photo-36729739.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    alt: "Modern commercial building at night",
  },
];

function ServiceCard({ title, description, image, alt, index }) {
  return (
    <div
      data-testid={`service-card-${title.toLowerCase().replace(/['\s]+/g, "-")}`}
      className="group overflow-hidden rounded-2xl bg-[#DBEAFE] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl animate-fade-in-up"
      style={{ animationDelay: `${index * 120}ms` }}
    >
      <div className="overflow-hidden rounded-t-2xl h-60">
        <img
          src={image}
          alt={alt}
          loading="lazy"
          className="w-full h-full object-cover service-card-img"
          onLoad={(e) => e.target.classList.add("loaded")}
        />
      </div>
      <div className="p-6 sm:p-8">
        <h3 className="text-xl sm:text-2xl font-semibold text-[#1F2937]">
          {title}
        </h3>
        <p className="mt-3 text-[#6B7280] text-base leading-relaxed">
          {description}
        </p>
        <a
          href="#contact"
          data-testid={`service-get-quote-${title.toLowerCase().replace(/['\s]+/g, "-")}`}
          className="inline-flex items-center justify-center mt-6 rounded-full bg-black px-7 py-3 text-[15px] font-semibold text-white transition-all hover:bg-gray-800 hover:scale-[1.02] active:scale-[0.98]"
        >
          Get a Quote
        </a>
      </div>
    </div>
  );
}

export default function ServicesSection() {
  return (
    <section
      id="services"
      data-testid="services-section"
      className="bg-white py-16 md:py-20 lg:py-24"
      aria-label="Our services"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Image */}
        <div className="overflow-hidden rounded-2xl max-h-[400px] mb-12 animate-fade-in">
          <img
            src={HANDSHAKE_IMG}
            alt="Professional business handshake"
            loading="lazy"
            className="w-full h-full object-cover"
            onLoad={(e) => e.target.classList.add("loaded")}
          />
        </div>

        {/* Section Title */}
        <div className="text-center mb-12 lg:mb-16">
          <h2
            data-testid="services-headline"
            className="text-3xl md:text-4xl font-bold text-[#1F2937]"
          >
            Our Services
          </h2>
          <p className="mt-4 text-base md:text-lg text-[#6B7280] max-w-[700px] mx-auto leading-relaxed">
            Reliable insurance options designed for families and businesses in
            Southern California.
          </p>
        </div>

        {/* Service Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.title} {...service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
