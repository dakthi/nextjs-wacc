import { Container } from "@/components/Container";
import { TextOnlyHero } from "@/components/TextOnlyHero";
import { SectionTitle } from "@/components/SectionTitle";
import { Benefits } from "@/components/Benefits";
import BookingForm from "@/components/BookingForm";

export const metadata = {
  title: "Facilities & Room Hire | West Acton Community Centre",
  description: "Book our Main Hall (120 capacity) or Small Hall (15 capacity) for your events, classes, and gatherings. Competitive rates and modern facilities.",
};

// Facilities data
const mainHallData = {
  title: "Main Hall with Outside Area - Perfect for Large Events",
  desc: "Our spacious Main Hall includes access to paved outside area and kitchen facilities. Ideal for parties, weddings, funerals, wakes, NHS courses, and community events.",
  image: "/img/main-hall-1.jpeg",
  bullets: [
    {
      title: "9.81m × 12.64m Space + Outside Paved Area",
      desc: "Generous indoor space with additional outdoor paved area for extended events",
      icon: "📏",
    },
    {
      title: "120 Person Capacity",
      desc: "Accommodates large groups for community events, celebrations, and professional courses",
      icon: "👥",
    },
    {
      title: "Includes Kitchen Access",
      desc: "Full kitchen facilities with fridge, kettle, microwave, and sink. No cooking allowed - outside catering welcome",
      icon: "🍽️",
    },
    {
      title: "Tables & Chairs Included",
      desc: "10 large rectangular tables and 80 chairs included in hire price",
      icon: "🪑",
    },
    {
      title: "On Request Pricing",
      desc: "Competitive rates varying by event type. Preferential rates for charities and regular bookings",
      icon: "💷",
    },
  ],
};

const smallHallData = {
  title: "Small Hall - Intimate Group Setting",
  desc: "Our cozy Small Hall provides the perfect environment for small group classes, meetings, and intimate gatherings.",
  image: "/img/small-hall.jpeg",
  bullets: [
    {
      title: "4.26m × 6.20m Space",
      desc: "Comfortable size perfect for focused group activities and small meetings",
      icon: "📐",
    },
    {
      title: "15 Person Capacity",
      desc: "Ideal for workshops, small classes, and community group meetings",
      icon: "👤",
    },
    {
      title: "£20 per Hour",
      desc: "Affordable rate for small group bookings and regular class sessions",
      icon: "💶",
    },
  ],
};

// Booking information
const bookingInfo = [
  {
    title: "Online Booking",
    desc: "Use our website contact form to submit your booking request with preferred dates and requirements",
    icon: "💻",
  },
  {
    title: "Email Bookings", 
    desc: "Contact us directly at info@westactoncentre.co.uk for availability and booking confirmation",
    icon: "📧",
  },
  {
    title: "Phone Enquiries",
    desc: "Call us on 020 8992 8899 during office hours for immediate assistance",
    icon: "📞",
  },
];

// Additional facilities
const additionalFacilities = [
  {
    title: "Kitchen Facilities",
    description: "Equipped kitchen with sink, power outlets for kettle, and small seating area for refreshments",
  },
  {
    title: "Onsite Parking",
    description: "Convenient parking available for event attendees and regular users",
  },
  {
    title: "Accessibility",
    description: "Ground floor access with facilities suitable for all community members",
  },
  {
    title: "Children's Parties",
    description: "Perfect venue for birthday parties (under 12s only) with safe, supervised environment",
  },
];

export default function Facilities() {
  return (
    <div>
      <TextOnlyHero 
        title="Facilities & Room Hire"
        subtitle="Modern, versatile spaces in the heart of West Acton"
      />
      
      <Benefits data={mainHallData} />
      <Benefits imgPos="right" data={smallHallData} />

      <Container>
        <SectionTitle
          preTitle="Book Your Space"
          title="Easy Booking Process"
        >
          Ready to book one of our halls? Choose from multiple convenient booking methods 
          to secure your preferred date and time.
        </SectionTitle>

        <div className="grid gap-10 lg:grid-cols-3 xl:grid-cols-3 mt-16">
          {bookingInfo.map((item, index) => (
            <div key={index} className="lg:col-span-1">
              <div className="flex flex-col justify-between w-full h-full px-6 py-6 bg-gray-100 dark:bg-gray-800 rounded-2xl">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold leading-snug tracking-tight text-gray-800 dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-lg leading-normal text-gray-500 dark:text-gray-300">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>

      <Container>
        <SectionTitle
          preTitle="Additional Amenities"
          title="Everything You Need"
        >
          Our facilities include additional amenities to ensure your event runs smoothly 
          and all attendees feel welcome.
        </SectionTitle>

        <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-2 mt-16">
          {additionalFacilities.map((facility, index) => (
            <div key={index} className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                {facility.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {facility.description}
              </p>
            </div>
          ))}
        </div>

        {/* Booking Form */}
        <div className="mt-16">
          <div className="bg-primary-50 rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-heading font-bold text-primary-600 mb-6 text-center uppercase tracking-tight">
              Book Your Event
            </h3>
            <p className="text-gray-700 mb-8 text-center">
              Complete the form below and we'll get back to you with availability and pricing
            </p>
            
            <BookingForm />
          </div>
        </div>
      </Container>
    </div>
  );
}