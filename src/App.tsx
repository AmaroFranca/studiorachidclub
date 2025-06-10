
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Index from './pages/Index';
import RedeemPrizes from './pages/RedeemPrizes';
import Referrals from './pages/Referrals';
import NotFound from './pages/NotFound';
import { Toaster } from "@/components/ui/toaster"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Add new import for admin routes
import ProtectedAdminRoute from './components/admin/ProtectedAdminRoute';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminUsers from './pages/admin/AdminUsers';

// Import missing pages
import Rewards from './pages/Rewards';
import Prizes from './pages/Prizes';
import Experiences from './pages/Experiences';
import RedeemExperiences from './pages/RedeemExperiences';
import Rules from './pages/Rules';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <div className="min-h-screen bg-gray-50">
          <Toaster />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/redeem-prizes" element={<RedeemPrizes />} />
              <Route path="/referrals" element={<Referrals />} />
              
              {/* Restored missing routes */}
              <Route path="/rewards" element={<Rewards />} />
              <Route path="/prizes" element={<Prizes />} />
              <Route path="/experiences" element={<Experiences />} />
              <Route path="/redeem-experiences" element={<RedeemExperiences />} />
              <Route path="/rules" element={<Rules />} />
              
              {/* Admin Routes */}
              <Route 
                path="/admin" 
                element={
                  <ProtectedAdminRoute>
                    <AdminDashboard />
                  </ProtectedAdminRoute>
                } 
              />
              <Route 
                path="/admin/users" 
                element={
                  <ProtectedAdminRoute>
                    <AdminUsers />
                  </ProtectedAdminRoute>
                } 
              />
              
              {/* Not Found Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </div>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
