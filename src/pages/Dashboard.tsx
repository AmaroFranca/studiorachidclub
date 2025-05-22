
import React from "react";
import { Gift, Users, CircleDollarSign, Heart, ArrowRight } from "lucide-react";
import { SidebarProvider, Sidebar } from "@/components/ui/sidebar";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import AppSidebar from "@/components/layout/AppSidebar";

const Dashboard: React.FC = () => {
  const currentDate = new Date();
  const formattedDate = `${currentDate.getDate()} de ${getMonthName(currentDate.getMonth())} de ${currentDate.getFullYear()}`;
  
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full">
        <Sidebar className="border-r bg-[#D9D9D9]">
          <AppSidebar activeSection="dashboard" />
        </Sidebar>
        
        <main className="flex-1 bg-[#EFEFEF] p-6">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-2xl font-semibold text-[#737373]">Olá, Amaro</h2>
              <div className="flex items-center gap-4">
                <span className="text-sm text-[#737373]">{formattedDate}</span>
              </div>
            </div>
            
            {/* Page Title */}
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-[#737373]">Studio Rachid Club</h1>
            </div>
            
            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Stats Card */}
              <Card className="bg-[#D9D9D9] shadow-[10px_10px_15px_#737373] rounded-lg border-none">
                <CardContent className="p-6">
                  <div className="border border-[rgba(115,115,115,0.5)] rounded p-4 mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center">
                        <h3 className="font-semibold text-lg text-[#737373]">Sua Pontuação</h3>
                        <CircleDollarSign className="ml-2 text-[#BFA76F] h-5 w-5" />
                      </div>
                      <span className="font-semibold text-xl text-[#737373]">270</span>
                    </div>
                    
                    <Progress value={27} className="bg-[#737373] h-7 rounded">
                      <div className="bg-[#B1C9C3] h-full rounded" />
                    </Progress>
                    
                    <div className="flex justify-between text-xs mt-1 text-[#737373]">
                      <span>0</span>
                      <span>1000</span>
                    </div>
                    
                    <div className="flex justify-between items-center mt-4">
                      <div className="flex items-center">
                        <h3 className="font-semibold text-lg text-[#737373]">Indicados</h3>
                        <Users className="ml-2 text-[#BFA76F] h-5 w-5" />
                      </div>
                      <span className="font-semibold text-xl text-[#737373]">3</span>
                    </div>
                  </div>
                  
                  {/* Prize section */}
                  <div className="border border-[rgba(115,115,115,0.5)] rounded p-4 mb-6 py-[10px]">
                    <div className="flex gap-5 py-0 my-0">
                      <img alt="Copo Térmico" className="w-40 h-40 object-cover rounded shadow-md" src="/lovable-uploads/18579148-cc6d-439b-b115-3d26c0b4a45a.png" />
                      <div className="px-0 py-[50px]">
                        <h3 className="font-semibold text-[#737373] text-left">Copo Térmico 1,2L</h3>
                        <p className="font-semibold text-[#bfa76f]">Faltam: xxx pontos</p>
                      </div>
                    </div>
                  </div>
                  
                  <Link to="/rewards">
                    <Button className="w-full bg-[#B1C9C3] hover:bg-[#9fb9b2] text-[#737373] font-semibold flex gap-2 items-center justify-center py-3 px-4 mx-0 my-[5px]">
                      <Gift className="text-[#BFA76F]" />
                      Veja Todos os Prêmios e Resgate
                    </Button>
                  </Link>
                </CardContent>
              </Card>
              
              {/* Indication Card */}
              <Card className="bg-gradient-to-br from-[#B1C9C3] to-black shadow-[10px_10px_15px_#737373] rounded-lg border-none">
                <CardContent className="p-6 text-white">
                  <div className="border border-white/60 rounded-lg p-4 mb-6">
                    <div className="flex items-center mb-4">
                      <Heart className="text-[#BFA76F] mr-2 " />
                      <h3 className="font-semibold text-center text-4xl">Indique e Ganhe</h3>
                    </div>
                    
                    <h2 className="font-semibold mb-4 text-left text-2xl">Indique alguém especial e ganhem juntos.</h2>
                    
                    <p className="mb-4 text-left text-xl">
                      Pontos pra você. Presente pra quem você indica.
                    </p>
                    <p className="mb-4 text-left text-lg">
                      Você pode ganhar de 20 a 250 pontos por cada indicação e a pessoa indicada 
                      ganha um presente especial da clínica - um Checkup Digital e desconto na 
                      primeira profilaxia.
                    </p>
                    
                    <div className="flex items-center text-sm my-0 py-[30px]">
                      <ArrowRight className="h-5 w-5 text-[#BFA76F] mr-2" />
                      <Link to="/rules" className="text-sm hover:underline">Veja as regras do programa</Link>
                    </div>
                  </div>
                  
                  <Link to="/referrals">
                    <Button className="w-full bg-[#BFA76F] hover:bg-[#a99058] text-white font-bold py-3 px-4">
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
