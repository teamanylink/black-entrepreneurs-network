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

// Protected Route component with improved logic
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { session } = useAuth();
  const location = useLocation();

  if (!session) {
    // Save the attempted URL for redirect after login
    return <Navigate to="/" state={{ from: location.pathname }} replace />;
  }

  return <>{children}</>;
};

// Auth wrapper to handle authentication state and redirects
const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  const { session } = useAuth();
  const location = useLocation();
  
  // If user is authenticated and trying to access the index page,
  // redirect them to dashboard
  if (session && location.pathname === '/') {
    return <Navigate to="/dashboard" replace />;
  }
  
  return <>{children}</>;
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthWrapper>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Index />} />
              <Route path="/opportunities" element={<Opportunities />}>
                <Route path=":id" element={<OpportunityDetails />} />
              </Route>

              {/* Protected Routes */}
              <Route
                path="/onboarding"
                element={
                  
                    <Onboarding />
               
                }
              />

              <Route
                path="/opportunities"
                element={
                 
                    <Opportunities />
                 
                }
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
          </AuthWrapper>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;