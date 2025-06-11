
import React from "react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

interface ExperienceRedeemInfoProps {
  availableExperiences: number;
  userPoints: number;
  totalSelectedPoints: number;
  remainingPoints: number;
  canRedeem: boolean;
  isProcessing: boolean;
  onRedeemClick: () => void;
}

const ExperienceRedeemInfo: React.FC<ExperienceRedeemInfoProps> = ({
  availableExperiences,
  userPoints,
  totalSelectedPoints,
  remainingPoints,
  canRedeem,
  isProcessing,
  onRedeemClick,
}) => {
  const isMobile = useIsMobile();
  
  if (isMobile) {
    return (
      <div className="flex flex-col gap-4 mb-6">
        {/* Title & Count */}
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold text-[#737373] text-left">Resgate de Experiências</h1>
          <p className="text-base text-[#737373] mt-1 text-left">Total de Experiências: {availableExperiences}</p>
        </div>
        
        {/* Points Calculator */}
        <div className="bg-white p-3 rounded-md w-full">
          <div className="flex justify-between text-sm">
            <p className="text-[#737373] font-medium">Pontos disponíveis:</p>
            <span className="text-[#BFA76F] font-bold">{userPoints}</span>
          </div>
          <div className="flex justify-between text-sm">
            <p className="text-[#737373] font-medium">Pontos selecionados:</p>
            <span className="text-[#737373] font-bold">-{totalSelectedPoints}</span>
          </div>
          <hr className="my-2" />
          <div className="flex justify-between text-sm">
            <p className="text-[#737373] font-medium">Saldo de pontos:</p>
            <span className="text-[#BFA76F] font-bold">{remainingPoints}</span>
          </div>
        </div>
        
        {/* Redeem Button */}
        <Button 
          disabled={!canRedeem || isProcessing} 
          onClick={onRedeemClick}
          className="bg-[#BFA76F] hover:bg-[#BFA76F]/90 text-white w-full py-3 min-h-[44px]"
        >
          {isProcessing ? "PROCESSANDO..." : "RESGATAR AGORA!"}
        </Button>
      </div>
    );
  }
  
  return (
    <div className="flex flex-row items-center justify-between w-full mb-8" style={{gap: "177px"}}>
      {/* Left Side: Title & Count */}
      <div className="flex flex-col">
        <h1 className="text-4xl font-bold text-[#737373] text-left">Resgate de Experiências</h1>
        <p className="text-xl text-[#737373] mt-2 text-left">Total de Experiências: {availableExperiences}</p>
      </div>
      
      {/* Right Side: Calculator & Button */}
      <div className="flex flex-col">
        {/* Points Calculator */}
        <div className="bg-white p-4 px-8 rounded-md w-full mb-4 min-w-[280px]">
          <div className="flex justify-between">
            <p className="text-[#737373] font-medium">Pontos disponíveis:</p>
            <span className="text-[#BFA76F] font-bold">{userPoints}</span>
          </div>
          <div className="flex justify-between">
            <p className="text-[#737373] font-medium">Pontos selecionados:</p>
            <span className="text-[#737373] font-bold">-{totalSelectedPoints}</span>
          </div>
          <hr className="my-2" />
          <div className="flex justify-between">
            <p className="text-[#737373] font-medium">Saldo de pontos:</p>
            <span className="text-[#BFA76F] font-bold">{remainingPoints}</span>
          </div>
        </div>
        
        {/* Redeem Button */}
        <Button 
          disabled={!canRedeem || isProcessing} 
          onClick={onRedeemClick}
          className="bg-[#BFA76F] hover:bg-[#BFA76F]/90 text-white w-full py-3"
        >
          {isProcessing ? "PROCESSANDO..." : "RESGATAR AGORA!"}
        </Button>
      </div>
    </div>
  );
};

export default ExperienceRedeemInfo;
