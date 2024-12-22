import { Button } from "@/components/ui/button";
import { BookOpen, Users, Briefcase } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const resources = [
  {
    title: "Learning Hub",
    description: "Access courses, workshops, and guides designed for business growth",
    icon: BookOpen
  },
  {
    title: "Network Directory",
    description: "Connect with other entrepreneurs and industry leaders",
    icon: Users
  },
  {
    title: "Opportunities Board",
    description: "Discover partnerships, jobs, and collaboration possibilities",
    icon: Briefcase
  }
];

export const ResourcesSection = () => {
  return (
    <section id="resources" className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Resources</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {resources.map((resource, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow text-center">
              <CardHeader>
                <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-4">
                  <resource.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>{resource.title}</CardTitle>
                <CardDescription>{resource.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="link" className="text-primary hover:text-primary/80">
                  Explore →
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};