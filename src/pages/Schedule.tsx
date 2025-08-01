import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { schedule, subjects } from "@/lib/mock-data";
import { Subject } from "@/lib/types";
import { PlusCircle } from "lucide-react";

const getSubject = (id: string): Subject | undefined => subjects.find(s => s.id === id);

const colorMap: { [key: string]: string } = {
  blue: "border-l-4 border-blue-500",
  green: "border-l-4 border-green-500",
  purple: "border-l-4 border-purple-500",
};

const weekdays = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];

export default function Schedule() {
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-left">Horario Semanal</h1>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Agregar Clase
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {weekdays.map(day => {
          const daySchedule = schedule
            .filter(entry => entry.day === day)
            .sort((a, b) => a.startTime.localeCompare(b.startTime));

          return (
            <div key={day} className="flex flex-col gap-4">
              <h2 className="text-xl font-semibold text-center mb-2">{day}</h2>
              {daySchedule.length > 0 ? (
                daySchedule.map(entry => {
                  const subject = getSubject(entry.subjectId);
                  if (!subject) return null;

                  const subjectColorClass = colorMap[subject.color] || 'border-l-4 border-gray-500';

                  return (
                    <Card key={entry.id} className={subjectColorClass}>
                      <CardContent className="p-4 text-left">
                        <p className="font-bold">{subject.name}</p>
                        <p className="text-sm text-muted-foreground">{subject.teacher}</p>
                        <p className="text-sm text-muted-foreground mt-2">{entry.location}</p>
                        <p className="text-sm font-mono bg-muted px-2 py-1 rounded-md mt-2 inline-block">
                          {entry.startTime} - {entry.endTime}
                        </p>
                      </CardContent>
                    </Card>
                  );
                })
              ) : (
                <div className="text-center text-muted-foreground p-4 border-2 border-dashed rounded-lg h-full flex items-center justify-center min-h-[100px]">
                  <p>Sin clases</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}