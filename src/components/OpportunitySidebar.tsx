import { Briefcase, Users, GraduationCap, BookOpen, Filter } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";

const opportunityTypes = [
  { id: "job", label: "Jobs", icon: Briefcase },
  { id: "joint_venture", label: "Joint Ventures", icon: Users },
  { id: "internship", label: "Internships", icon: GraduationCap },
  { id: "workshop", label: "Workshops", icon: BookOpen },
];

interface OpportunitySidebarProps {
  selectedType: string | null;
  onTypeSelect: (type: string | null) => void;
}

export function OpportunitySidebar({ selectedType, onTypeSelect }: OpportunitySidebarProps) {
  const isMobile = useIsMobile();

  const SidebarContent = () => (
    <div className="p-4 h-full">
      <h2 className="font-semibold mb-4 text-primary">Opportunity Types</h2>
      <div className="space-y-2">
        {opportunityTypes.map((type) => {
          const Icon = type.icon;
          return (
            <Button
              key={type.id}
              variant={selectedType === type.id ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start gap-2",
                selectedType === type.id && "bg-secondary text-secondary-foreground"
              )}
              onClick={() => onTypeSelect(selectedType === type.id ? null : type.id)}
            >
              <Icon className="h-4 w-4" />
              {type.label}
            </Button>
          );
        })}
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" className="mb-4">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <SidebarContent />
        </SheetContent>
      </Sheet>
    );
  }

  return <SidebarContent />;
}