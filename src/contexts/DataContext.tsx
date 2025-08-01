import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Subject, Task, ScheduleEntry } from '@/lib/types';
import { subjects as mockSubjects, tasks as mockTasks, schedule as mockSchedule } from '@/lib/mock-data';

interface DataContextType {
  subjects: Subject[];
  tasks: Task[];
  schedule: ScheduleEntry[];
  addSubject: (subject: Omit<Subject, 'id'>) => void;
  addScheduleEntry: (entry: Omit<ScheduleEntry, 'id'>) => void;
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

  const addScheduleEntry = (entryData: Omit<ScheduleEntry, 'id'>) => {
    const newEntry: ScheduleEntry = {
      id: `sch-${Date.now()}`,
      ...entryData,
    };
    setSchedule(prevSchedule => [...prevSchedule, newEntry].sort((a, b) => a.startTime.localeCompare(b.startTime)));
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
    addScheduleEntry,
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