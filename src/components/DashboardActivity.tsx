import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, ArrowUpRight } from "lucide-react";

export function DashboardActivity() {
  const recentActivities = [
    { id: 1, type: 'new_member', message: 'Sarah Johnson joined the network', time: '2 hours ago' },
    { id: 2, type: 'new_opportunity', message: 'New opportunity posted: Senior Developer at TechCorp', time: '3 hours ago' },
    { id: 3, type: 'application', message: 'Marcus applied for Business Development role', time: '5 hours ago' },
  ];

  return (
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
  );
}