
import React from "react";
import { LockOpen } from "lucide-react";
import { Card } from "@/components/ui/card";

interface PrizeCardProps {
  image: string;
  name: string;
  points: number;
  userPoints?: number;
}

const PrizeCard: React.FC<PrizeCardProps> = ({ image, name, points, userPoints = 0 }) => {
  const canRedeem = userPoints >= points || !userPoints;
  const pointsRemaining = points - userPoints;
  
  return (
    <Card className="flex h-32 bg-[#D9D9D9] shadow-[10px_10px_15px_#737373] rounded-lg border-none overflow-hidden">
      <div className="w-[132px] h-full">
        <img 
          src={image}
          alt={name} 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-col flex-1 p-4">
        <div className="flex items-center mb-2">
          <LockOpen className="w-4 h-4 text-[#BFA76F] mr-1" />
          <span className="text-xs font-medium text-[#BFA76F]">Desbloqueado</span>
        </div>
        <h3 className="font-semibold text-sm text-[#737373] text-left">{name}</h3>
        <p className="font-bold text-sm text-[#BFA76F] mt-1 text-left">{points} pontos</p>
        <p className="font-semibold text-xs text-[#737373] mt-1 text-left">
          {canRedeem ? "Resgatar" : `Faltam: ${pointsRemaining} pontos`}
        </p>
      </div>
    </Card>
  );
};

export default PrizeCard;
