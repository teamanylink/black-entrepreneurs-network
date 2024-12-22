import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { NewsSection } from "@/components/NewsSection";
import { ResourcesSection } from "@/components/ResourcesSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <NewsSection />
      <ResourcesSection />
    </div>
  );
};

export default Index;