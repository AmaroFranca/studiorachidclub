
import React from "react";
import { Link } from "react-router-dom";
import { Users, CircleDollarSign, List, Settings, MessageSquare, Gift, LayoutDashboard } from "lucide-react";
import { SidebarHeader, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarFooter } from "@/components/ui/sidebar";

interface AppSidebarProps {
  activeSection?: "dashboard" | "rewards" | "prizes" | "experiences";
}

const AppSidebar: React.FC<AppSidebarProps> = ({ activeSection }) => {
  return (
    <>
      <SidebarHeader className="flex items-center justify-between bg-[#d9d9d9] py-[30px] px-4 mx-0">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-semibold text-[#737373] text-left">Studio Rachid</h1>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="bg-[D9D9D9] bg-[#d9d9d9]">
        <SidebarMenu>
          <SidebarMenuItem>
            <Link to="/dashboard">
              <SidebarMenuButton className={`rounded-md text-[#737373] px-[15px] ${activeSection === "dashboard" ? "bg-[#B1C9C3]" : "hover:bg-[#B1C9C3]"}`}>
                <DashboardIcon className="text-[#BFA76F]" />
                <span>Painel</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
          
          <SidebarMenuItem>
            <Link to="/rewards">
              <SidebarMenuButton className={`text-[#737373] px-[15px] rounded-md ${activeSection === "rewards" || activeSection === "prizes" || activeSection === "experiences" ? "bg-[#B1C9C3] hover:bg-[#B1C9C3]" : "hover:bg-[#B1C9C3]"}`}>
                <Gift className="text-[#BFA76F]" />
                <span>Recompensas</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
          
          {(activeSection === "rewards" || activeSection === "prizes" || activeSection === "experiences") && (
            <div className="flex flex-col gap-2 mt-2">
              <Link to="/prizes">
                <SidebarMenuButton 
                  className={`text-left text-sm font-medium pl-[44px] ${activeSection === "prizes" ? "text-[#737373]" : "text-[#BFA76F]"} hover:text-[#737373] transition-colors rounded-md`}
                >
                  <span>Prêmios</span>
                </SidebarMenuButton>
              </Link>
              <Link to="/experiences">
                <SidebarMenuButton 
                  className={`text-left text-sm font-medium pl-[44px] ${activeSection === "experiences" ? "text-[#737373]" : "text-[#BFA76F]"} hover:text-[#737373] transition-colors rounded-md`}
                >
                  <span>Experiências</span>
                </SidebarMenuButton>
              </Link>
            </div>
          )}
          
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
    </>
  );
};

// Helper component for dashboard icon - renamed to avoid conflict with imported component
const DashboardIcon = ({ className }: { className?: string }) => {
  return <div className={className}><LayoutDashboard /></div>;
};

export default AppSidebar;
