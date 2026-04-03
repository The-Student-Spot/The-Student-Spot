
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import ScrollToTop from "@/components/ScrollToTop";
import Index from "@/pages/Index";
import About from "@/pages/About";
import Students from "@/pages/Students";
import Colleges from "@/pages/Colleges";
import Companies from "@/pages/Companies";
import Startups from "@/pages/Startups";
import Incubators from "@/pages/Incubators";
import Opportunities from "@/pages/Opportunities";
import GetInvolved from "@/pages/GetInvolved";
import CoachingPartners from "@/pages/CoachingPartners";
import Contact from "@/pages/Contact";
import Auth from "@/pages/Auth";
import Login from "@/pages/Login";
import Privacy from "@/pages/Privacy";
import Terms from "@/pages/Terms";
import NotFound from "@/pages/NotFound";
import StudentDashboard from "@/pages/StudentDashboard";
import EntrepreneurDashboard from "@/pages/EntrepreneurDashboard";
import CollegeDashboard from "@/pages/CollegeDashboard";
import CompanyDashboard from "@/pages/CompanyDashboard";
import IncubatorDashboard from "@/pages/IncubatorDashboard";
import FloatingSocials from "./components/home/FloatingSocials";
import ProtectedRoute from "@/components/auth/ProtectedRoute";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <FloatingSocials />
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/students" element={<Students />} />
            <Route path="/colleges" element={<Colleges />} />
            <Route path="/companies" element={<Companies />} />
            <Route path="/startups" element={<Startups />} />
            <Route path="/incubators" element={<Incubators />} />
            <Route path="/opportunities" element={<Opportunities />} />
            <Route path="/get-involved" element={<GetInvolved />} />
            <Route path="/ecosystem-partnerships" element={<CoachingPartners />} />
            <Route path="/coaching-partners" element={<CoachingPartners />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/login" element={<Login />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/student-dashboard" element={<ProtectedRoute allowedRoles={["student"]}><StudentDashboard /></ProtectedRoute>} />
            <Route path="/dashboard/:section" element={<ProtectedRoute allowedRoles={["student"]}><StudentDashboard /></ProtectedRoute>} />
            <Route path="/dashboard" element={<ProtectedRoute allowedRoles={["student"]}><StudentDashboard /></ProtectedRoute>} />
            <Route path="/entrepreneur-dashboard" element={<ProtectedRoute allowedRoles={["startup", "entrepreneur"]}><EntrepreneurDashboard /></ProtectedRoute>} />
            <Route path="/entrepreneur-dashboard/:section" element={<ProtectedRoute allowedRoles={["startup", "entrepreneur"]}><EntrepreneurDashboard /></ProtectedRoute>} />
            <Route path="/college-dashboard" element={<ProtectedRoute allowedRoles={["college"]}><CollegeDashboard /></ProtectedRoute>} />
            <Route path="/college-dashboard/:section" element={<ProtectedRoute allowedRoles={["college"]}><CollegeDashboard /></ProtectedRoute>} />
            <Route path="/incubator-dashboard" element={<ProtectedRoute allowedRoles={["incubator"]}><IncubatorDashboard /></ProtectedRoute>} />
            <Route path="/incubator-dashboard/:section" element={<ProtectedRoute allowedRoles={["incubator"]}><IncubatorDashboard /></ProtectedRoute>} />
            <Route path="/company-dashboard" element={<ProtectedRoute allowedRoles={["company"]}><CompanyDashboard /></ProtectedRoute>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
