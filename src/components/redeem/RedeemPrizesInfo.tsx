
import React from "react";
import { Button } from "@/components/ui/button";

interface RedeemPrizesInfoProps {
  availablePrizes: number;
  userPoints: number;
  totalSelectedPoints: number;
  remainingPoints: number;
  canRedeem: boolean;
  onRedeemClick: () => void;
}

const RedeemPrizesInfo: React.FC<RedeemPrizesInfoProps> = ({
  availablePrizes,
  userPoints,
  totalSelectedPoints,
  remainingPoints,
  canRedeem,
  onRedeemClick,
}) => {
  return (
    <div className="flex flex-row items-center justify-between w-full mb-8" style={{gap: "177px"}}>
      {/* Left Side: Title & Count */}
      <div className="flex flex-col">
        <h1 className="text-4xl font-bold text-[#737373] text-left">Resgate de Prêmios</h1>
        <p className="text-xl text-[#737373] mt-2 text-left">Total de Prêmios: {availablePrizes}</p>
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
          disabled={!canRedeem} 
          onClick={onRedeemClick}
          className="bg-[#BFA76F] hover:bg-[#BFA76F]/90 text-white w-full py-3"
        >
          RESGATAR AGORA!
        </Button>
      </div>
    </div>
  );
};

export default RedeemPrizesInfo;
