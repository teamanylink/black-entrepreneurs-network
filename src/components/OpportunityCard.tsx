import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";

interface OpportunityCardProps {
  opportunity: {
    id: string;
    title: string;
    company: string;
    location: string;
    type: string;
    salary_range?: string;
    created_at: string;
  };
  onApply: (id: string) => void;
}

export function OpportunityCard({ opportunity, onApply }: OpportunityCardProps) {
  const navigate = useNavigate();

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const handleCardClick = () => {
    navigate(`/opportunities/${opportunity.id}`);
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-200 cursor-pointer" onClick={handleCardClick}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex gap-3 items-center">
            <Avatar className="h-10 w-10 bg-primary/10">
              <span className="font-semibold text-primary">
                {opportunity.company.charAt(0)}
              </span>
            </Avatar>
            <div>
              <h3 className="font-semibold group-hover:text-primary transition-colors">
                {opportunity.title}
              </h3>
              <p className="text-sm text-muted-foreground">{opportunity.company}</p>
            </div>
          </div>
          <Badge variant="secondary" className="bg-secondary/10 text-secondary-foreground">
            {opportunity.type.replace("_", " ")}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <span>{opportunity.location}</span>
          </div>
          {opportunity.salary_range && (
            <div className="flex items-center gap-2">
              <span>{opportunity.salary_range}</span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="pt-0 flex justify-between items-center">
        <span className="text-xs text-muted-foreground">
          Posted {formatDate(opportunity.created_at)}
        </span>
        <Button
          size="sm"
          variant="outline"
          onClick={(e) => {
            e.stopPropagation();
            onApply(opportunity.id);
          }}
          className="opacity-0 group-hover:opacity-100 transition-opacity"
        >
          Quick Apply
        </Button>
      </CardFooter>
    </Card>
  );
}