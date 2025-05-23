import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { getFormattedDate } from "@/utils/dateUtils";
import { useIsMobile } from "@/hooks/use-mobile";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import AppSidebar from "@/components/layout/AppSidebar";
const ReferralHeader: React.FC = () => {
  const formattedDate = getFormattedDate();
  const isMobile = useIsMobile();
  return <div className="flex justify-between items-center mb-6 md:mb-8">
      <div className="flex items-center gap-2">
        <Link to="/dashboard" className="flex items-center gap-2 text-[#737373]">
          <ArrowLeft className="text-[#BFA76F]" />
          <span className="text-sm md:text-xl font-semibold">Voltar</span>
        </Link>
      </div>
      <div className="flex items-center gap-2 md:gap-4">
        <span className="text-xs md:text-sm text-[#737373]">{formattedDate}</span>
        {isMobile && <Drawer>
            
            <DrawerContent>
              <div className="p-4 bg-[#D9D9D9]">
                <AppSidebar activeSection="referrals" />
              </div>
            </DrawerContent>
          </Drawer>}
      </div>
    </div>;
};
export default ReferralHeader;