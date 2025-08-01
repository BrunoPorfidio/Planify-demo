import { Subject, Task, ScheduleEntry } from './types';

export const subjects: Subject[] = [
  { id: 'subj-1', name: 'Cálculo Diferencial', teacher: 'Dr. Alan Turing', color: 'blue', credits: 4 },
  { id: 'subj-2', name: 'Estructuras de Datos', teacher: 'Dra. Ada Lovelace', color: 'green', credits: 5 },
  { id: 'subj-3', name: 'Diseño de Interfaces', teacher: 'Prof. Steve Jobs', color: 'purple', credits: 3 },
];

export const tasks: Task[] = [
  { id: 'task-1', title: 'Entrega Taller 1', dueDate: new Date(new Date().setDate(new Date().getDate() + 2)), subjectId: 'subj-1', completed: false, type: 'Entrega' },
  { id: 'task-2', title: 'Parcial 1', dueDate: new Date(new Date().setDate(new Date().getDate() + 7)), subjectId: 'subj-2', completed: false, type: 'Parcial' },
  { id: 'task-3', title: 'Leer capítulo 3', dueDate: new Date(new Date().setDate(new Date().getDate() + 1)), subjectId: 'subj-3', completed: true, type: 'Recordatorio' },
  { id: 'task-4', title: 'Preparar exposición', dueDate: new Date(new Date().setDate(new Date().getDate() + 4)), subjectId: 'subj-3', completed: false, type: 'Entrega' },
];

export const schedule: ScheduleEntry[] = [
  { id: 'sch-1', day: 'Lunes', startTime: '08:00', endTime: '10:00', subjectId: 'subj-1', location: 'Aula 101' },
  { id: 'sch-2', day: 'Martes', startTime: '10:00', endTime: '12:00', subjectId: 'subj-2', location: 'Lab C-2' },
  { id: 'sch-3', day: 'Miércoles', startTime: '08:00', endTime: '10:00', subjectId: 'subj-1', location: 'Aula 101' },
  { id: 'sch-4', day: 'Jueves', startTime: '10:00', endTime: '12:00', subjectId: 'subj-2', location: 'Lab C-2' },
  { id: 'sch-5', day: 'Viernes', startTime: '14:00', endTime: '16:00', subjectId: 'subj-3', location: 'Aula 305' },
];