import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { DashboardSearch } from "@/components/DashboardSearch";
import { DashboardActions } from "@/components/DashboardActions";
import { DashboardActivity } from "@/components/DashboardActivity";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";

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

const Dashboard = () => {
  const { session } = useAuth();
  const location = useLocation();
  const isMainDashboard = location.pathname === "/dashboard";

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <DashboardSidebar />
        <main className="flex-1 p-6">
          {isMainDashboard ? (
            <div className="space-y-8 max-w-7xl mx-auto">
              {/* Search Section */}
              <div className="flex gap-4 items-center">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    placeholder="Search for jobs, joint ventures, opportunities..."
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                <Button variant="outline" className="gap-2">
                  <MapPin className="h-4 w-4" />
                  Location
                </Button>
              </div>

              {/* Categories */}
              <div>
                <h2 className="text-lg font-semibold mb-4">Categories</h2>
                <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
                  {categories.map((category) => (
                    <Button
                      key={category.id}
                      variant="outline"
                      className="flex flex-col items-center justify-center h-24 hover:bg-primary/5"
                    >
                      <span className="text-2xl mb-2">{category.icon}</span>
                      <span className="text-sm">{category.label}</span>
                    </Button>
                  ))}
                </div>
              </div>

              {/* Featured Jobs */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold">Featured Jobs</h2>
                  <Button variant="link">See all</Button>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <DashboardActions />
                </div>
              </div>

              {/* Recent Activity */}
              <div>
                <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
                <DashboardActivity />
              </div>
            </div>
          ) : (
            <Outlet />
          )}
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;