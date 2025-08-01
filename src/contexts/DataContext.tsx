import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Subject, Task, ScheduleEntry } from '@/lib/types';
import { subjects as mockSubjects, tasks as mockTasks, schedule as mockSchedule } from '@/lib/mock-data';

interface DataContextType {
  subjects: Subject[];
  tasks: Task[];
  schedule: ScheduleEntry[];
  addSubject: (subject: Omit<Subject, 'id'>) => void;
  updateSubject: (subjectId: string, subjectData: Omit<Subject, 'id'>) => void;
  deleteSubject: (subjectId: string) => void;
  addScheduleEntry: (entry: Omit<ScheduleEntry, 'id'>) => void;
  updateScheduleEntry: (entryId: string, entryData: Omit<ScheduleEntry, 'id'>) => void;
  deleteScheduleEntry: (entryId: string) => void;
  addTask: (task: Omit<Task, 'id' | 'completed'>) => void;
  updateTask: (taskId: string, taskData: Omit<Task, 'id' | 'completed'>) => void;
  deleteTask: (taskId: string) => void;
  updateTaskCompletion: (taskId: string, completed: boolean) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [subjects, setSubjects] = useState<Subject[]>(mockSubjects);
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [schedule, setSchedule] = useState<ScheduleEntry[]>(mockSchedule);

  const addSubject = (subjectData: Omit<Subject, 'id'>) => {
    const newSubject: Subject = {
      id: `subj-${Date.now()}`,
      ...subjectData,
    };
    setSubjects(prevSubjects => [...prevSubjects, newSubject]);
  };

  const updateSubject = (subjectId: string, subjectData: Omit<Subject, 'id'>) => {
    setSubjects(prev => prev.map(s => s.id === subjectId ? { id: subjectId, ...subjectData } : s));
  };

  const deleteSubject = (subjectId: string) => {
    setSubjects(prev => prev.filter(s => s.id !== subjectId));
  };

  const addScheduleEntry = (entryData: Omit<ScheduleEntry, 'id'>) => {
    const newEntry: ScheduleEntry = {
      id: `sch-${Date.now()}`,
      ...entryData,
    };
    setSchedule(prevSchedule => [...prevSchedule, newEntry].sort((a, b) => a.startTime.localeCompare(b.startTime)));
  };

  const updateScheduleEntry = (entryId: string, entryData: Omit<ScheduleEntry, 'id'>) => {
    setSchedule(prev => prev.map(e => e.id === entryId ? { id: entryId, ...entryData } : e).sort((a, b) => a.startTime.localeCompare(b.startTime)));
  };

  const deleteScheduleEntry = (entryId: string) => {
    setSchedule(prev => prev.filter(e => e.id !== entryId));
  };

  const addTask = (taskData: Omit<Task, 'id' | 'completed'>) => {
    const newTask: Task = {
      id: `task-${Date.now()}`,
      completed: false,
      ...taskData,
    };
    setTasks(prevTasks => [...prevTasks, newTask]);
  };

  const updateTask = (taskId: string, taskData: Omit<Task, 'id' | 'completed'>) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, ...taskData } : task
      )
    );
  };
  
  const deleteTask = (taskId: string) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
  };

  const updateTaskCompletion = (taskId: string, completed: boolean) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, completed } : task
      )
    );
  };

  const value = {
    subjects,
    tasks,
    schedule,
    addSubject,
    updateSubject,
    deleteSubject,
    addScheduleEntry,
    updateScheduleEntry,
    deleteScheduleEntry,
    addTask,
    updateTask,
    deleteTask,
    updateTaskCompletion,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};