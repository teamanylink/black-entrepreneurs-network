import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search, Filter } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { OpportunitySidebar } from "@/components/OpportunitySidebar";
import { OpportunityCard } from "@/components/OpportunityCard";
import { AuthDialog } from "@/components/AuthDialog";

export default function Opportunities() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [selectedOpportunityId, setSelectedOpportunityId] = useState<string | null>(null);

  const { data: opportunities = [], isLoading } = useQuery({
    queryKey: ["opportunities", searchTerm, selectedType],
    queryFn: async () => {
      let query = supabase
        .from("opportunities")
        .select("*");

      if (searchTerm) {
        query = query.or(`title.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`);
      }

      if (selectedType) {
        query = query.eq("type", selectedType);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
  });

  const handleApply = (opportunityId: string) => {
    setSelectedOpportunityId(opportunityId);
    setShowAuthDialog(true);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative h-[400px] bg-primary">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url("/lovable-uploads/301e3ec9-b8c2-41ae-9abd-b8b018af012b.png")',
            opacity: 0.3
          }}
        />
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">
            Find Your Perfect Opportunity
          </h1>
          <p className="text-xl mb-8 text-center max-w-2xl">
            Discover jobs, partnerships, and growth opportunities in our community
          </p>
          
          {/* Search Bar */}
          <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-2">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search opportunities..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline" size="icon" className="shrink-0">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <OpportunitySidebar
            selectedType={selectedType}
            onTypeSelect={setSelectedType}
          />

          {/* Opportunities Grid */}
          <div className="flex-1">
            {isLoading ? (
              <div className="text-center py-8">Loading opportunities...</div>
            ) : opportunities.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No opportunities found
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {opportunities.map((opportunity) => (
                  <OpportunityCard
                    key={opportunity.id}
                    opportunity={opportunity}
                    onApply={handleApply}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <AuthDialog
        open={showAuthDialog}
        onOpenChange={setShowAuthDialog}
        opportunityId={selectedOpportunityId}
      />
    </div>
  );
}