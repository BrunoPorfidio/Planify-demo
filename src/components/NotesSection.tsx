import React, { useState, useEffect } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { useData } from '@/contexts/DataContext';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface NotesSectionProps {
  selectedDate: Date;
}

export function NotesSection({ selectedDate }: NotesSectionProps) {
  const { notes, updateNote } = useData();
  const dateKey = format(selectedDate, 'yyyy-MM-dd');
  
  const note = notes.find(n => n.date === dateKey);
  const [content, setContent] = useState(note?.content || '');

  useEffect(() => {
    const noteForDate = notes.find(n => n.date === dateKey);
    setContent(noteForDate?.content || '');
  }, [selectedDate, notes, dateKey]);

  const handleBlur = () => {
    updateNote(dateKey, content);
  };

  return (
    <div className="mt-6 border-t pt-4">
      <h3 className="text-lg font-semibold mb-2">Notas para el {format(selectedDate, "PPP", { locale: es })}</h3>
      <Textarea
        placeholder="Escribe tus notas para este día... Los cambios se guardan automáticamente."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onBlur={handleBlur}
        className="min-h-[120px] text-base resize-none"
      />
    </div>
  );
}