import { Briefcase, MapPin, Calendar } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link, useNavigate } from "react-router-dom";

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

  const getTypeColor = (type: string) => {
    switch (type) {
      case "job":
        return "bg-blue-500";
      case "joint_venture":
        return "bg-purple-500";
      case "internship":
        return "bg-green-500";
      case "workshop":
        return "bg-orange-500";
      default:
        return "bg-gray-500";
    }
  };

  const handleCardClick = () => {
    navigate(`/opportunities/${opportunity.id}`);
  };

  return (
    <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={handleCardClick}>
      <CardHeader>
        <div className="flex justify-between items-start mb-2">
          <Badge className={getTypeColor(opportunity.type)}>
            {opportunity.type.replace("_", " ")}
          </Badge>
          <span className="text-sm text-muted-foreground">
            {formatDate(opportunity.created_at)}
          </span>
        </div>
        <CardTitle className="line-clamp-2">{opportunity.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Briefcase className="h-4 w-4" />
            <span>{opportunity.company}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span>{opportunity.location}</span>
          </div>
          {opportunity.salary_range && (
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{opportunity.salary_range}</span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          onClick={(e) => {
            e.stopPropagation();
            onApply(opportunity.id);
          }}
        >
          Apply Now
        </Button>
      </CardFooter>
    </Card>
  );
}