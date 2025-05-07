
import React from "react";
import { Settings, MessageSquare, LogOut } from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from "@/components/ui/dropdown-menu";

interface DashboardHeaderProps {
  formattedDate: string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ formattedDate }) => {
  return (
    <div className="flex justify-between items-center mb-10">
      <h2 className="text-2xl font-semibold text-[#737373]">Olá, Amaro</h2>
      <div className="flex items-center gap-4">
        <span className="text-sm text-[#737373]">{formattedDate}</span>
        <DropdownMenu>
          <DropdownMenuTrigger className="focus:outline-none">
            <div className="w-8 h-8 rounded-full bg-[#BFA76F] flex items-center justify-center text-white cursor-pointer">
              A
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[201px] bg-[#EFEFEF] border border-[rgba(115,115,115,0.5)] shadow-[10px_10px_15px_#737373] rounded-[10px] p-[5px_9px] flex flex-col gap-[10px]">
            <DropdownMenuItem className="flex items-center gap-2 text-[#737373] py-1 rounded-md hover:bg-[#B1C9C3] focus:bg-[#B1C9C3]">
              <Settings className="h-5 w-5 text-[#BFA76F]" />
              <span>Configurações</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2 text-[#737373] py-1 rounded-md hover:bg-[#B1C9C3] focus:bg-[#B1C9C3]">
              <MessageSquare className="h-5 w-5 text-[#BFA76F]" />
              <span>Suporte</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2 text-[#737373] py-1 rounded-md hover:bg-[#B1C9C3] focus:bg-[#B1C9C3]">
              <LogOut className="h-5 w-5 text-[#BFA76F]" />
              <span>Sair</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default DashboardHeader;
