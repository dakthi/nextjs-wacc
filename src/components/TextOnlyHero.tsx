import { Container } from "@/components/Container";

interface TextOnlyHeroProps {
  title: string;
  subtitle: string;
}

export const TextOnlyHero = ({ title, subtitle }: TextOnlyHeroProps) => {
  return (
    <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
      <Container className="py-16 lg:py-24">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold lg:text-5xl xl:text-6xl mb-6">
            {title}
          </h1>
          <p className="text-lg lg:text-xl xl:text-2xl text-indigo-100">
            {subtitle}
          </p>
        </div>
      </Container>
    </div>
  );
};
