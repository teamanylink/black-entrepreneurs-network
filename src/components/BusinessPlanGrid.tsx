import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Facebook, Twitter, Globe, Search, ShoppingCart, Layout, PenTool } from "lucide-react";
import { ContentGeneratorDialog } from "./ContentGeneratorDialog";

const businessPlanCategories = [
  {
    id: "article_blog",
    title: "Article and Blog",
    description: "Write your dream SEO article short time.",
    icon: FileText,
    color: "bg-blue-50",
  },
  {
    id: "social_media",
    title: "Social Media",
    description: "Write compelling detailed product posts.",
    icon: Facebook,
    color: "bg-green-50",
  },
  {
    id: "keyword_research",
    title: "Keyword Research",
    description: "Pick your exact keyword for rank anything.",
    icon: Search,
    color: "bg-purple-50",
  },
];

const businessPlanTopics = [
  {
    id: "blog_idea",
    title: "Blog Idea",
    description: "Blog ideas generate more website traffic.",
    icon: PenTool,
    type: "Blog Idea"
  },
  {
    id: "blog_intro",
    title: "Blog Intro",
    description: "Start write compelling introduction.",
    icon: FileText,
    type: "Blog Introduction"
  },
  {
    id: "article_generator",
    title: "Article Generator",
    description: "Generate more copies with article AI.",
    icon: Layout,
    type: "Article"
  },
  {
    id: "facebook_ads",
    title: "Facebook Ads",
    description: "Facebook ad copies that make your ads.",
    icon: Facebook,
    type: "Facebook Ad"
  },
  {
    id: "tweet_ideas",
    title: "Tweet Ideas",
    description: "Engage with your amazing followers.",
    icon: Twitter,
    type: "Tweet"
  },
  {
    id: "content_rephrase",
    title: "Content Rephrase",
    description: "Rephrase your content in different voice.",
    icon: PenTool,
    type: "Content Rephrase"
  },
  {
    id: "seo_meta",
    title: "SEO Meta Description",
    description: "Your website for maximum visibility.",
    icon: Globe,
    type: "SEO Meta Description"
  },
  {
    id: "product_description",
    title: "Product Description",
    description: "Write compelling detailed product.",
    icon: ShoppingCart,
    type: "Product Description"
  },
];

export function BusinessPlanGrid() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const handleTopicClick = (type: string | undefined) => {
    if (type) {
      setSelectedType(type);
      setDialogOpen(true);
    }
  };

  return (
    <div className="space-y-8">
      {/* Popular Categories */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Popular Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {businessPlanCategories.map((category) => (
            <Card
              key={category.id}
              className={`${category.color} border-none cursor-pointer hover:shadow-md transition-shadow`}
              onClick={() => handleTopicClick(category.title)}
            >
              <CardContent className="p-6 flex items-start gap-4">
                <category.icon className="h-6 w-6" />
                <div>
                  <h3 className="font-semibold mb-1">{category.title}</h3>
                  <p className="text-sm text-gray-600">{category.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* All Topics */}
      <div>
        <h2 className="text-xl font-semibold mb-4">All Topics</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {businessPlanTopics.map((topic) => (
            <Card
              key={topic.id}
              className="border hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => handleTopicClick(topic.type)}
            >
              <CardContent className="p-6 flex items-start gap-4">
                <topic.icon className="h-6 w-6" />
                <div>
                  <h3 className="font-semibold mb-1">{topic.title}</h3>
                  <p className="text-sm text-gray-600">{topic.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {selectedType && (
        <ContentGeneratorDialog
          type={selectedType}
          open={dialogOpen}
          onOpenChange={setDialogOpen}
        />
      )}
    </div>
  );
}