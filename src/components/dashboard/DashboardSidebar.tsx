
import React from "react";
import { LayoutDashboard, Gift, Users, CircleDollarSign, List, Settings, MessageSquare, Menu } from "lucide-react";
import { 
  Sidebar, 
  SidebarHeader, 
  SidebarContent, 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger
} from "@/components/ui/sidebar";

interface DashboardSidebarProps {
  defaultOpen?: boolean;
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ defaultOpen = true }) => {
  return (
    <Sidebar className="border-r bg-[#D9D9D9]">
      <SidebarHeader className="flex items-center justify-between bg-[#d9d9d9] py-[30px] px-4 mx-0">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-semibold text-[#737373] text-left">Studio Rachid</h1>
          <SidebarTrigger className="h-5 w-16 p-0 bg-[#173017]/0 text-[BFA76F] text-[#bfa76f]">
            <Menu size={8} className="text-[#BFA76F]" />
          </SidebarTrigger>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="bg-[D9D9D9] bg-[#d9d9d9]">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton isActive={true} className="rounded-md text-[#737373] bg-[#F2FCE2] px-[15px]">
              <LayoutDashboard className="text-[#BFA76F]" />
              <span>Painel</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          
          <SidebarMenuItem>
            <SidebarMenuButton className="text-[#737373] px-[14px] hover:bg-[#B1C9C3] focus:bg-[#B1C9C3]">
              <Gift className="text-[#BFA76F]" />
              <span>Recompensas</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          
          <SidebarMenuItem>
            <SidebarMenuButton className="text-[#737373] px-[15px] hover:bg-[#B1C9C3] focus:bg-[#B1C9C3]">
              <Users className="text-[#BFA76F]" />
              <span>Indicados</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          
          <SidebarMenuItem>
            <SidebarMenuButton className="text-[#737373] px-[15px] hover:bg-[#B1C9C3] focus:bg-[#B1C9C3]">
              <CircleDollarSign className="text-[#BFA76F]" />
              <span>Resgates</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          
          <SidebarMenuItem>
            <SidebarMenuButton className="text-[#737373] px-[15px] hover:bg-[#B1C9C3] focus:bg-[#B1C9C3]">
              <List className="text-[#BFA76F]" />
              <span>Regras</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      
      <SidebarFooter className="mt-auto bg-[#d9d9d9] py-[50px]">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="text-[#737373] px-[15px] hover:bg-[#B1C9C3] focus:bg-[#B1C9C3]">
              <Settings className="text-[#BFA76F]" />
              <span>Configurações</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          
          <SidebarMenuItem>
            <SidebarMenuButton className="text-[#737373] px-[15px] hover:bg-[#B1C9C3] focus:bg-[#B1C9C3]">
              <MessageSquare className="text-[#BFA76F]" />
              <span>Suporte</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default DashboardSidebar;
