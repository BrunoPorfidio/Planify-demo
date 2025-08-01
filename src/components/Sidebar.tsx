import { NavLink } from "react-router-dom";
import { BookOpen, Calendar, Clock, GraduationCap, LayoutDashboard } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navItems = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/schedule", label: "Horario", icon: Clock },
  { to: "/calendar", label: "Calendario", icon: Calendar },
  { to: "/subjects", label: "Materias", icon: BookOpen },
  { to: "/study-planner", label: "Plan de Estudio", icon: GraduationCap },
];

export function Sidebar({ className }: { className?: string }) {
  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Academia
          </h2>
          <div className="space-y-1">
            {navItems.map((item) => (
              <Button
                key={item.label}
                asChild
                variant="ghost"
                className="w-full justify-start"
              >
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center",
                      isActive ? "bg-accent text-accent-foreground" : ""
                    )
                  }
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.label}
                </NavLink>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}