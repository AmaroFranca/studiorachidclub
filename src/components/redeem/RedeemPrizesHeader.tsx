
import React from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";

interface RedeemPrizesHeaderProps {
  formattedDate: string;
}

const RedeemPrizesHeader: React.FC<RedeemPrizesHeaderProps> = ({ formattedDate }) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="flex justify-between items-center mb-6 md:mb-10">
      <div className="flex items-center gap-2">
        <Link to="/dashboard" className="flex items-center gap-2 text-[#737373]">
          <ArrowLeft className="text-[#BFA76F]" />
          <span className="text-base md:text-xl font-semibold">Voltar</span>
        </Link>
      </div>
      <div className="flex items-center gap-2 md:gap-4">
        <span className="text-xs md:text-sm text-[#737373]">{formattedDate}</span>
        {isMobile && (
          <SidebarTrigger className="bg-[#B1C9C3] hover:bg-[#9fb9b2] text-[#737373] h-8 w-8 flex items-center justify-center" />
        )}
      </div>
    </div>
  );
};

export default RedeemPrizesHeader;
