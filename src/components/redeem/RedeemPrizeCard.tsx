
import React from "react";
import { LockOpen, Lock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { handleImageError, getSafeImageUrl } from "@/utils/imageUtils";
import { useIsMobile } from "@/hooks/use-mobile";

interface RedeemPrizeCardProps {
  id: string;
  image: string;
  name: string;
  points: number;
  userPoints: number;
  isSelected: boolean;
  onSelectChange: (id: string, selected: boolean) => void;
}

const RedeemPrizeCard: React.FC<RedeemPrizeCardProps> = ({ 
  id, 
  image, 
  name, 
  points, 
  userPoints, 
  isSelected, 
  onSelectChange 
}) => {
  const isMobile = useIsMobile();
  const canRedeem = userPoints >= points;
  const pointsRemaining = points - userPoints;
  
  // Use the improved getSafeImageUrl function with name matching
  const safeImageUrl = getSafeImageUrl(image, name);
  
  // Debug logging
  console.log(`Prize ${name}: canRedeem=${canRedeem}, userPoints=${userPoints}, requiredPoints=${points}, original image=${image}, safe image=${safeImageUrl}`);
  
  const handleChange = (checked: boolean) => {
    onSelectChange(id, checked);
  };
  
  // Mobile: Square format (mantém o mesmo)
  if (isMobile) {
    return (
      <Card className="bg-[#D9D9D9] shadow-[5px_5px_10px_#737373] rounded-lg border-none overflow-hidden cursor-pointer hover:scale-[1.02] transition-transform aspect-square">
        <div className="h-2/3 w-full">
          <img 
            src={safeImageUrl}
            alt={name} 
            onError={handleImageError}
            className={`w-full h-full object-cover ${!canRedeem ? "grayscale" : ""}`}
          />
        </div>
        <div className="h-1/3 p-3 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h3 className="font-semibold text-xs text-[#737373] text-left line-clamp-1">{name}</h3>
              <p className="font-bold text-xs text-[#BFA76F] text-left">{points} pontos</p>
            </div>
            {canRedeem && (
              <Checkbox 
                checked={isSelected} 
                onCheckedChange={handleChange}
                id={`prize-${id}`}
                className="h-5 w-5 border-2 border-[#BFA76F] data-[state=checked]:bg-[#BFA76F] data-[state=checked]:text-white flex-shrink-0"
              />
            )}
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {canRedeem ? (
                <>
                  <LockOpen className="w-3 h-3 text-[#BFA76F] mr-1" />
                  <span className="text-xs font-medium text-[#BFA76F]">Desbloqueado</span>
                </>
              ) : (
                <>
                  <Lock className="w-3 h-3 text-[#BFA76F] mr-1" />
                  <span className="text-xs font-medium text-[#BFA76F]">Bloqueado</span>
                </>
              )}
            </div>
          </div>
        </div>
      </Card>
    );
  }
  
  // Desktop: Horizontal format - altura padronizada h-32 igual aos cards de experiências
  return (
    <Card className={`flex h-32 bg-[#D9D9D9] shadow-[10px_10px_15px_#737373] rounded-lg border-none overflow-hidden cursor-pointer hover:scale-[1.02] transition-transform`}>
      <div className="w-[132px] h-full">
        <img 
          src={safeImageUrl}
          alt={name} 
          onError={handleImageError}
          className={`w-full h-full object-cover ${!canRedeem ? "grayscale" : ""}`}
        />
      </div>
      <div className="flex flex-col flex-1 p-4">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center">
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
          {canRedeem && (
            <Checkbox 
              checked={isSelected} 
              onCheckedChange={handleChange}
              id={`prize-${id}`}
              className="h-6 w-6 border-2 border-[#BFA76F] data-[state=checked]:bg-[#BFA76F] data-[state=checked]:text-white"
            />
          )}
        </div>
        <h3 className={`font-semibold text-sm text-[#737373] text-left`}>{name}</h3>
        <p className="font-bold text-sm text-[#BFA76F] mt-1 text-left">{points} pontos</p>
        <p className={`font-semibold text-xs text-[#737373] mt-1 text-left`}>
          {canRedeem ? "Disponível para resgate" : (
            <span>
              Faltam: <span className="text-[#BFA76F]">{pointsRemaining} pontos</span>
            </span>
          )}
        </p>
      </div>
    </Card>
  );
};

export default RedeemPrizeCard;
