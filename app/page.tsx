import { FeaturedSetupSection } from "@/components/home/featured-setup-section";
import { HeroSection } from "@/components/home/hero-section";
import { LaunchesSection } from "@/components/home/launches-section";

export default function Home() {
  return (
    <div className="flex flex-col gap-16 pb-16 lg:gap-24">
      <HeroSection />
      <LaunchesSection />
      <FeaturedSetupSection />
    </div>
  );
}
