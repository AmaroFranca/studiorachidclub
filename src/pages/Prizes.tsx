
import React from "react";
import { Sidebar, SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import PrizeCard from "@/components/prizes/PrizeCard";
import AppSidebar from "@/components/layout/AppSidebar";
import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/useProfile";
import { useRewards } from "@/hooks/useRewards";
import StandardHeader from "@/components/layout/StandardHeader";
import { useIsMobile } from "@/hooks/use-mobile";

const Prizes: React.FC = () => {
  const { user } = useAuth();
  const { profile, loading: profileLoading } = useProfile(user);
  const { prizes, loading: prizesLoading } = useRewards();
  const isMobile = useIsMobile();
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
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          {!isMobile && (
            <Sidebar className="border-r bg-[#D9D9D9]">
              <AppSidebar activeSection="prizes" />
            </Sidebar>
          )}
          
          <SidebarInset className="flex-1 bg-[#EFEFEF] p-3 md:p-6">
            <div className="content-container">
              <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-[#737373] text-base md:text-lg">Carregando catálogo...</div>
              </div>
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    );
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        {!isMobile && (
          <Sidebar className="border-r bg-[#D9D9D9]">
            <AppSidebar activeSection="prizes" />
          </Sidebar>
        )}
        
        <SidebarInset className="flex-1 bg-[#EFEFEF] p-3 md:p-6">
          <div className="content-container my-[30px]">
            <StandardHeader title="Catálogo de Prêmios" backLink="/rewards" />
            
            {/* Prize Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-10">
              {prizes.length > 0 ? (
                prizes.map(prize => (
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
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Prizes;
