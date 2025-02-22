
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";

export function EventCalendar() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div className="space-y-6">
      <Card className="bg-[#1a237e] text-white rounded-xl overflow-hidden">
        <CardContent className="p-6">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div>Free trial used:</div>
              <div>6 / 14 Day</div>
            </div>
            <p className="text-sm opacity-90">
              Upgrade now for creator connect to access all features in there.
            </p>
            <Button variant="secondary" className="w-full mt-4">
              Upgrade now
            </Button>
          </div>
        </CardContent>
      </Card>

      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Event</h2>
          <Button variant="link" className="text-secondary p-0">
            See All
          </Button>
        </div>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border"
        />
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="w-1 h-16 bg-blue-500 rounded" />
          <div>
            <div className="text-sm text-gray-500">10:45 - 11:30 AM</div>
            <div className="font-medium">Beginner sharing session creator</div>
            <div className="text-sm text-gray-500">Darlene Robertson</div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-1 h-16 bg-secondary rounded" />
          <div>
            <div className="text-sm text-gray-500">15:20 - 16:00 PM</div>
            <div className="font-medium">Improve performance for content ideas</div>
            <div className="text-sm text-gray-500">Esther Howard</div>
          </div>
        </div>
      </div>
    </div>
  );
}
