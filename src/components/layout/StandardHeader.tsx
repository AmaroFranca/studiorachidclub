
import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { getFormattedDate } from "@/utils/dateUtils";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/use-mobile";
import AppSidebar from "./AppSidebar";

interface StandardHeaderProps {
  title: string;
  backLink: string;
  backText?: string;
}

const StandardHeader: React.FC<StandardHeaderProps> = ({ 
  title, 
  backLink, 
  backText = "Voltar" 
}) => {
  const formattedDate = getFormattedDate();
  const isMobile = useIsMobile();
  
  return (
    <>
      {/* Header with back button and date */}
      <div className="flex justify-between items-center mb-4 md:mb-6">
        <div className="flex items-center gap-2">
          <Link to={backLink} className="flex items-center gap-2 text-[#737373]">
            <ArrowLeft className="text-[#BFA76F]" />
            <span className="text-sm md:text-xl font-semibold">{backText}</span>
          </Link>
        </div>
        <div className="flex items-center gap-2 md:gap-4">
          <span className="text-xs md:text-sm text-[#737373]">{formattedDate}</span>
          {isMobile && (
            <Drawer>
              <DrawerTrigger className="bg-[#B1C9C3] hover:bg-[#9fb9b2] text-[#737373] h-8 w-8 flex items-center justify-center rounded-md">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <line x1="4" x2="20" y1="12" y2="12"/>
                  <line x1="4" x2="20" y1="6" y2="6"/>
                  <line x1="4" x2="20" y1="18" y2="18"/>
                </svg>
              </DrawerTrigger>
              <DrawerContent>
                <div className="p-4 bg-[#D9D9D9]">
                  <AppSidebar activeSection={getCurrentSection(backLink)} />
                </div>
              </DrawerContent>
            </Drawer>
          )}
        </div>
      </div>
      
      {/* Page Title */}
      <div className="text-center mb-6 md:mb-10">
        <h1 className="text-2xl md:text-4xl font-bold text-[#737373]">{title}</h1>
      </div>
    </>
  );
};

// Helper function to determine the current section based on the back link
function getCurrentSection(backLink: string): any {
  if (backLink === '/dashboard') return 'dashboard';
  if (backLink === '/rewards') return 'rewards';
  if (backLink.includes('prize')) return 'prizes';
  if (backLink.includes('experience')) return 'experiences';
  if (backLink.includes('redeem')) return 'redeem';
  if (backLink.includes('referral')) return 'referrals';
  if (backLink.includes('rule')) return 'rules';
  return undefined;
}

export default StandardHeader;
