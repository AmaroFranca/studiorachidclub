
import React from "react";
import { LockOpen, Lock } from "lucide-react";
import { Card } from "@/components/ui/card";

interface PrizeCardProps {
  image: string;
  name: string;
  points: number;
  userPoints?: number;
}

const PrizeCard: React.FC<PrizeCardProps> = ({ image, name, points, userPoints = 0 }) => {
  const canRedeem = userPoints >= points;
  const pointsRemaining = points - userPoints;
  
  return (
    <Card className="flex h-32 bg-[#D9D9D9] shadow-[10px_10px_15px_#737373] rounded-lg border-none overflow-hidden cursor-pointer hover:scale-[1.02] transition-transform max-w-md w-full mx-auto">
      <div className="w-[132px] h-full flex-shrink-0">
        <img 
          src={image}
          alt={name} 
          className={`w-full h-full object-cover ${!canRedeem ? "grayscale" : ""}`}
        />
      </div>
      <div className="flex flex-col flex-1 p-4">
        <div className="flex items-center mb-2">
          {canRedeem ? (
            <>
              <LockOpen className="w-4 h-4 text-[#BFA76F] mr-1" />
              <span className="text-xs font-medium text-[#BFA76F]">Desbloqueado</span>
            </>
          ) : (
            <>
              <Lock className="w-4 h-4 text-[#BFA76F] mr-1" />
              <span className="text-xs font-medium text-[#BFA76F]">Bloqueado</span>
            </>
          )}
        </div>
        <h3 className="font-semibold text-sm text-[#737373] text-left line-clamp-1">{name}</h3>
        <p className="font-bold text-sm text-[#BFA76F] mt-1 text-left">{points} pontos</p>
        <p className="font-semibold text-xs text-[#737373] mt-1 text-left">
          {canRedeem ? "Resgatar" : (
            <span>
              Faltam: <span className="text-[#BFA76F]">{pointsRemaining} pontos</span>
            </span>
          )}
        </p>
      </div>
    </Card>
  );
};

export default PrizeCard;
