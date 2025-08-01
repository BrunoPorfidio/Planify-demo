import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SharedLayout } from "./components/SharedLayout";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import PlaceholderPage from "./pages/PlaceholderPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<SharedLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/schedule" element={<PlaceholderPage title="Horario" />} />
            <Route path="/calendar" element={<PlaceholderPage title="Calendario" />} />
            <Route path="/subjects" element={<PlaceholderPage title="Materias" />} />
            <Route path="/study-planner" element={<PlaceholderPage title="Plan de Estudio" />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;