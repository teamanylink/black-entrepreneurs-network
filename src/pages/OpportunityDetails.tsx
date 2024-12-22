import { useParams, useNavigate, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, MapPin, Calendar, User, ArrowLeft } from "lucide-react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { AuthDialog } from "@/components/AuthDialog";

export default function OpportunityDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showAuthDialog, setShowAuthDialog] = useState(false);

  const { data: opportunity, isLoading } = useQuery({
    queryKey: ["opportunity", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("opportunities")
        .select("*")
        .eq("id", id)
        .maybeSingle();

      if (error) throw error;
      return data;
    },
  });

  const handleApply = () => {
    setShowAuthDialog(true);
  };

  if (isLoading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  if (!opportunity) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1>Opportunity not found</h1>
        <Link to="/opportunities">
          <Button>Back to Opportunities</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-6">
        <Button
          variant="ghost"
          className="mb-4"
          onClick={() => navigate("/opportunities")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Opportunities
        </Button>

        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <Link className="transition-colors hover:text-foreground" to="/opportunities">
                Opportunities
              </Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <span className="font-normal text-foreground">{opportunity.title}</span>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-start mb-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary text-primary-foreground">
                {opportunity.type.replace("_", " ")}
              </span>
              <span className="text-sm text-muted-foreground">
                {new Date(opportunity.created_at).toLocaleDateString()}
              </span>
            </div>
            <CardTitle className="text-3xl">{opportunity.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-lg">
                  <Briefcase className="h-5 w-5" />
                  <span>{opportunity.company}</span>
                </div>
                <div className="flex items-center gap-2 text-lg">
                  <MapPin className="h-5 w-5" />
                  <span>{opportunity.location}</span>
                </div>
                {opportunity.salary_range && (
                  <div className="flex items-center gap-2 text-lg">
                    <Calendar className="h-5 w-5" />
                    <span>{opportunity.salary_range}</span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-lg">
                  <User className="h-5 w-5" />
                  <span>Posted by {opportunity.company}</span>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Description</h3>
                <p className="text-muted-foreground whitespace-pre-wrap">
                  {opportunity.description}
                </p>
              </div>

              {opportunity.requirements && opportunity.requirements.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">Requirements</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    {opportunity.requirements.map((req, index) => (
                      <li key={index} className="text-muted-foreground">
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {opportunity.responsibilities && opportunity.responsibilities.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">Responsibilities</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    {opportunity.responsibilities.map((resp, index) => (
                      <li key={index} className="text-muted-foreground">
                        {resp}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <Button className="w-full mt-6" size="lg" onClick={handleApply}>
                Apply Now
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <AuthDialog
        open={showAuthDialog}
        onOpenChange={setShowAuthDialog}
        opportunityId={id}
      />
    </div>
  );
}