import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface OpportunitiesHeroProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export function OpportunitiesHero({ searchTerm, onSearchChange }: OpportunitiesHeroProps) {
  return (
    <div className="relative h-[400px] bg-primary">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url("/lovable-uploads/69b4951b-76c0-4a2a-af3d-fc03cdcf9f01.png")',
          opacity: 0.6
        }}
      />
      <div className="absolute inset-0 bg-primary/40" />
      <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-white">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">
          Find Your Perfect Opportunity
        </h1>
        <p className="text-xl mb-8 text-center max-w-2xl">
          Discover jobs, partnerships, and growth opportunities in our community
        </p>
        
        {/* Search Bar */}
        <div className="w-full max-w-3xl bg-white/10 backdrop-blur-md rounded-lg shadow-lg p-3 border border-white/20">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70 h-4 w-4" />
              <Input
                placeholder="Search opportunities..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-10 bg-transparent border-white/20 text-white placeholder:text-white/70"
              />
            </div>
            <Button variant="outline" size="icon" className="shrink-0 border-white/20 text-white hover:bg-white/10">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}