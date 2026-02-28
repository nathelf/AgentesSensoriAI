import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SalesProvider } from "@/context/SalesContext";
import Layout from "@/components/Layout";
import Dashboard from "@/pages/Dashboard";
import ChatSimulator from "@/pages/ChatSimulator";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <SalesProvider>
        <Toaster />
        <Sonner position="top-right" toastOptions={{ className: "glass-card border-primary/20" }} />
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/chat" element={<ChatSimulator />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </SalesProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
