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
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <OpportunitySidebar
            selectedType={selectedType}
            onTypeSelect={setSelectedType}
          />

          {/* Main content */}
          <div className="flex-1">
            {/* Search bar */}
            <div className="flex gap-2 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search opportunities..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>

            {/* Opportunities grid */}
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