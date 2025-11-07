import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/context/AuthContext"; // ✅ Import AuthProvider

// Import your pages
import Index from "./pages/Index";
import About from "./pages/About";
import HowItWorks from "./pages/HowItWorks";
import Gallery from "./pages/Gallery";
import Contacts from "./pages/Contacts";
import Dashboard from "./pages/Dashboard";
import DonateFood from "./pages/DonateFood";
import RequestFood from "./pages/RequestFood";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import Legal from "./pages/Legal";
import Account from "@/pages/Account"; // ✅ Ensure this import is correct

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />

        {/* ✅ BrowserRouter wraps AuthProvider for global context */}
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/how-it-works" element={<HowItWorks />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/contact-support" element={<Contacts />} />
              <Route path="/legal" element={<Legal />} />

              {/* Auth routes */}
              <Route path="/auth" element={<Auth />} />

              {/* Protected routes */}
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/account" element={<Account />} /> {/* ✅ Added */}
              <Route path="/donate-food" element={<DonateFood />} />
              <Route path="/request-food" element={<RequestFood />} />

              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
