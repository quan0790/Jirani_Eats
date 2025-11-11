import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "sonner";
import { AuthProvider, useAuth } from "@/context/AuthContext";

// Pages
import Index from "./pages/Index";
import About from "./pages/About";
import HowItWorks from "./pages/HowItWorks";
import Gallery from "./pages/Gallery";
import Contacts from "./pages/Contacts";
import Dashboard from "./pages/Dashboard";
import DonateFood from "./pages/DonateFood";
import RequestFood from "./pages/RequestFood";
import AddFood from "./pages/AddFood";
import FoodList from "./pages/FoodList";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import Legal from "./pages/Legal";
import Account from "./pages/Account";
import BrowseDonations from "@/pages/BrowseDonations";

// React Query client
const queryClient = new QueryClient();

// Protected Route Component
const ProtectedRoute = ({ children, role }) => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/auth" replace />;
  if (role && user.role !== role) return <Navigate to="/dashboard" replace />;

  return children;
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <AuthProvider>
            <Toaster position="top-right" />

            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/how-it-works" element={<HowItWorks />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/legal" element={<Legal />} />
              <Route path="/auth" element={<Auth />} />

              {/* Protected Routes */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/account"
                element={
                  <ProtectedRoute>
                    <Account />
                  </ProtectedRoute>
                }
              />

              {/* Donor-only Routes */}
              <Route
                path="/add-food"
                element={
                  <ProtectedRoute role="donor">
                    <AddFood />
                  </ProtectedRoute>
                }
              />

              {/* Receiver-only Routes */}
              <Route
                path="/dashboard/browse-donations"
                element={
                  <ProtectedRoute role="receiver">
                    <BrowseDonations />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/request-food/:id"
                element={
                  <ProtectedRoute role="receiver">
                    <RequestFood />
                  </ProtectedRoute>
                }
              />

              {/* Both Roles */}
              <Route
                path="/donate-food"
                element={
                  <ProtectedRoute>
                    <DonateFood />
                  </ProtectedRoute>
                }
              />

              {/* Optional Requests Page */}
              <Route
                path="/requests"
                element={
                  <ProtectedRoute role="receiver">
                    <RequestFood />
                  </ProtectedRoute>
                }
              />

              {/* 404 Page */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
