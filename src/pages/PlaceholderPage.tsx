import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const PlaceholderPage = ({ title }: { title: string }) => {
  return (
    <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
      <div className="flex flex-col items-center gap-1 text-center">
        <h3 className="text-2xl font-bold tracking-tight">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground">
          Esta sección está en construcción. ¡Vuelve pronto!
        </p>
      </div>
    </div>
  );
};

export default PlaceholderPage;