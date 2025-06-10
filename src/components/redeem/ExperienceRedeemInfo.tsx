
import React from "react";
import { Button } from "@/components/ui/button";

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
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between w-full mb-6 md:mb-8 gap-4 md:gap-6">
      {/* Left Side: Count info */}
      <div className="flex flex-col w-full md:w-auto">
        <p className="text-lg md:text-xl text-[#737373] mt-2 text-left">
          Total de Experiências: {availableExperiences}
        </p>
      </div>
      
      {/* Right Side: Calculator & Button */}
      <div className="flex flex-col w-full md:w-auto md:min-w-[280px]">
        {/* Points Calculator */}
        <div className="bg-white p-3 md:p-4 px-4 md:px-8 rounded-md w-full mb-3 md:mb-4">
          <div className="flex justify-between">
            <p className="text-sm md:text-base text-[#737373] font-medium">Pontos disponíveis:</p>
            <span className="text-sm md:text-base text-[#BFA76F] font-bold">{userPoints}</span>
          </div>
          <div className="flex justify-between">
            <p className="text-sm md:text-base text-[#737373] font-medium">Pontos selecionados:</p>
            <span className="text-sm md:text-base text-[#737373] font-bold">-{totalSelectedPoints}</span>
          </div>
          <hr className="my-2" />
          <div className="flex justify-between">
            <p className="text-sm md:text-base text-[#737373] font-medium">Saldo de pontos:</p>
            <span className="text-sm md:text-base text-[#BFA76F] font-bold">{remainingPoints}</span>
          </div>
        </div>
        
        {/* Redeem Button */}
        <Button 
          disabled={!canRedeem} 
          onClick={onRedeemClick}
          className="bg-[#BFA76F] hover:bg-[#BFA76F]/90 text-white w-full py-2 md:py-3"
        >
          {isProcessing ? "PROCESSANDO..." : "RESGATAR AGORA!"}
        </Button>
      </div>
    </div>
  );
};

export default ExperienceRedeemInfo;
