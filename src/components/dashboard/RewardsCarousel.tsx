
import React from "react";
import { Card } from "@/components/ui/card";
import { useRotatingRewards } from "@/hooks/useRotatingRewards";
import { handleImageError } from "@/utils/imageUtils";
import { AnimatePresence, motion } from "framer-motion";

const RewardsCarousel: React.FC = () => {
  const { currentItem, loading } = useRotatingRewards();

  if (loading) {
    return (
      <div className="border border-[rgba(115,115,115,0.5)] rounded p-4 mb-6 py-[10px] h-[180px] flex items-center justify-center">
        <p className="text-[#737373]">Carregando recompensas...</p>
      </div>
    );
  }

  return (
    <div className="border border-[rgba(115,115,115,0.5)] rounded p-4 mb-6 py-[10px] h-[180px] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div 
          key={currentItem?.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="flex gap-5 h-full"
        >
          <img 
            alt={currentItem?.name} 
            className="w-40 h-40 object-cover rounded shadow-md" 
            src={currentItem?.imageUrl} 
            onError={handleImageError}
          />
          <div className="flex flex-col justify-between h-full overflow-hidden">
            <h3 className="font-semibold text-[#737373] text-left">{currentItem?.name}</h3>
            <p className="font-semibold text-[#bfa76f] text-left">
              {currentItem?.canRedeem 
                ? "Você pode resgatar!" 
                : `Faltam: ${currentItem?.pointsRemaining} pontos`}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default RewardsCarousel;
