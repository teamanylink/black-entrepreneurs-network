
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { Stories } from "@/components/Stories";
import { Feed } from "@/components/Feed";
import { EventCalendar } from "@/components/EventCalendar";
import { DashboardSearch } from "@/components/DashboardSearch";
import { Button } from "@/components/ui/button";
import { Video, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";

export default function Dashboard() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <div className="flex h-16 items-center justify-between border-b px-4 lg:px-6">
        <div className="flex items-center gap-4">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0">
              <DashboardSidebar onNavigate={() => setIsMobileMenuOpen(false)} />
            </SheetContent>
          </Sheet>
          <DashboardSearch />
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" className="hidden sm:flex gap-2">
            <Video className="h-4 w-4" />
            Go live
          </Button>
          <Button variant="ghost" size="icon" className="relative">
            <div className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-red-500" />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
              <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
            </svg>
          </Button>
          <div className="flex items-center gap-2">
            <img
              src="/placeholder.svg"
              alt="Avatar"
              className="h-8 w-8 rounded-full"
            />
            <div className="hidden md:block">
              <div className="text-sm font-medium">Gery thomas</div>
              <div className="text-xs text-gray-500">Gerthom@gmail.com</div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex">
        <div className="hidden lg:block">
          <DashboardSidebar />
        </div>
        <main className="flex-1">
          <div className="container max-w-6xl">
            <div className="px-4 py-6 lg:px-8">
              <Stories />
              <Feed />
            </div>
          </div>
        </main>
        <aside className="hidden xl:block w-80 p-4 border-l">
          <EventCalendar />
        </aside>
      </div>
    </div>
  );
}
