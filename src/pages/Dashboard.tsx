import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, MessageSquare, Briefcase, ArrowUpRight, Bell } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const Dashboard = () => {
  const { session } = useAuth();
  const location = useLocation();
  const isMainDashboard = location.pathname === "/dashboard";

  const { data: opportunitiesCount, isLoading: loadingOpportunities } = useQuery({
    queryKey: ['opportunities-count'],
    queryFn: async () => {
      const { count, error } = await supabase
        .from('opportunities')
        .select('*', { count: 'exact', head: true });
      
      if (error) throw error;
      return count || 0;
    }
  });

  const { data: profilesCount, isLoading: loadingProfiles } = useQuery({
    queryKey: ['profiles-count'],
    queryFn: async () => {
      const { count, error } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });
      
      if (error) throw error;
      return count || 0;
    }
  });

  const { data: applicationsCount, isLoading: loadingApplications } = useQuery({
    queryKey: ['applications-count'],
    queryFn: async () => {
      const { count, error } = await supabase
        .from('applications')
        .select('*', { count: 'exact', head: true });
      
      if (error) throw error;
      return count || 0;
    }
  });

  const recentActivities = [
    { id: 1, type: 'new_member', message: 'Sarah Johnson joined the network', time: '2 hours ago' },
    { id: 2, type: 'new_opportunity', message: 'New opportunity posted: Senior Developer at TechCorp', time: '3 hours ago' },
    { id: 3, type: 'application', message: 'Marcus applied for Business Development role', time: '5 hours ago' },
  ];

  const quickActions = [
    { title: 'Browse Opportunities', icon: Briefcase, link: '/opportunities' },
    { title: 'View Community', icon: Users, link: '/dashboard/community' },
    { title: 'Start Chat', icon: MessageSquare, link: '/dashboard/chat' },
  ];

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

              <div className="grid gap-6 md:grid-cols-3">
                <Card className="bg-gradient-to-br from-primary/5 to-primary/10">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Opportunities
                    </CardTitle>
                    <Briefcase className="h-4 w-4 text-primary" />
                  </CardHeader>
                  <CardContent>
                    {loadingOpportunities ? (
                      <Skeleton className="h-8 w-16" />
                    ) : (
                      <>
                        <div className="text-2xl font-bold">{opportunitiesCount}</div>
                        <p className="text-xs text-muted-foreground">
                          Open positions and collaborations
                        </p>
                      </>
                    )}
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-secondary/5 to-secondary/10">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Community Members
                    </CardTitle>
                    <Users className="h-4 w-4 text-secondary" />
                  </CardHeader>
                  <CardContent>
                    {loadingProfiles ? (
                      <Skeleton className="h-8 w-16" />
                    ) : (
                      <>
                        <div className="text-2xl font-bold">{profilesCount}</div>
                        <p className="text-xs text-muted-foreground">
                          Active entrepreneurs and professionals
                        </p>
                      </>
                    )}
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-accent/5 to-accent/10">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Applications
                    </CardTitle>
                    <MessageSquare className="h-4 w-4 text-accent" />
                  </CardHeader>
                  <CardContent>
                    {loadingApplications ? (
                      <Skeleton className="h-8 w-16" />
                    ) : (
                      <>
                        <div className="text-2xl font-bold">{applicationsCount}</div>
                        <p className="text-xs text-muted-foreground">
                          Total opportunity applications
                        </p>
                      </>
                    )}
                  </CardContent>
                </Card>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-3">
                      {quickActions.map((action) => (
                        <Button
                          key={action.title}
                          variant="outline"
                          className="flex flex-col items-center justify-center gap-2 h-24 hover:bg-muted/50"
                          asChild
                        >
                          <a href={action.link}>
                            <action.icon className="h-6 w-6" />
                            <span className="text-sm text-center">{action.title}</span>
                          </a>
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-lg">Recent Activity</CardTitle>
                    <Bell className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentActivities.map((activity) => (
                        <div
                          key={activity.id}
                          className="flex items-center justify-between border-b border-border pb-4 last:border-0 last:pb-0"
                        >
                          <div>
                            <p className="text-sm">{activity.message}</p>
                            <p className="text-xs text-muted-foreground">{activity.time}</p>
                          </div>
                          <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                        </div>
                      ))}
                    </div>
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