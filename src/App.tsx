
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Rewards from "./pages/Rewards";
import Prizes from "./pages/Prizes";
import Experiences from "./pages/Experiences";
import Referrals from "./pages/Referrals";
import RedeemPrizes from "./pages/RedeemPrizes";
import RedeemExperiences from "./pages/RedeemExperiences";
import Rules from "./pages/Rules";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/rewards" element={<Rewards />} />
          <Route path="/prizes" element={<Prizes />} />
          <Route path="/experiences" element={<Experiences />} />
          <Route path="/referrals" element={<Referrals />} />
          <Route path="/redeem-prizes" element={<RedeemPrizes />} />
          <Route path="/redeem-experiences" element={<RedeemExperiences />} />
          <Route path="/rules" element={<Rules />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
