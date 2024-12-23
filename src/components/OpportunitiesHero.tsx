import { Search, MapPin, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface OpportunitiesHeroProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export function OpportunitiesHero({ searchTerm, onSearchChange }: OpportunitiesHeroProps) {
  return (
    <div className="bg-background py-8 border-b">
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-8">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold">Find Opportunities</h1>
            <Button variant="outline" size="sm">
              Post New
            </Button>
          </div>
          
          <div className="flex gap-4 items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search opportunities..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-10 bg-background"
              />
            </div>
            <div className="relative w-48">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Location"
                className="pl-10 bg-background"
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex flex-wrap gap-3">
            {['All Jobs', 'Remote', 'Full-time', 'Part-time', 'Contract', 'Internship'].map((category) => (
              <Button
                key={category}
                variant="outline"
                size="sm"
                className="rounded-full bg-background hover:bg-accent"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}