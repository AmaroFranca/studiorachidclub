
import React from "react";
import { ArrowLeft, Users, CircleDollarSign, List, Settings, MessageSquare, Gift, Menu, LockOpen } from "lucide-react";
import { SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarFooter } from "@/components/ui/sidebar";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";

const Prizes: React.FC = () => {
  const currentDate = new Date();
  const formattedDate = `${currentDate.getDate()} de ${getMonthName(currentDate.getMonth())} de ${currentDate.getFullYear()}`;
  
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
                <Link to="/rewards">
                  <SidebarMenuButton className="text-[#737373] bg-[#B1C9C3] px-[15px] rounded-md">
                    <Gift className="text-[#BFA76F]" />
                    <span>Recompensas</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
              
              {/* Submenu buttons for Recompensas */}
              <div className="pl-10 flex flex-col gap-2 mt-2">
                <Link to="/prizes">
                  <button 
                    className="text-left text-sm font-medium text-[#737373] hover:text-[#737373] transition-colors"
                  >
                    Prêmios
                  </button>
                </Link>
                <button 
                  className="text-left text-sm font-medium text-[#BFA76F] hover:text-[#737373] transition-colors"
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
            
            {/* Prize Cards Grid - 2 rows of 3 cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Prize Card 1 - Copo 500ml */}
              <Card className="flex h-32 bg-[#D9D9D9] shadow-[10px_10px_15px_#737373] rounded-lg border-none overflow-hidden">
                <div className="w-[132px] h-full">
                  <img 
                    src="/lovable-uploads/1d7f27da-bcf5-4547-9b79-2a6d1f4865ea.png"
                    alt="Copo Térmico 500ml" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col flex-1 p-4">
                  <div className="flex items-center mb-2">
                    <LockOpen className="w-4 h-4 text-[#BFA76F] mr-1" />
                    <span className="text-xs font-medium text-[#BFA76F]">Desbloqueado</span>
                  </div>
                  <h3 className="font-semibold text-sm text-[#737373] text-left">Copo Térmico inox c/ tampa 500 ml</h3>
                  <p className="font-bold text-sm text-[#BFA76F] mt-1 text-left">100 pontos</p>
                  <p className="font-semibold text-xs text-[#737373] mt-1 text-left">Resgatar</p>
                </div>
              </Card>
              
              {/* Prize Card 2 - Copo 1,2L */}
              <Card className="flex h-32 bg-[#D9D9D9] shadow-[10px_10px_15px_#737373] rounded-lg border-none overflow-hidden">
                <div className="w-[132px] h-full">
                  <img 
                    src="/lovable-uploads/b6d09a9c-6e5c-4d2f-ac1e-fcf6ceaeefbd.png"
                    alt="Copo Térmico 1,2L" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col flex-1 p-4">
                  <div className="flex items-center mb-2">
                    <LockOpen className="w-4 h-4 text-[#BFA76F] mr-1" />
                    <span className="text-xs font-medium text-[#BFA76F]">Desbloqueado</span>
                  </div>
                  <h3 className="font-semibold text-sm text-[#737373] text-left">Copo Térmico 1,2L</h3>
                  <p className="font-bold text-sm text-[#BFA76F] mt-1 text-left">150 pontos</p>
                  <p className="font-semibold text-xs text-[#737373] mt-1 text-left">Resgatar</p>
                </div>
              </Card>
              
              {/* Prize Card 3 - Cinemark */}
              <Card className="flex h-32 bg-[#D9D9D9] shadow-[10px_10px_15px_#737373] rounded-lg border-none overflow-hidden">
                <div className="w-[132px] h-full">
                  <img 
                    src="/lovable-uploads/0cae2b39-8129-4da7-8c68-a0a2342d5bf5.png"
                    alt="Ingressos Cinemark" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col flex-1 p-4">
                  <div className="flex items-center mb-2">
                    <LockOpen className="w-4 h-4 text-[#BFA76F] mr-1" />
                    <span className="text-xs font-medium text-[#BFA76F]">Desbloqueado</span>
                  </div>
                  <h3 className="font-semibold text-sm text-[#737373] text-left">2 Ingressos para o Cinema</h3>
                  <p className="font-bold text-sm text-[#BFA76F] mt-1 text-left">200 pontos</p>
                  <p className="font-semibold text-xs text-[#737373] mt-1 text-left">Resgatar</p>
                </div>
              </Card>
              
              {/* Prize Card 4 - Outback */}
              <Card className="flex h-32 bg-[#D9D9D9] shadow-[10px_10px_15px_#737373] rounded-lg border-none overflow-hidden">
                <div className="w-[132px] h-full">
                  <img 
                    src="/lovable-uploads/df66f7b5-06d3-42d3-89ff-19622d6b8f8f.png"
                    alt="Gift Card Outback" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col flex-1 p-4">
                  <div className="flex items-center mb-2">
                    <LockOpen className="w-4 h-4 text-[#BFA76F] mr-1" />
                    <span className="text-xs font-medium text-[#BFA76F]">Desbloqueado</span>
                  </div>
                  <h3 className="font-semibold text-sm text-[#737373] text-left">Gift Card Outback</h3>
                  <p className="font-bold text-sm text-[#BFA76F] mt-1 text-left">400 pontos</p>
                  <p className="font-semibold text-xs text-[#737373] mt-1 text-left">Faltam: 130 pontos</p>
                </div>
              </Card>
              
              {/* Prize Card 5 - Escova */}
              <Card className="flex h-32 bg-[#D9D9D9] shadow-[10px_10px_15px_#737373] rounded-lg border-none overflow-hidden">
                <div className="w-[132px] h-full">
                  <img 
                    src="/lovable-uploads/0c6054b2-ce8f-4db3-8229-b5fa253ccce7.png"
                    alt="Escova Elétrica" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col flex-1 p-4">
                  <div className="flex items-center mb-2">
                    <LockOpen className="w-4 h-4 text-[#BFA76F] mr-1" />
                    <span className="text-xs font-medium text-[#BFA76F]">Desbloqueado</span>
                  </div>
                  <h3 className="font-semibold text-sm text-[#737373] text-left">Escova Elétrica Philips Sonic Pro 50</h3>
                  <p className="font-bold text-sm text-[#BFA76F] mt-1 text-left">750 pontos</p>
                  <p className="font-semibold text-xs text-[#737373] mt-1 text-left">Faltam: 480 pontos</p>
                </div>
              </Card>
              
              {/* Prize Card 6 - Alexa */}
              <Card className="flex h-32 bg-[#D9D9D9] shadow-[10px_10px_15px_#737373] rounded-lg border-none overflow-hidden">
                <div className="w-[132px] h-full">
                  <img 
                    src="/lovable-uploads/8ee045bc-a834-4510-8ac3-548896e0a4ca.png"
                    alt="Alexa Echo Dot" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col flex-1 p-4">
                  <div className="flex items-center mb-2">
                    <LockOpen className="w-4 h-4 text-[#BFA76F] mr-1" />
                    <span className="text-xs font-medium text-[#BFA76F]">Desbloqueado</span>
                  </div>
                  <h3 className="font-semibold text-sm text-[#737373] text-left">Alexa Echo Dot</h3>
                  <p className="font-bold text-sm text-[#BFA76F] mt-1 text-left">900 pontos</p>
                  <p className="font-semibold text-xs text-[#737373] mt-1 text-left">Faltam: 630 pontos</p>
                </div>
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

// Missing component import
const LayoutDashboard = ({ className }: { className?: string }) => {
  return <div className={className}><Menu /></div>;
};

export default Prizes;
