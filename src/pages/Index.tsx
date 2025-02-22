
import { Navbar } from "@/components/Navbar";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { Stories } from "@/components/Stories";
import { Feed } from "@/components/Feed";
import { EventCalendar } from "@/components/EventCalendar";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="flex">
        <DashboardSidebar />
        <main className="flex-1 px-4 py-6">
          <Stories />
          <Feed />
        </main>
        <aside className="w-80 p-4 border-l">
          <EventCalendar />
        </aside>
      </div>
    </div>
  );
};

export default Index;
