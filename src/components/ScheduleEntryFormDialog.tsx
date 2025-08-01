import React, { useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useData } from "@/contexts/DataContext";
import { showSuccess } from "@/utils/toast";
import { ScheduleEntry } from "@/lib/types";

const scheduleSchema = z.object({
  subjectId: z.string({ required_error: "Debes seleccionar una materia." }),
  day: z.enum(["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"]),
  startTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Formato de hora inválido (HH:MM)."),
  endTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Formato de hora inválido (HH:MM)."),
  location: z.string().min(1, "La ubicación es requerida."),
}).refine(data => data.startTime < data.endTime, {
  message: "La hora de inicio debe ser anterior a la hora de fin.",
  path: ["endTime"],
});

type ScheduleFormValues = z.infer<typeof scheduleSchema>;

interface ScheduleEntryFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  scheduleEntry?: ScheduleEntry;
}

export function ScheduleEntryFormDialog({ open, onOpenChange, scheduleEntry }: ScheduleEntryFormDialogProps) {
  const { subjects, addScheduleEntry, updateScheduleEntry } = useData();
  const isEditMode = !!scheduleEntry;

  const form = useForm<ScheduleFormValues>({
    resolver: zodResolver(scheduleSchema),
  });

  useEffect(() => {
    if (open) {
      form.reset(
        isEditMode
          ? { ...scheduleEntry }
          : { location: "", startTime: "08:00", endTime: "10:00", day: "Lunes" }
      );
    }
  }, [open, scheduleEntry, form, isEditMode]);

  const onSubmit = (data: ScheduleFormValues) => {
    if (isEditMode && scheduleEntry) {
      updateScheduleEntry(scheduleEntry.id, data);
      showSuccess(`Clase actualizada exitosamente.`);
    } else {
      addScheduleEntry(data);
      const subjectName = subjects.find(s => s.id === data.subjectId)?.name || "la materia";
      showSuccess(`Clase de ${subjectName} agregada al horario.`);
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isEditMode ? "Editar Clase" : "Agregar Clase al Horario"}</DialogTitle>
          <DialogDescription>
            {isEditMode ? "Modifica los detalles de la clase." : "Completa los datos para agregar una nueva clase a tu horario semanal."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="subjectId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Materia</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona una materia" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {subjects.map(subject => (
                        <SelectItem key={subject.id} value={subject.id}>{subject.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="day"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Día de la semana</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona un día" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"].map(day => (
                        <SelectItem key={day} value={day}>{day}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="startTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hora de inicio</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="endTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hora de fin</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ubicación</FormLabel>
                  <FormControl>
                    <Input placeholder="Ej: Aula 101" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">{isEditMode ? "Guardar Cambios" : "Guardar Clase"}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}