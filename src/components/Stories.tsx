
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus } from "lucide-react";

export function Stories() {
  const stories = [
    { id: 1, name: "Add Story", image: null, isAdd: true },
    { id: 2, name: "Robert Fox", image: "/placeholder.svg" },
    { id: 3, name: "Kick Rompe", image: "/placeholder.svg" },
    { id: 4, name: "Arlene McCoy", image: "/placeholder.svg" },
  ];

  return (
    <div className="flex gap-4 mb-8 overflow-x-auto pb-2 scrollbar-hide">
      {stories.map((story) => (
        <div key={story.id} className="flex flex-col items-center gap-2 flex-shrink-0">
          <div 
            className={`relative group cursor-pointer ${
              story.isAdd ? '' : 'ring-2 ring-[#0066FF] ring-offset-2'
            } rounded-full transition-all hover:scale-105`}
          >
            <Avatar className="h-16 w-16">
              {story.isAdd ? (
                <div className="w-full h-full flex items-center justify-center bg-gray-100 hover:bg-gray-200 transition-colors">
                  <Plus className="h-8 w-8 text-gray-600" />
                </div>
              ) : (
                <>
                  <AvatarImage src={story.image} />
                  <AvatarFallback>{story.name[0]}</AvatarFallback>
                </>
              )}
            </Avatar>
          </div>
          <span className="text-xs font-medium text-gray-700 whitespace-nowrap">
            {story.name}
          </span>
        </div>
      ))}
    </div>
  );
}
