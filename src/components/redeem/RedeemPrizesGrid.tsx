
import React from "react";
import RedeemPrizeCard from "./RedeemPrizeCard";
import { useIsMobile } from "@/hooks/use-mobile";

interface Reward {
  id: string;
  name: string;
  description: string | null;
  points: number;
  image_url: string;
  type: 'prize' | 'experience';
  active: boolean;
  created_at: string;
  updated_at: string;
}

interface RedeemPrizesGridProps {
  prizes: Reward[];
  userPoints: number;
  selectedPrizes: string[];
  onSelectChange: (id: string, selected: boolean) => void;
}

const RedeemPrizesGrid: React.FC<RedeemPrizesGridProps> = ({
  prizes,
  userPoints,
  selectedPrizes,
  onSelectChange,
}) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-10">
      {prizes.map((prize) => (
        <RedeemPrizeCard 
          key={prize.id}
          id={prize.id}
          name={prize.name}
          image={prize.image_url}
          points={prize.points}
          userPoints={userPoints}
          isSelected={selectedPrizes.includes(prize.id)}
          onSelectChange={onSelectChange}
        />
      ))}
    </div>
  );
};

export default RedeemPrizesGrid;
