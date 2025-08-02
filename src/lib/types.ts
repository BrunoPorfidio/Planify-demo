export interface Subject {
  id: string;
  name: string;
  teacher: string;
  color: string;
  credits: number;
}

export interface Task {
  id: string;
  title: string;
  dueDate: Date;
  subjectId: string;
  completed: boolean;
  type: 'Entrega' | 'Parcial' | 'Recordatorio';
}

export interface ScheduleEntry {
  id: string;
  day: 'Lunes' | 'Martes' | 'Miércoles' | 'Jueves' | 'Viernes';
  startTime: string;
  endTime: string;
  subjectId: string;
  location: string;
}

export interface Note {
  date: string; // YYYY-MM-DD
  content: string;
}