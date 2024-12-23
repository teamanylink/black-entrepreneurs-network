import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { DashboardStats } from "@/components/DashboardStats";
import { DashboardSearch } from "@/components/DashboardSearch";
import { DashboardActions } from "@/components/DashboardActions";
import { DashboardActivity } from "@/components/DashboardActivity";

const Dashboard = () => {
  const { session } = useAuth();
  const location = useLocation();
  const isMainDashboard = location.pathname === "/dashboard";

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <DashboardSidebar />
        <main className="flex-1 p-6">
          {isMainDashboard ? (
            <div className="space-y-8">
              <div>
                <h1 className="text-3xl font-bold">
                  Welcome back{session?.user?.user_metadata?.first_name ? `, ${session.user.user_metadata.first_name}` : ''}
                </h1>
                <p className="text-muted-foreground mt-2">Here's what's happening in your network</p>
              </div>

              <DashboardStats />
              
              <div className="grid gap-6 md:grid-cols-2">
                <DashboardSearch />
                <div className="space-y-6">
                  <DashboardActions />
                  <DashboardActivity />
                </div>
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