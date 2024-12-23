import { Search, MapPin, Filter, Building2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface OpportunitiesHeroProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedType?: string | null;
}

export function OpportunitiesHero({ searchTerm, onSearchChange, selectedType }: OpportunitiesHeroProps) {
  const categories = [
    { id: "explore", label: "Explore", icon: "🌟" },
    { id: "mentorship", label: "Mentorship", icon: "👥" },
    { id: "discovery", label: "Discovery", icon: "🔍" },
    { id: "educate", label: "Educate", icon: "📚" },
    { id: "cowork", label: "Cowork", icon: "💼" },
    { id: "reach", label: "Reach", icon: "🎯" },
    { id: "action", label: "Action", icon: "⚡" },
    { id: "startup", label: "Startup", icon: "🚀" },
  ];

  const trendingSearches = [
    { id: 1, title: "Software Engineer", company: "TechCo", location: "Remote" },
    { id: 2, title: "Product Manager", company: "StartupX", location: "New York" },
    { id: 3, title: "UX Designer", company: "DesignLab", location: "San Francisco" },
  ];

  return (
    <div className="bg-background">
      <div className="mx-auto px-4 py-8">
        <div className="flex flex-col gap-8">
          {/* Search Section */}
          <div className="bg-white rounded-xl shadow-sm p-4">
            <div className="flex gap-4 items-center">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search for jobs, opportunities..."
                  value={searchTerm}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="pl-10 bg-background border-0 focus-visible:ring-0"
                />
              </div>
              <div className="relative w-48">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Location"
                  className="pl-10 bg-background border-0 focus-visible:ring-0"
                />
              </div>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Search
              </Button>
            </div>

            {/* Trending Searches */}
            <div className="mt-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                <Building2 className="h-4 w-4" />
                <span>Trending Searches</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {trendingSearches.map((search) => (
                  <Badge
                    key={search.id}
                    variant="outline"
                    className="cursor-pointer hover:bg-secondary/10"
                  >
                    {search.title} • {search.company}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Categories - Only show when news is selected */}
          {selectedType === "news" && (
            <div>
              <h2 className="text-lg font-semibold mb-6">Categories</h2>
              <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant="outline"
                    className="flex flex-col items-center justify-center h-24 hover:bg-secondary/5 border-none shadow-sm"
                  >
                    <span className="text-2xl mb-2">{category.icon}</span>
                    <span className="text-sm">{category.label}</span>
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}