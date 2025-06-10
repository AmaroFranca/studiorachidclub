
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
  
  // Determine active sections based on current path if activeSection is not provided
  const getActiveSection = () => {
    if (activeSection) return activeSection;
    
    if (currentPath === "/dashboard") return "dashboard";
    if (currentPath === "/rewards" || currentPath === "/prizes" || currentPath === "/experiences") return "rewards";
    if (currentPath === "/referrals") return "referrals";
    if (currentPath === "/redeem-prizes" || currentPath === "/redeem-experiences") return "redeem";
    if (currentPath === "/rules") return "rules";
    return "dashboard";
  };

  const currentActiveSection = getActiveSection();
  
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
              <SidebarMenuButton className={`rounded-md text-[#737373] px-[15px] ${currentActiveSection === "dashboard" ? "bg-[#B1C9C3]" : "hover:bg-[#B1C9C3]"}`}>
                <DashboardIcon className="text-[#BFA76F]" />
                <span>Painel</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
          
          <SidebarMenuItem>
            <Link to="/rewards">
              <SidebarMenuButton className={`text-[#737373] px-[15px] rounded-md ${currentActiveSection === "rewards" || currentActiveSection === "prizes" || currentActiveSection === "experiences" ? "bg-[#B1C9C3] hover:bg-[#B1C9C3]" : "hover:bg-[#B1C9C3]"}`}>
                <Gift className="text-[#BFA76F]" />
                <span>Recompensas</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
          
          {(currentActiveSection === "rewards" || currentActiveSection === "prizes" || currentActiveSection === "experiences") && <div className="flex flex-col gap-2 mt-2 bg-transparent">
              <Link to="/prizes">
                <SidebarMenuButton className={`text-left text-sm font-medium pl-[44px] ${currentPath === "/prizes" ? "text-[#737373]" : "text-[#BFA76F]"} hover:text-[#737373] transition-colors rounded-md`}>
                  <span>Prêmios</span>
                </SidebarMenuButton>
              </Link>
              <Link to="/experiences">
                <SidebarMenuButton className={`text-left text-sm font-medium pl-[44px] ${currentPath === "/experiences" ? "text-[#737373]" : "text-[#BFA76F]"} hover:text-[#737373] transition-colors rounded-md`}>
                  <span>Experiências</span>
                </SidebarMenuButton>
              </Link>
            </div>}
          
          <SidebarMenuItem>
            <Link to="/referrals">
              <SidebarMenuButton className={`text-[#737373] hover:bg-[#B1C9C3] px-[15px] ${currentActiveSection === "referrals" ? "bg-[#B1C9C3]" : ""}`}>
                <Users className="text-[#BFA76F]" />
                <span>Indicados</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
          
          <SidebarMenuItem>
            <Link to="/redeem-prizes">
              <SidebarMenuButton className={`text-[#737373] hover:bg-[#B1C9C3] px-[15px] ${currentActiveSection === "redeem" ? "bg-[#B1C9C3]" : ""}`}>
                <CircleDollarSign className="text-[#BFA76F]" />
                <span>Resgates</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
          
          {(currentActiveSection === "redeem") && <div className="flex flex-col gap-2 mt-2 bg-transparent">
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
              <SidebarMenuButton className={`text-[#737373] hover:bg-[#B1C9C3] px-[15px] ${currentActiveSection === "rules" ? "bg-[#B1C9C3]" : ""}`}>
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
