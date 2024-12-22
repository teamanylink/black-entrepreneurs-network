import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

export const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-primary">B.E.N.</h1>
            <span className="hidden md:inline text-sm text-muted-foreground">Business Empowerment Network</span>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <a href="#news" className="text-muted-foreground hover:text-primary transition-colors">News</a>
            <a href="#stories" className="text-muted-foreground hover:text-primary transition-colors">Success Stories</a>
            <a href="#resources" className="text-muted-foreground hover:text-primary transition-colors">Resources</a>
            <Button variant="default">Join Network</Button>
          </div>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </nav>
  );
};