import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UploadCloud, FileText, X } from 'lucide-react';

export default function StudyPlanner() {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [pdfName, setPdfName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === "application/pdf") {
      if (pdfUrl) {
        URL.revokeObjectURL(pdfUrl);
      }
      const newUrl = URL.createObjectURL(file);
      setPdfUrl(newUrl);
      setPdfName(file.name);
    } else {
      console.error("Por favor, selecciona un archivo PDF.");
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemovePdf = () => {
    if (pdfUrl) {
      URL.revokeObjectURL(pdfUrl);
    }
    setPdfUrl(null);
    setPdfName(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  useEffect(() => {
    // Limpieza al desmontar el componente para evitar fugas de memoria
    return () => {
      if (pdfUrl) {
        URL.revokeObjectURL(pdfUrl);
      }
    };
  }, [pdfUrl]);

  return (
    <div className="container mx-auto p-4 flex flex-col h-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-left">Plan de Estudio</h1>
        {pdfUrl && (
          <Button variant="outline" onClick={handleUploadClick}>
            Cambiar PDF
          </Button>
        )}
      </div>

      {pdfUrl ? (
        <Card className="flex-1 flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-2 min-w-0">
              <FileText className="h-5 w-5 flex-shrink-0" />
              <CardTitle className="text-lg truncate" title={pdfName || 'Plan de Estudio'}>
                {pdfName || 'Plan de Estudio'}
              </CardTitle>
            </div>
            <Button variant="ghost" size="icon" onClick={handleRemovePdf}>
              <X className="h-5 w-5" />
              <span className="sr-only">Eliminar PDF</span>
            </Button>
          </CardHeader>
          <CardContent className="flex-1 p-0 md:p-4">
            <iframe
              src={pdfUrl}
              title={pdfName || 'Plan de Estudio'}
              width="100%"
              height="100%"
              className="border-0 rounded-md"
            />
          </CardContent>
        </Card>
      ) : (
        <div className="flex-1 flex items-center justify-center rounded-lg border border-dashed shadow-sm">
          <div className="flex flex-col items-center gap-4 text-center p-8">
            <UploadCloud className="h-16 w-16 text-muted-foreground" />
            <h3 className="text-2xl font-bold tracking-tight">
              Sube tu Plan de Estudio
            </h3>
            <p className="text-sm text-muted-foreground">
              Haz clic en el botón para seleccionar el archivo PDF de tu malla curricular.
            </p>
            <Button onClick={handleUploadClick}>
              Seleccionar Archivo
            </Button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="application/pdf"
              className="hidden"
            />
          </div>
        </div>
      )}
    </div>
  );
}