import { Search, Briefcase, Users2, GraduationCap, BookOpen } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const items = [
  {
    title: "All Opportunities",
    icon: Search,
    url: "#",
  },
  {
    title: "Jobs",
    icon: Briefcase,
    url: "#jobs",
  },
  {
    title: "Joint Ventures",
    icon: Users2,
    url: "#ventures",
  },
  {
    title: "Internships",
    icon: GraduationCap,
    url: "#internships",
  },
  {
    title: "Workshops",
    icon: BookOpen,
    url: "#workshops",
  },
];

export function OpportunitiesSidebar() {
  return (
    <Sidebar variant="inset" collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Browse</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}