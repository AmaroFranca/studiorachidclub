
import React from "react";
import { Settings, MessageSquare, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ProfileDropdownProps {
  formattedDate: string;
}

export const ProfileDropdown: React.FC<ProfileDropdownProps> = ({ formattedDate }) => {
  return (
    <div className="flex items-center gap-4">
      <span className="text-sm text-[#737373]">{formattedDate}</span>
      <DropdownMenu>
        <DropdownMenuTrigger className="focus:outline-none">
          <div className="w-8 h-8 rounded-full bg-[#BFA76F] flex items-center justify-center text-white cursor-pointer hover:opacity-90">
            A
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent 
          className="bg-[#EFEFEF] border border-[rgba(115,115,115,0.5)] shadow-[10px_10px_15px_#737373] rounded-[10px] w-[201px] p-[5px_9px]"
        >
          <DropdownMenuItem className="flex items-center gap-2 text-[#737373] text-sm rounded-md px-[15px] hover:bg-[#B1C9C3] cursor-pointer transition-colors">
            <Settings className="text-[#BFA76F]" />
            <span>Configurações</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center gap-2 text-[#737373] text-sm rounded-md px-[15px] hover:bg-[#B1C9C3] cursor-pointer transition-colors">
            <MessageSquare className="text-[#BFA76F]" />
            <span>Suporte</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center gap-2 text-[#737373] text-sm rounded-md px-[15px] hover:bg-[#B1C9C3] cursor-pointer transition-colors">
            <LogOut className="text-[#BFA76F]" />
            <span>Sair</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
