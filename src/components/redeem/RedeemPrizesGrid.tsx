
import React from "react";
import RedeemPrizeCard from "./RedeemPrizeCard";
import { Prize } from "@/types/prize";

interface RedeemPrizesGridProps {
  prizes: Prize[];
  userPoints: number;
  selectedPrizes: number[];
  onSelectChange: (id: number, selected: boolean) => void;
}

const RedeemPrizesGrid: React.FC<RedeemPrizesGridProps> = ({
  prizes,
  userPoints,
  selectedPrizes,
  onSelectChange,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
      {prizes.map((prize) => (
        <RedeemPrizeCard 
          key={prize.id}
          id={prize.id}
          name={prize.name}
          image={prize.image}
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
