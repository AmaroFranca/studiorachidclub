import React from "react";
import { Gift, Users, CircleDollarSign, Heart, ArrowRight } from "lucide-react";
import { SidebarProvider, Sidebar, SidebarTrigger } from "@/components/ui/sidebar";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import AppSidebar from "@/components/layout/AppSidebar";
import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/useProfile";
import { useReferrals } from "@/hooks/useReferrals";
import { useIsMobile } from "@/hooks/use-mobile";
import RewardsCarousel from "@/components/dashboard/RewardsCarousel";

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { profile, loading: profileLoading } = useProfile(user);
  const { referrals, loading: referralsLoading } = useReferrals(user);
  const isMobile = useIsMobile();
  
  const currentDate = new Date();
  const formattedDate = `${currentDate.getDate()} de ${getMonthName(currentDate.getMonth())} de ${currentDate.getFullYear()}`;
  const totalReferrals = referrals.length;
  const userPoints = profile?.points || 0;
  const progressPercentage = Math.min(userPoints / 1000 * 100, 100);

  // Determinar o nome a ser exibido
  const getUserDisplayName = () => {
    if (profile?.full_name && profile.full_name.trim() !== '') {
      return profile.full_name;
    }
    if (user?.email) {
      const emailName = user.email.split('@')[0];
      return emailName.split('.').map(part => part.charAt(0).toUpperCase() + part.slice(1)).join(' ');
    }
    return 'Usuário';
  };

  if (profileLoading || referralsLoading) {
    return <div className="flex items-center justify-center min-h-screen">
        <div className="text-[#737373]">Carregando...</div>
      </div>;
  }

  return (
    <SidebarProvider defaultOpen={!isMobile}>
      <div className="flex min-h-screen w-full">
        <Sidebar className="border-r bg-[#D9D9D9]">
          <AppSidebar activeSection="dashboard" />
        </Sidebar>
        
        <main className="flex-1 bg-[#EFEFEF] p-3 md:p-6">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex justify-between items-center mb-6 md:mb-10">
              <h2 className="text-lg md:text-2xl font-semibold text-[#737373]">
                Olá, {getUserDisplayName()}
              </h2>
              <div className="flex items-center gap-2 md:gap-4">
                <span className="text-xs md:text-sm text-[#737373]">{formattedDate}</span>
                {isMobile && (
                  <SidebarTrigger className="bg-[#B1C9C3] hover:bg-[#9fb9b2] text-[#737373] h-8 w-8 flex items-center justify-center rounded-md" />
                )}
              </div>
            </div>
            
            {/* Page Title */}
            <div className="text-center mb-6 md:mb-12">
              <h1 className="text-2xl md:text-4xl font-bold text-[#737373]">Studio Rachid Club</h1>
            </div>
            
            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {/* Stats Card */}
              <Card className="bg-[#D9D9D9] shadow-[10px_10px_15px_#737373] rounded-lg border-none">
                <CardContent className="p-4 md:p-6">
                  <div className="border border-[rgba(115,115,115,0.5)] rounded p-3 md:p-4 mb-4 md:mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center">
                        <h3 className="font-semibold text-base md:text-lg text-[#737373]">Sua Pontuação</h3>
                        <CircleDollarSign className="ml-2 text-[#BFA76F] h-4 w-4 md:h-5 md:w-5" />
                      </div>
                      <span className="font-semibold text-lg md:text-xl text-[#737373]">{userPoints}</span>
                    </div>
                    
                    <Progress value={progressPercentage} className="bg-[#737373] h-6 md:h-7 rounded">
                      <div className="bg-[#B1C9C3] h-full rounded" />
                    </Progress>
                    
                    <div className="flex justify-between text-xs mt-1 text-[#737373]">
                      <span>0</span>
                      <span>1000</span>
                    </div>
                    
                    <div className="flex justify-between items-center mt-3 md:mt-4">
                      <div className="flex items-center">
                        <h3 className="font-semibold text-base md:text-lg text-[#737373]">Indicados</h3>
                        <Users className="ml-2 text-[#BFA76F] h-4 w-4 md:h-5 md:w-5" />
                      </div>
                      <span className="font-semibold text-lg md:text-xl text-[#737373]">{totalReferrals}</span>
                    </div>
                  </div>
                  
                  {/* Rotating Prize/Experience section */}
                  <RewardsCarousel />
                  
                  <Link to="/rewards">
                    <Button className="w-full bg-[#B1C9C3] hover:bg-[#9fb9b2] text-[#737373] font-semibold flex gap-2 items-center justify-center py-3 px-4 mx-0 my-[5px] min-h-[44px] text-sm md:text-base">
                      <Gift className="text-[#BFA76F] h-4 w-4 md:h-5 md:w-5" />
                      <span className="text-center">Veja Todos os Prêmios e Resgate</span>
                    </Button>
                  </Link>
                </CardContent>
              </Card>
              
              {/* Indication Card */}
              <Card className="bg-gradient-to-br from-[#B1C9C3] to-black shadow-[10px_10px_15px_#737373] rounded-lg border-none">
                <CardContent className="p-4 md:p-6 text-white">
                  <div className="border border-white/60 rounded-lg p-3 md:p-4 mb-4 md:mb-6">
                    <div className="flex items-center mb-3 md:mb-4">
                      <Heart className="text-[#BFA76F] mr-2 h-5 w-5 md:h-6 md:w-6" />
                      <h3 className="font-semibold text-center text-xl md:text-2xl">Indique e Ganhe</h3>
                    </div>
                    
                    <h2 className="font-semibold mb-3 md:mb-4 text-left text-lg md:text-xl">Indique alguém especial e ganhem juntos.</h2>
                    
                    <p className="mb-3 md:mb-4 text-left text-sm md:text-lg">
                      Pontos pra você. Presente pra quem você indica.
                    </p>
                    <p className="mb-3 md:mb-4 text-left text-xs md:text-base leading-relaxed">
                      Você pode ganhar de 20 a 250 pontos por cada indicação e a pessoa indicada 
                      ganha um presente especial da clínica - um Checkup Digital e desconto na 
                      primeira profilaxia.
                    </p>
                    
                    <div className="flex items-center text-xs md:text-sm my-0 py-[20px] md:py-[30px]">
                      <ArrowRight className="h-4 w-4 md:h-5 md:w-5 text-[#BFA76F] mr-2" />
                      <Link to="/rules" className="text-xs md:text-sm hover:underline">Veja as regras do programa</Link>
                    </div>
                  </div>
                  
                  <Link to="/referrals">
                    <Button className="w-full bg-[#BFA76F] hover:bg-[#a99058] text-white font-bold py-3 px-4 min-h-[44px] text-sm md:text-base">
                      QUERO INDICAR AGORA!
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

// Helper function to get month name
function getMonthName(month: number): string {
  const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
  return months[month];
}

export default Dashboard;
