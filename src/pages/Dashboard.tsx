import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, MessageSquare, Briefcase } from "lucide-react";

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
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold">Welcome back{session?.user?.user_metadata?.first_name ? `, ${session.user.user_metadata.first_name}` : ''}</h1>
                <p className="text-muted-foreground mt-2">Here's what's happening in your network</p>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Opportunities
                    </CardTitle>
                    <Briefcase className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">25</div>
                    <p className="text-xs text-muted-foreground">
                      +2 from last week
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Community Members
                    </CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">120</div>
                    <p className="text-xs text-muted-foreground">
                      +8 new this month
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Active Discussions
                    </CardTitle>
                    <MessageSquare className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">12</div>
                    <p className="text-xs text-muted-foreground">
                      3 new messages
                    </p>
                  </CardContent>
                </Card>
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