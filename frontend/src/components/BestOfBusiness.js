import { Star, Users, Clock } from "lucide-react";

const AWARD_IMG =
  "https://customer-assets.emergentagent.com/job_jovial-wright-4/artifacts/zdtjhasx_Screenshot%202026-01-13%20170439.png";

export default function BestOfBusiness() {
  return (
    <section
      id="awards"
      data-testid="best-of-business-section"
      className="bg-white py-16 md:py-20 lg:py-24"
      aria-label="Awards and recognition">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column – Text */}
          <div className="animate-fade-in-up">
            <h2
              data-testid="awards-headline"
              className="!font-bold !text-3xl !leading-[1.5] sm:!text-4xl lg:!text-[56px] sm:!leading-[1.5] text-[#1F2937]">

              Voted &ldquo;Best of Business Rate 2025!&rdquo;
            </h2>
            <p
              data-testid="awards-subtitle"
              className="!font-semibold !text-xl !leading-[1.95rem] sm:!text-2xl lg:!text-[32px] sm:!leading-[1.95rem] mt-4 text-[#1F2937]">

              Trusted Insurance Experts Since 1993
            </p>
          </div>

          {/* Right Column – Award Image + Stats */}
          <div className="animate-fade-in-up delay-200">
            {/* Award Image */}
            <div className="mb-6">
              <img
                src={AWARD_IMG}
                alt="Best of BusinessRate 2025 - Pinoy General Insurance Services - Insurance Broker - Cerritos, California"
                data-testid="badge-best-of-business"
                className="w-full max-w-md mx-auto rounded-2xl shadow-lg"
                loading="lazy"
                onLoad={(e) => e.target.classList.add("loaded")}
              />
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 gap-4">
              <div
                data-testid="stat-clients"
                className="rounded-xl bg-[#2563EB] p-5 sm:p-6 text-center transition-transform hover:scale-[1.02]">

                <Users className="mx-auto mb-2 text-white/80" size={28} />
                <p className="text-white font-bold text-2xl sm:text-3xl">2000+</p>
                <p className="text-white/80 text-sm sm:text-base mt-1">Clients Trusted</p>
              </div>
              <div
                data-testid="stat-years"
                className="rounded-xl bg-[#2563EB] p-5 sm:p-6 text-center transition-transform hover:scale-[1.02]">

                <Clock className="mx-auto mb-2 text-white/80" size={28} />
                <p className="text-white font-bold text-2xl sm:text-3xl">30+</p>
                <p className="text-white/80 text-sm sm:text-base mt-1">Years in Service</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>);

}