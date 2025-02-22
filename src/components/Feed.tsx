
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Image, MapPin, Smile, Link as LinkIcon, MoreHorizontal } from "lucide-react";

export function Feed() {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card className="border-gray-100">
        <CardHeader className="p-4 pb-0">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback>GT</AvatarFallback>
            </Avatar>
            <input 
              type="text"
              placeholder="What's on your mind?"
              className="flex-1 bg-gray-50 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-secondary/50"
            />
          </div>
          <div className="flex items-center gap-4 pt-4 pb-2">
            <Button variant="ghost" size="sm" className="text-gray-600">
              <Image className="h-4 w-4 mr-2" />
              Photo
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-600">
              <MapPin className="h-4 w-4 mr-2" />
              Location
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-600">
              <Smile className="h-4 w-4 mr-2" />
              Feeling
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-600">
              <LinkIcon className="h-4 w-4 mr-2" />
              Link
            </Button>
          </div>
        </CardHeader>
      </Card>

      <Card className="border-gray-100">
        <CardHeader className="p-4 flex flex-row items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback>KR</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold">Kina Rally</h3>
              <p className="text-sm text-gray-500">03 june at 08:02 AM</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="text-gray-600">
            <MoreHorizontal className="h-5 w-5" />
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          <img 
            src="/placeholder.svg" 
            alt="Post content"
            className="w-full h-[400px] object-cover"
          />
        </CardContent>
      </Card>
    </div>
  );
}
