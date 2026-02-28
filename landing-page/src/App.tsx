import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SalesProvider } from "@/context/SalesContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import DashboardLayout from "./components/DashboardLayout";
import DashboardPage from "./pages/DashboardPage";
import ChatSimulatorPage from "./pages/ChatSimulatorPage";
import CheckoutOrPlanos from "./pages/CheckoutOrPlanos";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/demonstracao" element={<SalesProvider><DashboardLayout /></SalesProvider>}>
            <Route index element={<DashboardPage />} />
            <Route path="chat" element={<ChatSimulatorPage />} />
          </Route>
          <Route path="/planos" element={<CheckoutOrPlanos />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
