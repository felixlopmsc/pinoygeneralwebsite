import { Trophy, Star, Users, Clock } from "lucide-react";

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

          {/* Right Column – Badges + Stats */}
          <div className="animate-fade-in-up delay-200">
            {/* Badge Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {/* Best of Business Badge */}
              <div
                data-testid="badge-best-of-business"
                className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#F4C430] to-[#E5A700] p-6 text-center">

                <Trophy className="mx-auto mb-3 text-[#1F2937]" size={40} strokeWidth={1.5} />
                <p className="text-[#1F2937] font-bold text-lg leading-tight">
                  Best of Business<br />Rate 2025
                </p>
                <div className="flex justify-center gap-1 mt-3">
                  {[...Array(5)].map((_, i) =>
                  <Star key={i} size={16} className="fill-[#1F2937] text-[#1F2937]" />
                  )}
                </div>
              </div>

              {/* Google Reviews Badge */}
              <div
                data-testid="badge-google-reviews"
                className="relative overflow-hidden rounded-2xl bg-gray-50 border border-gray-200 p-6 text-center">

                <div className="flex justify-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) =>
                  <Star key={i} size={18} className="fill-[#F4C430] text-[#F4C430]" />
                  )}
                </div>
                <p className="text-[#1F2937] font-bold text-lg leading-tight">
                  5-Star Rated
                </p>
                <p className="text-[#6B7280] text-sm mt-1">
                  Cerritos, CA &mdash; Google Reviews
                </p>
              </div>
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