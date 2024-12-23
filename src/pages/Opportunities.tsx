import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { OpportunitySidebar } from "@/components/OpportunitySidebar";
import { OpportunitiesHero } from "@/components/OpportunitiesHero";
import { OpportunitiesGrid } from "@/components/OpportunitiesGrid";
import { AuthDialog } from "@/components/AuthDialog";
import { Navbar } from "@/components/Navbar";
import { Outlet, useLocation } from "react-router-dom";

export default function Opportunities() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [selectedOpportunityId, setSelectedOpportunityId] = useState<string | null>(null);
  const location = useLocation();
  const isDetailsPage = location.pathname.split("/").length > 2;

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
      <Navbar />
      {isDetailsPage ? (
        <Outlet />
      ) : (
        <div className="flex">
          <aside className="w-64 h-screen bg-muted fixed left-0 top-16 border-r border-border overflow-y-auto">
            <OpportunitySidebar
              selectedType={selectedType}
              onTypeSelect={setSelectedType}
            />
          </aside>
          
          <div className="flex-1 ml-64">
            <div className="fixed top-16 left-64 right-0 bg-background z-10">
              <OpportunitiesHero 
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
              />
            </div>

            <div className="container mx-auto px-4 py-8 mt-[320px]">
              <OpportunitiesGrid
                opportunities={opportunities}
                onApply={handleApply}
                isLoading={isLoading}
              />
            </div>
          </div>
        </div>
      )}

      <AuthDialog
        open={showAuthDialog}
        onOpenChange={setShowAuthDialog}
        opportunityId={selectedOpportunityId}
      />
    </div>
  );
}