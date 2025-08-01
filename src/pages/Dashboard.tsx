import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { tasks, schedule, subjects } from "@/lib/mock-data";
import { format } from "date-fns";
import { es } from "date-fns/locale";

const getSubjectName = (id: string) => subjects.find(s => s.id === id)?.name || 'Desconocido';

const today = new Date();
const dayOfWeek = new Intl.DateTimeFormat('es-ES', { weekday: 'long' }).format(today);
const capitalizedDay = dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1);

const upcomingTasks = tasks
  .filter(task => !task.completed && task.dueDate >= today)
  .sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime())
  .slice(0, 5);

const todaySchedule = schedule.filter(entry => entry.day === capitalizedDay);

export default function Dashboard() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-left">Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Próximas Entregas y Parciales</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {upcomingTasks.length > 0 ? (
                upcomingTasks.map(task => (
                  <li key={task.id} className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold">{task.title}</p>
                      <p className="text-sm text-muted-foreground">{getSubjectName(task.subjectId)}</p>
                    </div>
                    <div className="text-right">
                       <Badge variant={task.type === 'Parcial' ? 'destructive' : 'secondary'}>{task.type}</Badge>
                       <p className="text-sm text-muted-foreground mt-1">
                        {format(task.dueDate, "PPP", { locale: es })}
                       </p>
                    </div>
                  </li>
                ))
              ) : (
                <p className="text-muted-foreground">No tienes tareas pendientes. ¡Buen trabajo!</p>
              )}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Horario de Hoy ({capitalizedDay})</CardTitle>
          </CardHeader>
          <CardContent>
             <ul className="space-y-4">
              {todaySchedule.length > 0 ? (
                todaySchedule.map(entry => (
                  <li key={entry.id} className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold">{getSubjectName(entry.subjectId)}</p>
                      <p className="text-sm text-muted-foreground">{entry.location}</p>
                    </div>
                    <p className="text-sm font-mono bg-muted px-2 py-1 rounded-md">{entry.startTime} - {entry.endTime}</p>
                  </li>
                ))
              ) : (
                 <p className="text-muted-foreground">No tienes clases hoy. ¡Disfruta tu día libre!</p>
              )}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}