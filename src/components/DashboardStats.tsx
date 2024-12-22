import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, MessageSquare, Briefcase } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

export function DashboardStats() {
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

  return (
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
  );
}