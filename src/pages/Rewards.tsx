
import React, { useState } from "react";
import { ArrowLeft, LockOpen, Lock } from "lucide-react";
import { Sidebar } from "@/components/ui/sidebar";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import AppSidebar from "@/components/layout/AppSidebar";
import { getFormattedDate } from "@/utils/dateUtils";
import { useIsMobile } from "@/hooks/use-mobile";
import MobileDropdown from "@/components/mobile/MobileDropdown";

const Rewards: React.FC = () => {
  const formattedDate = getFormattedDate();
  const isMobile = useIsMobile();
  
  return (
    <>
      {!isMobile && (
        <Sidebar className="border-r bg-[#D9D9D9]">
          <AppSidebar activeSection="rewards" />
        </Sidebar>
      )}
      
      <main className="flex-1 bg-[#EFEFEF] p-3 md:p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-4 md:mb-6">
            <div className="flex items-center gap-2">
              <Link to="/dashboard" className="flex items-center gap-2 text-[#737373]">
                <ArrowLeft className="text-[#BFA76F]" />
                <span className="text-sm md:text-xl font-semibold">Voltar</span>
              </Link>
            </div>
            <div className="flex items-center gap-2 md:gap-4">
              <span className="text-xs md:text-sm text-[#737373]">{formattedDate}</span>
              {isMobile && (
                <MobileDropdown activeSection="rewards" />
              )}
            </div>
          </div>
          
          {/* Page Title */}
          <div className="text-center mb-6 md:mb-10">
            <h1 className="text-2xl md:text-4xl font-bold text-[#737373]">Prêmios & Experiências</h1>
          </div>
          
          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {/* Prêmios Card */}
            <div className="p-2">
              <Link to="/prizes">
                <Card className="bg-[#D9D9D9] shadow-[5px_5px_10px_#737373] md:shadow-[10px_10px_15px_#737373] rounded-lg border-none cursor-pointer hover:scale-[1.02] transition-transform">
                  <CardContent className="p-4 md:p-6 space-y-3 md:space-y-4">
                    <div className="overflow-hidden rounded-lg">
                      <img 
                        src="/lovable-uploads/8ee045bc-a834-4510-8ac3-548896e0a4ca.png" 
                        alt="Amazon Echo" 
                        className="w-full h-48 md:h-64 object-cover rounded-lg"
                      />
                    </div>
                    <div className="space-y-2 md:space-y-3 text-left">
                      <div className="flex justify-between items-center">
                        <h3 className="font-semibold text-base md:text-lg text-[#737373]">Prêmios</h3>
                        <div className="flex items-center gap-1">
                          <LockOpen className="w-4 h-4 text-[#BFA76F]" />
                          <span className="text-xs text-[#BFA76F]">Desbloqueados</span>
                        </div>
                      </div>
                      <p className="text-sm md:text-base text-[#737373]">Troque seus pontos por itens selecionados.</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </div>

            {/* Experiências Card - Now linked to Experiences page */}
            <div className="p-2">
              <Link to="/experiences">
                <Card className="bg-[#D9D9D9] shadow-[5px_5px_10px_#737373] md:shadow-[10px_10px_15px_#737373] rounded-lg border-none cursor-pointer hover:scale-[1.02] transition-transform">
                  <CardContent className="p-4 md:p-6 space-y-3 md:space-y-4">
                    <div className="overflow-hidden rounded-lg">
                      <img 
                        src="/lovable-uploads/6f9fe101-345e-4ad3-8226-720ffa3f2f43.png" 
                        alt="Spa Experience" 
                        className="w-full h-48 md:h-64 object-cover rounded-lg grayscale"
                      />
                    </div>
                    <div className="space-y-2 md:space-y-3 text-left">
                      <div className="flex justify-between items-center">
                        <h3 className="font-semibold text-base md:text-lg text-[#737373]">Studio Rachid Experience</h3>
                        <div className="flex items-center gap-1">
                          <Lock className="w-4 h-4 text-[#BFA76F]" />
                          <span className="text-xs text-[#BFA76F]">Bloqueados</span>
                        </div>
                      </div>
                      <p className="text-sm md:text-base text-[#737373]">Acumule 1000 pontos para desbloquear</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Rewards;
