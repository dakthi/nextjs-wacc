import { Container } from "@/components/Container";

export const Hero = () => {
  return (
    <Container className="flex flex-wrap items-center py-10 lg:py-16">
      {/* Text */}
      <div className="w-full lg:w-1/2 px-4">
        <div className="max-w-xl">
          <h1 className="text-3xl font-bold text-green-950 tracking-tight leading-tight lg:text-4xl xl:text-5xl">
            Welcome to West Acton Community Centre
          </h1>
          <p className="mt-6 text-base text-green-950 leading-relaxed lg:text-lg font-medium">
            Your local hub for education, leisure, and recreational programs. We serve over 2,000 residents 
            in West Acton with 15+ regular programs every week.
          </p>
          <p className="mt-4 text-base text-green-950 leading-relaxed lg:text-lg">
            From Stay & Play sessions for young families to martial arts, fitness classes, and cultural groups — 
            we're here to bring our community together and support wellbeing for all ages.
          </p>

          <div className="mt-6 space-x-4">
            <a
              href="/facilities"
              className="inline-block px-6 py-3 text-sm font-bold text-white bg-primary-950 rounded-lg hover:bg-primary-900 transition uppercase tracking-wide"
            >
              Book a Room
            </a>
            <a
              href="/programs"
              className="inline-block px-6 py-3 text-sm font-bold text-primary-950 bg-white border-2 border-primary-950 rounded-lg hover:bg-primary-950 hover:text-white transition uppercase tracking-wide"
            >
              View Programs
            </a>
          </div>
        </div>
      </div>

      {/* Image */}
      <div className="w-full lg:w-1/2 flex justify-center mt-8 lg:mt-0 px-4">
        <div className="w-full max-w-md bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-8 text-white text-center">
          <div className="text-6xl mb-4">🏢</div>
          <h3 className="text-2xl font-bold mb-4">Community Centre</h3>
          <div className="space-y-2 text-sm">
            <p>📍 Churchill Gardens, W3 0JN</p>
            <p>📞 020 8992 8899</p>
            <p>🕘 Open 7 days a week</p>
            <p>👥 Serving 2,000+ residents</p>
          </div>
        </div>
      </div>
    </Container>
  );
};
