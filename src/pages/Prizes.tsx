
import React from "react";
import { ArrowLeft } from "lucide-react";
import { SidebarProvider, Sidebar } from "@/components/ui/sidebar";
import { Link } from "react-router-dom";
import PrizeCard from "@/components/prizes/PrizeCard";
import AppSidebar from "@/components/layout/AppSidebar";
import { getFormattedDate } from "@/utils/dateUtils";
import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/useProfile";
import { useRewards } from "@/hooks/useRewards";

const Prizes: React.FC = () => {
  const formattedDate = getFormattedDate();
  const { user } = useAuth();
  const { profile, loading: profileLoading } = useProfile(user);
  const { prizes, loading: prizesLoading } = useRewards();
  
  const userPoints = profile?.points || 0;
  
  React.useEffect(() => {
    // Log available prizes on component mount for debugging
    if (prizes && prizes.length > 0) {
      console.log('Available prizes:', prizes);
    }
  }, [prizes]);
  
  // Show loading state
  if (profileLoading || prizesLoading) {
    return (
      <SidebarProvider defaultOpen={true}>
        <div className="flex min-h-screen w-full">
          <Sidebar className="border-r bg-[#D9D9D9]">
            <AppSidebar activeSection="prizes" />
          </Sidebar>
          
          <main className="flex-1 bg-[#EFEFEF] p-6">
            <div className="content-container">
              <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-[#737373] text-lg">Carregando catálogo...</div>
              </div>
            </div>
          </main>
        </div>
      </SidebarProvider>
    );
  }
  
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full">
        <Sidebar className="border-r bg-[#D9D9D9]">
          <AppSidebar activeSection="prizes" />
        </Sidebar>
        
        <main className="flex-1 bg-[#EFEFEF] p-6">
          <div className="content-container">
            {/* Header */}
            <div className="flex justify-between items-center mb-10">
              <div className="flex items-center gap-2">
                <Link to="/rewards" className="flex items-center gap-2 text-[#737373]">
                  <ArrowLeft className="text-[#BFA76F]" />
                  <span className="text-xl font-semibold">Voltar</span>
                </Link>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-[#737373]">{formattedDate}</span>
              </div>
            </div>
            
            {/* Page Title */}
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-[#737373]">Catálogo de Prêmios</h1>
            </div>
            
            {/* Prize Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-10">
              {prizes.length > 0 ? (
                prizes.map((prize) => (
                  <PrizeCard 
                    key={prize.id}
                    name={prize.name}
                    image={prize.image_url}
                    points={prize.points}
                    userPoints={userPoints}
                  />
                ))
              ) : (
                <div className="col-span-3 text-center py-10">
                  <p className="text-[#737373]">Nenhum prêmio disponível no momento.</p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Prizes;
