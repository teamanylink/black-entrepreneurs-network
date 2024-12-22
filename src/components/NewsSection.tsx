import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const newsItems = [
  {
    title: "Tech Startups Leading Innovation",
    description: "How Black-owned tech startups are reshaping the industry landscape",
    category: "Technology",
    date: "Mar 15, 2024"
  },
  {
    title: "Funding Opportunities Expand",
    description: "New initiatives provide increased access to capital for entrepreneurs",
    category: "Finance",
    date: "Mar 14, 2024"
  },
  {
    title: "Community Success Story",
    description: "Local business owner shares journey to seven-figure success",
    category: "Success Stories",
    date: "Mar 13, 2024"
  }
];

export const NewsSection = () => {
  return (
    <section id="news" className="py-16 bg-muted">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Latest News & Insights</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {newsItems.map((item, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-sm text-muted-foreground mb-2">
                  {item.category} • {item.date}
                </div>
                <CardTitle className="text-xl">{item.title}</CardTitle>
                <CardDescription>{item.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="link" className="p-0 text-primary hover:text-primary/80">
                  Read More →
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};