
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Users, CircleDollarSign, List, Settings, MessageSquare, Gift, LayoutDashboard } from "lucide-react";
import { SidebarHeader, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarFooter } from "@/components/ui/sidebar";
import { SettingsDialog } from "@/components/settings/SettingsDialog";

interface AppSidebarProps {
  activeSection?: "dashboard" | "rewards" | "prizes" | "experiences" | "referrals" | "redeem" | "rules";
}

const AppSidebar: React.FC<AppSidebarProps> = ({
  activeSection
}) => {
  const location = useLocation();
  const currentPath = location.pathname;
  const [settingsOpen, setSettingsOpen] = useState(false);
  
  return <>
      <SettingsDialog open={settingsOpen} onOpenChange={setSettingsOpen} />
      
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
          
          {(activeSection === "rewards" || activeSection === "prizes" || activeSection === "experiences") && <div className="flex flex-col gap-2 mt-2 bg-transparent">
              <Link to="/prizes">
                <SidebarMenuButton className={`text-left text-sm font-medium pl-[44px] ${activeSection === "prizes" ? "text-[#737373]" : "text-[#BFA76F]"} hover:text-[#737373] transition-colors rounded-md`}>
                  <span>Prêmios</span>
                </SidebarMenuButton>
              </Link>
              <Link to="/experiences">
                <SidebarMenuButton className={`text-left text-sm font-medium pl-[44px] ${activeSection === "experiences" ? "text-[#737373]" : "text-[#BFA76F]"} hover:text-[#737373] transition-colors rounded-md`}>
                  <span>Experiências</span>
                </SidebarMenuButton>
              </Link>
            </div>}
          
          <SidebarMenuItem>
            <Link to="/referrals">
              <SidebarMenuButton className={`text-[#737373] hover:bg-[#B1C9C3] px-[15px] ${activeSection === "referrals" || currentPath === "/referrals" ? "bg-[#B1C9C3]" : ""}`}>
                <Users className="text-[#BFA76F]" />
                <span>Indicados</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
          
          <SidebarMenuItem>
            <Link to="/redeem-prizes">
              <SidebarMenuButton className={`text-[#737373] hover:bg-[#B1C9C3] px-[15px] ${activeSection === "redeem" ? "bg-[#B1C9C3]" : ""}`}>
                <CircleDollarSign className="text-[#BFA76F]" />
                <span>Resgates</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
          
          {(activeSection === "redeem") && <div className="flex flex-col gap-2 mt-2 bg-transparent">
              <Link to="/redeem-prizes">
                <SidebarMenuButton className={`text-left text-sm font-medium pl-[44px] ${currentPath === "/redeem-prizes" ? "text-[#737373]" : "text-[#BFA76F]"} hover:text-[#737373] transition-colors rounded-md`}>
                  <span>Prêmios</span>
                </SidebarMenuButton>
              </Link>
              <Link to="/redeem-experiences">
                <SidebarMenuButton className={`text-left text-sm font-medium pl-[44px] ${currentPath === "/redeem-experiences" ? "text-[#737373]" : "text-[#BFA76F]"} hover:text-[#737373] transition-colors rounded-md`}>
                  <span>Experiências</span>
                </SidebarMenuButton>
              </Link>
            </div>}
          
          <SidebarMenuItem>
            <Link to="/rules">
              <SidebarMenuButton className={`text-[#737373] hover:bg-[#B1C9C3] px-[15px] ${activeSection === "rules" ? "bg-[#B1C9C3]" : ""}`}>
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
            <SidebarMenuButton 
              className="text-[#737373] hover:bg-[#B1C9C3] px-[15px]"
              onClick={() => setSettingsOpen(true)}
            >
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
    </>;
};

// Helper component for dashboard icon - renamed to avoid conflict with imported component
const DashboardIcon = ({
  className
}: {
  className?: string;
}) => {
  return <div className={className}><LayoutDashboard /></div>;
};

export default AppSidebar;
