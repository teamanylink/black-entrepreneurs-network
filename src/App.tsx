import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Opportunities from "./pages/Opportunities";
import OpportunityDetails from "./pages/OpportunityDetails";
import Onboarding from "./pages/Onboarding";
import Dashboard from "./pages/Dashboard";
import Community from "./pages/Community";
import Chat from "./pages/Chat";
import Jobs from "./pages/Jobs";
import Ventures from "./pages/Ventures";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/opportunities" element={<Opportunities />}>
              <Route path=":id" element={<OpportunityDetails />} />
            </Route>
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/dashboard" element={<Dashboard />}>
              <Route path="jobs" element={<Jobs />} />
              <Route path="ventures" element={<Ventures />} />
              <Route path="opportunities" element={<Opportunities />} />
              <Route path="community" element={<Community />} />
              <Route path="chat" element={<Chat />} />
            </Route>
            {/* Catch-all redirect */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;