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
import { Subject } from "@/lib/types";

const subjectSchema = z.object({
  name: z.string().min(3, { message: "El nombre debe tener al menos 3 caracteres." }),
  teacher: z.string().min(3, { message: "El nombre del docente debe tener al menos 3 caracteres." }),
  credits: z.coerce.number().min(1, { message: "Los créditos deben ser al menos 1." }),
  color: z.enum(["blue", "green", "purple", "red", "yellow", "gray"]),
});

type SubjectFormValues = z.infer<typeof subjectSchema>;

interface SubjectFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  subject?: Subject;
}

export function SubjectFormDialog({ open, onOpenChange, subject }: SubjectFormDialogProps) {
  const { addSubject, updateSubject } = useData();
  const isEditMode = !!subject;

  const form = useForm<SubjectFormValues>({
    resolver: zodResolver(subjectSchema),
  });

  useEffect(() => {
    if (open) {
      form.reset(
        isEditMode
          ? { ...subject }
          : { name: "", teacher: "", credits: 1, color: "blue" }
      );
    }
  }, [open, subject, form, isEditMode]);

  const onSubmit = (data: SubjectFormValues) => {
    if (isEditMode && subject) {
      updateSubject(subject.id, data);
      showSuccess(`Materia "${data.name}" actualizada exitosamente.`);
    } else {
      addSubject(data);
      showSuccess(`Materia "${data.name}" creada exitosamente.`);
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isEditMode ? "Editar Materia" : "Crear Nueva Materia"}</DialogTitle>
          <DialogDescription>
            {isEditMode ? "Modifica los detalles de la materia." : "Completa los datos para agregar una nueva materia a tu lista."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre de la materia</FormLabel>
                  <FormControl>
                    <Input placeholder="Ej: Cálculo Diferencial" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="teacher"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre del docente</FormLabel>
                  <FormControl>
                    <Input placeholder="Ej: Dr. Alan Turing" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="credits"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Créditos</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Color de la etiqueta</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona un color" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="blue">Azul</SelectItem>
                      <SelectItem value="green">Verde</SelectItem>
                      <SelectItem value="purple">Púrpura</SelectItem>
                      <SelectItem value="red">Rojo</SelectItem>
                      <SelectItem value="yellow">Amarillo</SelectItem>
                      <SelectItem value="gray">Gris</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">{isEditMode ? "Guardar Cambios" : "Crear Materia"}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}