import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Subject, ScheduleEntry } from "@/lib/types";
import { useData } from "@/contexts/DataContext";
import { ScheduleEntryFormDialog } from "@/components/ScheduleEntryFormDialog";
import { Button } from "@/components/ui/button";
import { Pencil, PlusCircle, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { showSuccess } from "@/utils/toast";

const colorMap: { [key: string]: string } = {
  blue: "border-l-4 border-blue-500",
  green: "border-l-4 border-green-500",
  purple: "border-l-4 border-purple-500",
  red: "border-l-4 border-red-500",
  yellow: "border-l-4 border-yellow-500",
  gray: "border-l-4 border-gray-500",
};

const weekdays = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];

export default function Schedule() {
  const { schedule, subjects, deleteScheduleEntry } = useData();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState<ScheduleEntry | undefined>(undefined);

  const getSubject = (id: string): Subject | undefined => subjects.find(s => s.id === id);

  const handleCreate = () => {
    setEditingEntry(undefined);
    setIsFormOpen(true);
  };

  const handleEdit = (entry: ScheduleEntry) => {
    setEditingEntry(entry);
    setIsFormOpen(true);
  };

  const handleDelete = (entryId: string) => {
    deleteScheduleEntry(entryId);
    showSuccess("Clase eliminada del horario.");
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-left">Horario Semanal</h1>
        <Button onClick={handleCreate}>
          <PlusCircle className="h-4 w-4 md:mr-2" />
          <span className="hidden md:inline">Agregar Clase</span>
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
                      <CardContent className="p-4 text-left relative group">
                        <p className="font-bold">{subject.name}</p>
                        <p className="text-sm text-muted-foreground">{subject.teacher}</p>
                        <p className="text-sm text-muted-foreground mt-2">{entry.location}</p>
                        <p className="text-sm font-mono bg-muted px-2 py-1 rounded-md mt-2 inline-block">
                          {entry.startTime} - {entry.endTime}
                        </p>
                        <div className="absolute top-2 right-2 flex items-center gap-0 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleEdit(entry)}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Esta acción no se puede deshacer. Esto eliminará permanentemente la clase de tu horario.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDelete(entry.id)}>Eliminar</AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
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
      <ScheduleEntryFormDialog
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        scheduleEntry={editingEntry}
      />
    </div>
  );
}