import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

export function DashboardSearch() {
  const [searchTerm, setSearchTerm] = useState("");

  const { data: searchResults, isLoading } = useQuery({
    queryKey: ['dashboard-search', searchTerm],
    queryFn: async () => {
      if (!searchTerm) return { opportunities: [], profiles: [] };

      const [opportunitiesResponse, profilesResponse] = await Promise.all([
        supabase
          .from('opportunities')
          .select('*')
          .ilike('title', `%${searchTerm}%`)
          .limit(5),
        supabase
          .from('profiles')
          .select('*')
          .or(`first_name.ilike.%${searchTerm}%,last_name.ilike.%${searchTerm}%`)
          .limit(5)
      ]);

      return {
        opportunities: opportunitiesResponse.data || [],
        profiles: profilesResponse.data || []
      };
    },
    enabled: searchTerm.length > 0
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Search Dashboard</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search opportunities, community members..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {searchTerm && (
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium mb-3">Opportunities</h3>
              {isLoading ? (
                <div className="space-y-2">
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-12 w-full" />
                </div>
              ) : searchResults?.opportunities && searchResults.opportunities.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Company</TableHead>
                      <TableHead>Location</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {searchResults.opportunities.map((opportunity) => (
                      <TableRow key={opportunity.id}>
                        <TableCell className="font-medium">{opportunity.title}</TableCell>
                        <TableCell>{opportunity.company}</TableCell>
                        <TableCell>{opportunity.location}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <p className="text-sm text-muted-foreground">No opportunities found</p>
              )}
            </div>

            <div>
              <h3 className="text-sm font-medium mb-3">Community Members</h3>
              {isLoading ? (
                <div className="space-y-2">
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-12 w-full" />
                </div>
              ) : searchResults?.profiles && searchResults.profiles.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Business Owner</TableHead>
                      <TableHead>Website</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {searchResults.profiles.map((profile) => (
                      <TableRow key={profile.id}>
                        <TableCell className="font-medium">
                          {profile.first_name} {profile.last_name}
                        </TableCell>
                        <TableCell>{profile.business_owner ? "Yes" : "No"}</TableCell>
                        <TableCell>
                          {profile.website_url ? (
                            <a 
                              href={profile.website_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary hover:underline"
                            >
                              Visit Website
                            </a>
                          ) : (
                            "N/A"
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <p className="text-sm text-muted-foreground">No community members found</p>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}