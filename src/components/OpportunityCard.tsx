import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";

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

  const getImageForType = (type: string) => {
    switch (type) {
      case "job":
        return "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d";
      case "joint_venture":
        return "https://images.unsplash.com/photo-1605810230434-7631ac76ec81";
      case "internship":
        return "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158";
      case "workshop":
        return "https://images.unsplash.com/photo-1483058712412-4245e9b90334";
      default:
        return "/placeholder.svg";
    }
  };

  const handleCardClick = () => {
    navigate(`/opportunities/${opportunity.id}`);
  };

  return (
    <Card className="group hover:shadow-md transition-all duration-200 cursor-pointer bg-white border-0 shadow-sm" onClick={handleCardClick}>
      <div className="aspect-video relative overflow-hidden rounded-t-lg">
        <img 
          src={getImageForType(opportunity.type)}
          alt={opportunity.title}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-200"
        />
      </div>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex gap-3 items-center">
            <Avatar className="h-10 w-10 bg-secondary/10">
              <span className="font-semibold text-secondary">
                {opportunity.company.charAt(0)}
              </span>
            </Avatar>
            <div>
              <h3 className="font-semibold group-hover:text-secondary transition-colors">
                {opportunity.title}
              </h3>
              <p className="text-sm text-muted-foreground">{opportunity.company}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-secondary"
            onClick={(e) => {
              e.stopPropagation();
              // Add to favorites functionality here
            }}
          >
            <Heart className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-secondary/10 text-secondary border-0">
              {opportunity.type.replace("_", " ")}
            </Badge>
            <span>•</span>
            <span>{opportunity.location}</span>
            {opportunity.salary_range && (
              <>
                <span>•</span>
                <span>{opportunity.salary_range}</span>
              </>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-0 flex justify-between items-center">
        <span className="text-xs text-muted-foreground">
          Posted {formatDate(opportunity.created_at)}
        </span>
        <Button
          size="sm"
          className="bg-primary hover:bg-primary/90 text-primary-foreground"
          onClick={(e) => {
            e.stopPropagation();
            onApply(opportunity.id);
          }}
        >
          Quick Apply
        </Button>
      </CardFooter>
    </Card>
  );
}