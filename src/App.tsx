import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
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

// Protected Route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { session } = useAuth();
  const location = useLocation();

  console.log("Protected Route Check - Current Path:", location.pathname);
  console.log("Protected Route - Session Status:", !!session);

  if (!session) {
    console.log("No session found, redirecting to home");
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  console.log("Session verified, rendering protected content");
  return <>{children}</>;
};

const App = () => {
  const { session } = useAuth();
  console.log("App Component - Session:", session);

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

            {/* Protected Routes */}
            <Route
              path="/onboarding"
              element={<Onboarding />}
            />
            
            <Route
              path="/dashboard/*"
              element={<Dashboard />}
            >
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
