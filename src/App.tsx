import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import Dashboard from "./pages/Dashboard";
import Opportunities from "./pages/Opportunities";
import OpportunityDetails from "./pages/OpportunityDetails";
import Onboarding from "./pages/Onboarding";
import Community from "./pages/Community";
import Chat from "./pages/Chat";

const queryClient = new QueryClient();

// Protected Route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { session } = useAuth();
  console.log("Protected Route - Session:", session); // Debug log
  
  if (!session) {
    console.log("No session, redirecting to home"); // Debug log
    return <Navigate to="/" replace />;
  }
  
  console.log("Session exists, rendering protected content"); // Debug log
  return <>{children}</>;
};

// Protected Onboarding Route component
const ProtectedOnboardingRoute = ({ children }: { children: React.ReactNode }) => {
  const { session } = useAuth();
  console.log("Protected Onboarding Route - Session:", session); // Debug log
  
  if (!session) {
    console.log("No session, redirecting to home"); // Debug log
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};

const App = () => {
  const { session } = useAuth();
  console.log("App Component - Session:", session); // Debug log

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Dashboard />} />
            <Route path="/opportunities" element={<Opportunities />}>
              <Route path=":id" element={<OpportunityDetails />} />
            </Route>
            
            {/* Protected Onboarding Route */}
            <Route
              path="/onboarding"
              element={
                <ProtectedOnboardingRoute>
                  <Onboarding />
                </ProtectedOnboardingRoute>
              }
            />
            
            {/* Dashboard Routes - Some features protected */}
            <Route path="/dashboard" element={<Dashboard />}>
              <Route
                path="community"
                element={
                  <ProtectedRoute>
                    <Community />
                  </ProtectedRoute>
                }
              />
              <Route
                path="chat"
                element={
                  <ProtectedRoute>
                    <Chat />
                  </ProtectedRoute>
                }
              />
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