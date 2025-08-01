import { Container } from "@/components/Container";
import { TextOnlyHero } from "@/components/TextOnlyHero";
import { SectionTitle } from "@/components/SectionTitle";

export const metadata = {
  title: "Programs & Activities | West Acton Community Centre",
  description: "Join our 15+ weekly programs including Stay & Play, Taekwondo, Zumba, Kumon, Judo, and cultural groups. Something for every age and interest.",
};

// Program data
const programs = [
  {
    id: "stay-play",
    title: "West Acton Stay & Play",
    description: "Drop-in session run by professionals with toys, arts & crafts, painting, cars & tractors, and soft play in our spacious hall.",
    schedule: [
      "Monday: 10:00 AM - 11:45 AM",
      "Wednesday: 10:00 AM - 11:45 AM", 
      "Friday: 10:00 AM - 11:45 AM"
    ],
    cost: "Members £4.00 per session, siblings £1.00",
    booking: "No booking required - just come along!",
    ageGroup: "Young children & parents",
    category: "early-years",
  },
  {
    id: "taekwondo",
    title: "West Acton Taekwondo",
    description: "Traditional martial arts training for children and adults, building discipline, fitness, and confidence.",
    schedule: [
      "Children (Ages 4-13):",
      "Wednesday: 5:00 PM - 7:00 PM",
      "Sunday: 10:00 AM - 11:30 AM",
      "",
      "Adults (Ages 14+):",
      "Friday: 6:30 PM - 8:30 PM",
      "Sunday: 11:30 AM - 2:00 PM (Technical)",
      "Sunday: 1:30 PM - 3:00 PM (Sparring)"
    ],
    ageGroup: "Ages 4+",
    category: "martial-arts",
  },
  {
    id: "kung-fu",
    title: "Fitness Exercise Club - Lau Gar Kung Fu",
    description: "Traditional Shaolin-based martial art with structured training methods focusing on fitness and technique.",
    schedule: ["Tuesday: 7:30 PM - 9:00 PM"],
    contact: {
      email: "b.k.f.f@hotmail.co.uk",
      phone: "07572 718 870"
    },
    ageGroup: "Adults",
    category: "martial-arts",
  },
  {
    id: "kumon",
    title: "Kumon Maths & English (and Kokugo - Japanese)",
    description: "Educational support in English, Maths, and Japanese language with local tutor Teruko Mori.",
    schedule: [
      "Tuesday: 3:00 PM - 6:00 PM",
      "Saturday: 10:00 AM - 1:00 PM"
    ],
    contact: {
      email: "actonwest@kumoncentre.co.uk",
      website: "www.kumon.co.uk/Acton-West"
    },
    ageGroup: "Children & young people",
    category: "education",
    image: "/img/kumon.jpeg",
  },
  {
    id: "judo",
    title: "Ealing Judo Club",
    description: "Promotes fitness, confidence, friendship, and fun through judo training for all skill levels.",
    contact: {
      email: "EalingJudoClub@hotmail.com",
      website: "www.ealingjudoclub.com"
    },
    ageGroup: "All ages",
    category: "martial-arts",
  },
  {
    id: "zumba",
    title: "Zumba with Anae",
    description: "High-energy dance fitness classes combining fun choreography with great music.",
    schedule: [
      "Tuesday: 10:00 AM - 11:00 AM",
      "Tuesday: 6:15 PM - 7:15 PM"
    ],
    booking: "Book at anae-fitness.com",
    ageGroup: "Adults",
    category: "fitness",
  },
];

// Community groups
const communityGroups = [
  {
    title: "The Society of Afghan Residents",
    description: "Cultural community group supporting Afghan families in West Acton"
  },
  {
    title: "Arab Families Community Group", 
    description: "Cultural support and social activities for Arab families in the local area"
  },
];

// Category colors for visual organization
const categoryColors = {
  "early-years": "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200",
  "martial-arts": "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  "education": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  "fitness": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
};

const categoryNames = {
  "early-years": "Early Years",
  "martial-arts": "Martial Arts",
  "education": "Education",
  "fitness": "Fitness",
};

export default function Programs() {
  return (
    <div>
      <TextOnlyHero 
        title="Programs & Activities"
        subtitle="15+ regular programs every week for all ages and interests"
      />

      <Container>
        <SectionTitle
          preTitle="Weekly Programs"
          title="Something for Everyone"
        >
          Our diverse range of programs serves the entire West Acton community, 
          from early years activities to adult fitness and cultural groups.
        </SectionTitle>

        <div className="grid gap-8 lg:gap-12 mt-16">
          {programs.map((program) => (
            <div key={program.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              {program.image && (
                <div className="h-48 bg-gray-100 relative">
                  <img
                    src={program.image}
                    alt={program.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  {program.category && (
                    <div className="absolute top-4 left-4">
                      <span className={`inline-block px-3 py-1 rounded-full text-sm font-bold uppercase tracking-wide ${categoryColors[program.category as keyof typeof categoryColors]}`}>
                        {categoryNames[program.category as keyof typeof categoryNames]}
                      </span>
                    </div>
                  )}
                  <div className="absolute top-4 right-4 bg-white/90 rounded-full px-3 py-1">
                    <span className="text-sm font-semibold text-gray-800">
                      {program.ageGroup}
                    </span>
                  </div>
                </div>
              )}
              
              <div className="p-8">
                <div className="mb-6">
                  <h3 className="text-2xl font-heading font-bold text-primary-600 mb-3 uppercase tracking-tight">
                    {program.title}
                  </h3>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    {program.description}
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  {program.schedule && (
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-primary-600 mb-3 uppercase tracking-wide text-sm">Schedule</h4>
                      <ul className="text-gray-800 space-y-2">
                        {program.schedule.map((time, index) => (
                          <li key={index} className={`${time === "" ? "h-2" : "font-medium"}`}>
                            {time}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="space-y-4">
                    {program.cost && (
                      <div className="bg-accent-50 rounded-lg p-4">
                        <h4 className="font-semibold text-primary-600 mb-2 uppercase tracking-wide text-sm">Cost</h4>
                        <p className="text-gray-800 font-semibold text-lg">{program.cost}</p>
                      </div>
                    )}

                    {program.booking && (
                      <div className="bg-primary-50 rounded-lg p-4">
                        <h4 className="font-semibold text-primary-600 mb-2 uppercase tracking-wide text-sm">Booking</h4>
                        <p className="text-gray-800 font-medium">{program.booking}</p>
                      </div>
                    )}

                    {program.contact && (
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-semibold text-primary-600 mb-3 uppercase tracking-wide text-sm">Contact</h4>
                        <div className="text-gray-800 space-y-2">
                          {program.contact.email && (
                            <p className="flex items-center">
                              <span className="mr-2">📧</span>
                              <span className="font-medium">{program.contact.email}</span>
                            </p>
                          )}
                          {program.contact.phone && (
                            <p className="flex items-center">
                              <span className="mr-2">📞</span>
                              <span className="font-medium">{program.contact.phone}</span>
                            </p>
                          )}
                          {program.contact.website && (
                            <p className="flex items-center">
                              <span className="mr-2">🌐</span>
                              <span className="font-medium">{program.contact.website}</span>
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>

      <Container>
        <SectionTitle
          preTitle="Community Groups"
          title="Cultural & Community Organizations"
        >
          We proudly host several community and cultural groups that serve 
          the diverse residents of West Acton.
        </SectionTitle>

        <div className="grid gap-6 lg:grid-cols-2 mt-16">
          {communityGroups.map((group, index) => (
            <div key={index} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
                {group.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {group.description}
              </p>
            </div>
          ))}
        </div>
      </Container>

      <Container>
        <div className="mt-16 text-center">
          <div className="bg-indigo-100 dark:bg-indigo-900 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
              Want to Start a New Program?
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
              We're always looking to add new programs that serve our community's needs. 
              Contact us to discuss your ideas!
            </p>
            <div className="space-y-2">
              <p className="text-lg font-medium text-gray-800 dark:text-white">
                📧 info@westactoncentre.co.uk
              </p>
              <p className="text-lg font-medium text-gray-800 dark:text-white">
                📞 020 8992 8899
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}