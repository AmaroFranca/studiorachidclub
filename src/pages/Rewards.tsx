
import React, { useState } from "react";
import { ArrowLeft, Users, CircleDollarSign, List, Settings, MessageSquare, Gift, Menu, LockOpen, Lock } from "lucide-react";
import { SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarFooter } from "@/components/ui/sidebar";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

const Rewards: React.FC = () => {
  const currentDate = new Date();
  const formattedDate = `${currentDate.getDate()} de ${getMonthName(currentDate.getMonth())} de ${currentDate.getFullYear()}`;
  
  // State for active submenu buttons
  const [activeMenu, setActiveMenu] = useState<string>("premios");
  
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full">
        <Sidebar className="border-r bg-[#D9D9D9]">
          <SidebarHeader className="flex items-center justify-between bg-[#d9d9d9] py-[30px] px-4 mx-0">
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-semibold text-[#737373] text-left">Studio Rachid</h1>
            </div>
          </SidebarHeader>
          
          <SidebarContent className="bg-[D9D9D9] bg-[#d9d9d9]">
            <SidebarMenu>
              <SidebarMenuItem>
                <Link to="/dashboard">
                  <SidebarMenuButton className="rounded-md text-[#737373] px-[15px] hover:bg-[#B1C9C3]">
                    <LayoutDashboard className="text-[#BFA76F]" />
                    <span>Painel</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton className="text-[#737373] bg-[#B1C9C3] px-[15px] rounded-md">
                  <Gift className="text-[#BFA76F]" />
                  <span>Recompensas</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              {/* Submenu buttons for Recompensas - now both are #BFA76F by default */}
              <div className="pl-10 flex flex-col gap-2 mt-2">
                <button 
                  className={`text-left text-sm font-medium text-[#BFA76F] hover:text-[#737373] transition-colors`}
                  onClick={() => setActiveMenu("premios")}
                >
                  Prêmios
                </button>
                <button 
                  className={`text-left text-sm font-medium text-[#BFA76F] hover:text-[#737373] transition-colors`}
                  onClick={() => setActiveMenu("experiencias")}
                >
                  Experiências
                </button>
              </div>
              
              <SidebarMenuItem>
                <Link to="#">
                  <SidebarMenuButton className="text-[#737373] hover:bg-[#B1C9C3] px-[15px]">
                    <Users className="text-[#BFA76F]" />
                    <span>Indicados</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <Link to="#">
                  <SidebarMenuButton className="text-[#737373] hover:bg-[#B1C9C3] px-[15px]">
                    <CircleDollarSign className="text-[#BFA76F]" />
                    <span>Resgates</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <Link to="#">
                  <SidebarMenuButton className="text-[#737373] hover:bg-[#B1C9C3] px-[15px]">
                    <List className="text-[#BFA76F]" />
                    <span>Regras</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          
          <SidebarFooter className="mt-auto bg-[#d9d9d9] py-[50px]">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton className="text-[#737373] hover:bg-[#B1C9C3] px-[15px]">
                  <Settings className="text-[#BFA76F]" />
                  <span>Configurações</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton className="text-[#737373] hover:bg-[#B1C9C3] px-[15px]">
                  <MessageSquare className="text-[#BFA76F]" />
                  <span>Suporte</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
        
        <main className="flex-1 bg-[#EFEFEF] p-6">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex justify-between items-center mb-10">
              <div className="flex items-center gap-2">
                <Link to="/dashboard" className="flex items-center gap-2 text-[#737373]">
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
              <h1 className="text-4xl font-bold text-[#737373]">Prêmios & Experiências</h1>
            </div>
            
            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Prêmios Card */}
              <div className="p-2">
                <Card className="bg-[#D9D9D9] shadow-[10px_10px_15px_#737373] rounded-lg border-none cursor-pointer hover:scale-[1.02] transition-transform">
                  <CardContent className="p-6 space-y-4">
                    <div className="overflow-hidden rounded-lg">
                      <img 
                        src="/lovable-uploads/e42401d8-7e5c-438f-91d6-fd4258971e1a.png" 
                        alt="Amazon Echo" 
                        className="w-full h-80 object-cover rounded-lg"
                      />
                    </div>
                    <div className="space-y-3 text-left">
                      <div className="flex justify-between items-center">
                        <h3 className="font-semibold text-lg text-[#737373]">Prêmios</h3>
                        <div className="flex items-center gap-1">
                          <LockOpen className="w-4 h-4 text-[#BFA76F]" />
                          <span className="text-xs text-[#BFA76F]">Desbloqueados</span>
                        </div>
                      </div>
                      <p className="text-[#737373]">Troque seus pontos por itens selecionados.</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Experiências Card */}
              <div className="p-2">
                <Card className="bg-[#D9D9D9] shadow-[10px_10px_15px_#737373] rounded-lg border-none cursor-pointer hover:scale-[1.02] transition-transform">
                  <CardContent className="p-6 space-y-4">
                    <div className="overflow-hidden rounded-lg">
                      <img 
                        src="/lovable-uploads/6f9fe101-345e-4ad3-8226-720ffa3f2f43.png" 
                        alt="Spa Experience" 
                        className="w-full h-80 object-cover rounded-lg grayscale"
                      />
                    </div>
                    <div className="space-y-3 text-left">
                      <div className="flex justify-between items-center">
                        <h3 className="font-semibold text-lg text-[#737373]">Studio Rachid Experience</h3>
                        <div className="flex items-center gap-1">
                          <Lock className="w-4 h-4 text-[#BFA76F]" />
                          <span className="text-xs text-[#BFA76F]">Bloqueados</span>
                        </div>
                      </div>
                      <p className="text-[#737373]">Acumule 1000 pontos para desbloquear</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
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

// Missing component import
const LayoutDashboard = ({ className }: { className?: string }) => {
  return <div className={className}><Menu /></div>;
};

export default Rewards;
