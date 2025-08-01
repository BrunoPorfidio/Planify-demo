import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useData } from "@/contexts/DataContext";
import { AddSubjectDialog } from "@/components/AddSubjectDialog";
import { Button } from "@/components/ui/button";

const colorMap: { [key: string]: { bg: string, text: string, border: string } } = {
  blue: { bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-300' },
  green: { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-300' },
  purple: { bg: 'bg-purple-100', text: 'text-purple-800', border: 'border-purple-300' },
  red: { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-300' },
  yellow: { bg: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-300' },
  gray: { bg: 'bg-gray-100', text: 'text-gray-800', border: 'border-gray-300' },
};

const darkColorMap: { [key: string]: { bg: string, text: string, border: string } } = {
    blue: { bg: 'bg-blue-900/50', text: 'text-blue-300', border: 'border-blue-700' },
    green: { bg: 'bg-green-900/50', text: 'text-green-300', border: 'border-green-700' },
    purple: { bg: 'bg-purple-900/50', text: 'text-purple-300', border: 'border-purple-700' },
    red: { bg: 'bg-red-900/50', text: 'text-red-300', border: 'border-red-700' },
    yellow: { bg: 'bg-yellow-900/50', text: 'text-yellow-300', border: 'border-yellow-700' },
    gray: { bg: 'bg-gray-800', text: 'text-gray-300', border: 'border-gray-600' },
};


export default function Subjects() {
  const { subjects, addSubject } = useData();

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-left">Gestión de Materias</h1>
        <AddSubjectDialog addSubject={addSubject} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {subjects.map(subject => {
            const lightColor = colorMap[subject.color] || colorMap.gray;
            const darkColor = darkColorMap[subject.color] || darkColorMap.gray;

            return (
                <Card key={subject.id} className="flex flex-col">
                    <CardHeader>
                        <div className="flex justify-between items-start">
                            <div>
                                <CardTitle>{subject.name}</CardTitle>
                                <CardDescription>{subject.teacher}</CardDescription>
                            </div>
                            <Badge variant="outline" className={`
                                ${lightColor.bg} ${lightColor.text} ${lightColor.border}
                                dark:${darkColor.bg} dark:${darkColor.text} dark:${darkColor.border}
                            `}>
                                {subject.color}
                            </Badge>
                        </div>
                    </CardHeader>
                    <CardContent className="flex-grow">
                        <p className="text-sm text-muted-foreground">Créditos: {subject.credits}</p>
                    </CardContent>
                    <CardFooter className="flex justify-end gap-2">
                        <Button variant="outline" size="sm">
                            <Eye className="mr-2 h-4 w-4" />
                            Detalles
                        </Button>
                        <Button variant="ghost" size="icon">
                            <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </CardFooter>
                </Card>
            )
        })}
      </div>
    </div>
  );
}