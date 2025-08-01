import { Container } from "@/components/Container";
import { SectionTitle } from "@/components/SectionTitle";
import { Benefits } from "@/components/Benefits";
import { Testimonials } from "@/components/Testimonials";
import { Faq } from "@/components/Faq";
import { VideoSelfHosted } from "@/components/VideoSelfHosted";
import { WeeklyHighlights } from "@/components/WeeklyHighlights";

// Mid page highlights - this week's programs
const thisWeekHighlights = [
  {
    id: "stay-play",
    title: "STAY & PLAY SESSIONS",
    subtitle: "Monday, Wednesday & Friday • 10:00 AM - 11:45 AM",
    description: "Drop-in sessions for young children with toys, arts & crafts, and soft play",
    image: "/img/stayandplay.jpeg",
    buttonText: "JOIN US",
    buttonLink: "/programs",
    price: "£4 per session",
  },
  {
    id: "zumba",
    title: "ZUMBA FITNESS CLASSES",
    subtitle: "Tuesday • 10:00 AM & 6:15 PM",
    description: "High-energy dance fitness classes combining fun choreography with great music",
    image: "/img/zumba.jpeg",
    buttonText: "LEARN MORE",
    buttonLink: "/programs",
    ages: "Adults",
  },
  {
    id: "room-hire",
    title: "ROOM HIRE AVAILABLE",
    subtitle: "Main Hall (120 capacity) • Small Hall (15 capacity)",
    description: "Modern facilities perfect for events, parties, meetings, and community gatherings",
    image: "/img/main-hall-1.jpeg",
    buttonText: "BOOK NOW",
    buttonLink: "/facilities",
    price: "From £20/hour",
  },
];

// Community stats data
const communityStats = [
  {
    title: "2,000+",
    desc: "Residents served in West Acton community",
  },
  {
    title: "15+",
    desc: "Regular groups and programs per week",
  },
  {
    title: "120",
    desc: "Maximum capacity in our Main Hall",
  },
  {
    title: "7 days",
    desc: "Open Monday to Sunday, 9am-10pm",
  },
];

// Benefits data for WACC
const benefitOne = {
  title: "Modern Facilities for Every Occasion",
  desc: "Our centre offers versatile spaces perfect for community events, fitness classes, children's parties, and group meetings.",
  image: "/img/main-hall.jpeg",
  bullets: [
    {
      title: "Main Hall (120 capacity)",
      desc: "9.81m × 12.64m space perfect for large events, exercise classes, and community gatherings",
      icon: "■",
    },
    {
      title: "Small Hall (15 capacity)", 
      desc: "4.26m × 6.20m intimate space ideal for small group classes and meetings",
      icon: "▪",
    },
    {
      title: "Kitchen Facilities",
      desc: "Equipped with sink, power outlets, and seating area for catering needs",
      icon: "●",
    },
  ],
};

const benefitTwo = {
  title: "Convenient Location & Access",
  desc: "Located in Churchill Gardens, West Acton, we're easily accessible by public transport and offer onsite parking.",
  image: "/img/location.jpeg",
  bullets: [
    {
      title: "West Acton Station",
      desc: "Just minutes from West Acton Underground station on the Central line",
      icon: "●",
    },
    {
      title: "Bus Routes",
      desc: "Served by buses 207, 218, and H40 for easy access from across London",
      icon: "●",
    },
    {
      title: "Onsite Parking",
      desc: "Convenient parking available for visitors and event attendees",
      icon: "●",
    },
  ],
};

// FAQ data for WACC
const faqData = [
  {
    question: "How do I book a room at WACC?",
    answer: "You can book rooms through our website contact form or email us at info@westactoncentre.co.uk. Our Main Hall is £50/hour and Small Hall is £20/hour.",
  },
  {
    question: "What are your opening hours?",
    answer: "The centre is open Monday to Sunday from 9:00 AM to 10:00 PM. Our office hours are Monday 9:30-11:00 AM and Wednesday-Friday 10:00 AM-2:30 PM.",
  },
  {
    question: "Do I need to book for Stay & Play sessions?",
    answer: "No booking required! Just come along on Monday, Wednesday, or Friday from 10:00-11:45 AM. Sessions cost £4 for members, £1 for siblings.",
  },
  {
    question: "Is parking available?",
    answer: "Yes, we have onsite parking available for visitors and event attendees.",
  },
];

export default function Home() {
  return (
    <div>
      <VideoSelfHosted />
      <WeeklyHighlights highlights={thisWeekHighlights} />
      
      <Container>
        <SectionTitle
          preTitle="Community Impact"
          title="Serving West Acton Together"
        >
          West Acton Community Centre is dedicated to improving wellbeing through education, 
          leisure, and recreational programs. We work closely with local businesses and residents 
          to create a vibrant, supportive community.
        </SectionTitle>

        <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-4 mt-16">
          {communityStats.map((item, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 text-center shadow-sm">
              <p className="text-3xl font-heading font-bold text-primary-600 mb-2">
                {item.title}
              </p>
              <p className="text-gray-800 font-medium">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </Container>

      <Benefits data={benefitOne} />
      <Benefits imgPos="right" data={benefitTwo} />
      <Testimonials />
      <Faq />
    </div>
  );
}
