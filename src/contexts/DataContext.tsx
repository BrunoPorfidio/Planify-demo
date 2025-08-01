import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Subject, Task, ScheduleEntry } from '@/lib/types';
import { subjects as mockSubjects, tasks as mockTasks, schedule as mockSchedule } from '@/lib/mock-data';

interface DataContextType {
  subjects: Subject[];
  tasks: Task[];
  schedule: ScheduleEntry[];
  addSubject: (subject: Omit<Subject, 'id'>) => void;
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

  const value = {
    subjects,
    tasks,
    schedule,
    addSubject,
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