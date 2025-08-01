import React, { useState, useMemo } from 'react';
import { isSameDay, format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { useData } from '@/contexts/DataContext';
import { Task } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Pencil, PlusCircle, Trash2 } from 'lucide-react';
import { TaskFormDialog } from '@/components/TaskFormDialog';
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
import { showSuccess } from '@/utils/toast';

function TaskItem({ task, subjectName, onCheckedChange, onEdit, onDelete }: { task: Task, subjectName: string, onCheckedChange: (checked: boolean) => void, onEdit: () => void, onDelete: () => void }) {
  const badgeVariant = task.type === 'Parcial' ? 'destructive' : 'secondary';
  return (
    <li className="flex items-center gap-4 p-2 rounded-md hover:bg-accent group">
      <Checkbox
        id={`task-${task.id}`}
        checked={task.completed}
        onCheckedChange={onCheckedChange}
      />
      <div className="flex-1 grid gap-1">
        <label htmlFor={`task-${task.id}`} className={`font-medium ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
          {task.title}
        </label>
        <p className="text-sm text-muted-foreground">{subjectName}</p>
      </div>
      <Badge variant={badgeVariant} className="hidden sm:inline-flex">{task.type}</Badge>
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button variant="ghost" size="icon" onClick={onEdit}>
          <Pencil className="h-4 w-4" />
        </Button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
              <Trash2 className="h-4 w-4" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
              <AlertDialogDescription>
                Esta acción no se puede deshacer. Esto eliminará permanentemente la tarea.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction onClick={onDelete}>Eliminar</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </li>
  );
}

export default function CalendarPage() {
  const { tasks, subjects, updateTaskCompletion, deleteTask } = useData();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>(undefined);

  const getSubjectName = (id: string) => subjects.find(s => s.id === id)?.name || 'Desconocido';

  const selectedDayTasks = useMemo(() => {
    return tasks.filter(task => isSameDay(task.dueDate, selectedDate))
      .sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime());
  }, [tasks, selectedDate]);

  const eventDays = useMemo(() => tasks.map(task => task.dueDate), [tasks]);

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setIsFormOpen(true);
  };

  const handleCreate = () => {
    setEditingTask(undefined);
    setIsFormOpen(true);
  };

  const handleDelete = (taskId: string) => {
    deleteTask(taskId);
    showSuccess("Tarea eliminada exitosamente.");
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-6 flex-shrink-0">
        <h1 className="text-3xl font-bold text-left">Calendario</h1>
        <Button onClick={handleCreate}>
          <PlusCircle className="h-4 w-4 md:mr-22" />
          <span className="hidden md:inline">Crear Tarea</span>
        </Button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 flex-1 h-full">
        <Card className="lg:col-span-3 flex flex-col p-0 h-full">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={(day) => setSelectedDate(day || new Date())}
            className="large-calendar w-full flex-1 h-full"
            locale={es}
            modifiers={{ events: eventDays }}
            modifiersClassNames={{ events: 'has-event' }}
          />
        </Card>
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold">
            Tareas para el {format(selectedDate, "PPP", { locale: es })}
          </h2>
          <Card className="flex-1">
            <CardContent className="p-4">
              {selectedDayTasks.length > 0 ? (
                <ul className="space-y-2">
                  {selectedDayTasks.map(task => (
                    <TaskItem
                      key={task.id}
                      task={task}
                      subjectName={getSubjectName(task.subjectId)}
                      onCheckedChange={(checked) => updateTaskCompletion(task.id, checked)}
                      onEdit={() => handleEdit(task)}
                      onDelete={() => handleDelete(task.id)}
                    />
                  ))}
                </ul>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <p className="text-muted-foreground">No hay tareas para este día.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      <TaskFormDialog
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        task={editingTask}
        defaultDate={selectedDate}
      />
    </div>
  );
}