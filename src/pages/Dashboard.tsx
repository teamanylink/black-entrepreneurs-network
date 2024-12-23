import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, MapPin } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { OpportunityCard } from "@/components/OpportunityCard";
import { Badge } from "@/components/ui/badge";

const categories = [
  { id: "job", label: "Jobs", icon: "💼" },
  { id: "joint_venture", label: "Joint Ventures", icon: "🤝" },
  { id: "internship", label: "Internships", icon: "🎓" },
  { id: "workshop", label: "Workshops", icon: "📚" },
];

const Dashboard = () => {
  const { session } = useAuth();
  const location = useLocation();
  const isMainDashboard = location.pathname === "/dashboard";

  const { data: opportunities, isLoading } = useQuery({
    queryKey: ['featured-opportunities'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('opportunities')
        .select('*')
        .limit(4);
      
      if (error) throw error;
      return data;
    }
  });

  if (!isMainDashboard) {
    return <Outlet />;
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <DashboardSidebar />
        <main className="flex-1 p-6 space-y-8">
          {/* Search Section */}
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input 
                  placeholder="Search for opportunities..." 
                  className="pl-10"
                />
              </div>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input 
                  placeholder="Location" 
                  className="pl-10 w-full md:w-[200px]"
                />
              </div>
              <Button>Search</Button>
            </div>
          </div>

          {/* Categories */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant="outline"
                className="h-24 flex flex-col items-center justify-center gap-2"
              >
                <span className="text-2xl">{category.icon}</span>
                <span>{category.label}</span>
              </Button>
            ))}
          </div>

          {/* Featured Opportunities */}
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Featured Opportunities</h2>
              <Button variant="link">View all</Button>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {isLoading ? (
                Array(4).fill(0).map((_, i) => (
                  <div key={i} className="h-[200px] bg-muted animate-pulse rounded-lg" />
                ))
              ) : opportunities?.map((opportunity) => (
                <OpportunityCard
                  key={opportunity.id}
                  opportunity={opportunity}
                  onApply={() => {}}
                />
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div>
            <h2 className="text-2xl font-semibold mb-6">Recent Activity</h2>
            <div className="space-y-4">
              {Array(3).fill(0).map((_, i) => (
                <div key={i} className="flex items-center gap-4 p-4 bg-card rounded-lg border">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    {i === 0 ? "🤝" : i === 1 ? "💼" : "📚"}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">New {i === 0 ? "Joint Venture" : i === 1 ? "Job" : "Workshop"} Opportunity</p>
                    <p className="text-sm text-muted-foreground">Posted {i + 1} hour{i !== 0 ? 's' : ''} ago</p>
                  </div>
                  <Badge variant="secondary">New</Badge>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;