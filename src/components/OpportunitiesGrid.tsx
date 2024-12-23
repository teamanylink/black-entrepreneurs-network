import { OpportunityCard } from "@/components/OpportunityCard";
import { Skeleton } from "@/components/ui/skeleton";

interface OpportunitiesGridProps {
  opportunities: any[];
  onApply: (id: string) => void;
  isLoading: boolean;
}

export function OpportunitiesGrid({ opportunities, onApply, isLoading }: OpportunitiesGridProps) {
  if (isLoading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="space-y-4">
            <Skeleton className="h-[200px] w-full rounded-lg" />
          </div>
        ))}
      </div>
    );
  }

  if (opportunities.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No opportunities found
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {opportunities.map((opportunity) => (
        <OpportunityCard
          key={opportunity.id}
          opportunity={opportunity}
          onApply={onApply}
        />
      ))}
    </div>
  );
}