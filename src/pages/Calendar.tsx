import React, { useState, useMemo } from 'react';
import { isSameDay, format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { useData } from '@/contexts/DataContext';
import { Task } from '@/lib/types';

function TaskItem({ task, subjectName, onCheckedChange }: { task: Task, subjectName: string, onCheckedChange: (checked: boolean) => void }) {
  const badgeVariant = task.type === 'Parcial' ? 'destructive' : 'secondary';
  return (
    <li className="flex items-center gap-4 p-2 rounded-md hover:bg-accent">
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
      <Badge variant={badgeVariant}>{task.type}</Badge>
    </li>
  );
}

export default function CalendarPage() {
  const { tasks, subjects, updateTaskCompletion } = useData();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const getSubjectName = (id: string) => subjects.find(s => s.id === id)?.name || 'Desconocido';

  const selectedDayTasks = useMemo(() => {
    return tasks.filter(task => isSameDay(task.dueDate, selectedDate))
      .sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime());
  }, [tasks, selectedDate]);

  const eventDays = useMemo(() => tasks.map(task => task.dueDate), [tasks]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-left">Calendario</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 flex justify-center p-0">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={(day) => setSelectedDate(day || new Date())}
            className="p-0"
            locale={es}
            components={{
              DayContent: ({ date, ...props }) => {
                const hasEvent = eventDays.some(eventDay => isSameDay(date, eventDay));
                return (
                  <div className="relative h-full w-full flex items-center justify-center">
                    <span {...props} />
                    {hasEvent && <div className="absolute bottom-1 h-1.5 w-1.5 rounded-full bg-blue-500" />}
                  </div>
                );
              }
            }}
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
    </div>
  );
}