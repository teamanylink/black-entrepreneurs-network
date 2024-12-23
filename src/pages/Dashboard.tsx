import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { DashboardStats } from "@/components/DashboardStats";
import { DashboardSearch } from "@/components/DashboardSearch";
import { DashboardActions } from "@/components/DashboardActions";
import { DashboardActivity } from "@/components/DashboardActivity";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { AuthDialog } from "@/components/AuthDialog";

const Dashboard = () => {
  const { session } = useAuth();
  const location = useLocation();
  const isMainDashboard = location.pathname === "/dashboard";
  const [showAuthDialog, setShowAuthDialog] = useState(false);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <DashboardSidebar />
        <main className="flex-1 p-6">
          {!session ? (
            <div className="max-w-2xl mx-auto text-center space-y-6 py-12">
              <h2 className="text-3xl font-bold">Welcome to B.E.N. Dashboard</h2>
              <p className="text-muted-foreground">
                Join our network to access exclusive features, connect with other entrepreneurs,
                and discover amazing opportunities.
              </p>
              <Button 
                size="lg"
                onClick={() => setShowAuthDialog(true)}
                className="bg-primary hover:bg-primary/90"
              >
                Join Network
              </Button>
              <AuthDialog 
                open={showAuthDialog}
                onOpenChange={setShowAuthDialog}
                opportunityId={null}
              />
            </div>
          ) : isMainDashboard ? (
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