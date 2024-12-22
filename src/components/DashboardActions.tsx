import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, MessageSquare, Briefcase } from "lucide-react";

export function DashboardActions() {
  const quickActions = [
    { title: 'Browse Opportunities', icon: Briefcase, link: '/opportunities' },
    { title: 'View Community', icon: Users, link: '/dashboard/community' },
    { title: 'Start Chat', icon: MessageSquare, link: '/dashboard/chat' },
  ];

  return (
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
  );
}