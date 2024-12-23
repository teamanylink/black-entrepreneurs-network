import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface NewsGridProps {
  isLoading?: boolean;
}

export function NewsGrid({ isLoading }: NewsGridProps) {
  const newsItems = [
    {
      title: "Tech Startups Leading Innovation",
      description: "How Black-owned tech startups are reshaping the industry landscape",
      category: "Technology",
      date: "Mar 15, 2024",
      image: "/lovable-uploads/301e3ec9-b8c2-41ae-9abd-b8b018af012b.png"
    },
    {
      title: "Funding Opportunities Expand",
      description: "New initiatives provide increased access to capital for entrepreneurs",
      category: "Finance",
      date: "Mar 14, 2024",
      image: "/lovable-uploads/69b4951b-76c0-4a2a-af3d-fc03cdcf9f01.png"
    },
    {
      title: "Community Success Story",
      description: "Local business owner shares journey to seven-figure success",
      category: "Success Stories",
      date: "Mar 13, 2024",
      image: "/placeholder.svg"
    }
  ];

  if (isLoading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="space-y-4">
            <Skeleton className="h-[200px] w-full rounded-lg" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {newsItems.map((item, index) => (
        <Card key={index} className="hover:shadow-lg transition-shadow overflow-hidden">
          <div className="aspect-video relative">
            <img 
              src={item.image} 
              alt={item.title}
              className="object-cover w-full h-full"
            />
          </div>
          <CardHeader>
            <div className="text-sm text-muted-foreground mb-2">
              {item.category} • {item.date}
            </div>
            <CardTitle className="text-xl">{item.title}</CardTitle>
            <CardDescription>{item.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <a href="#" className="text-primary hover:text-primary/80">
              Read More →
            </a>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}