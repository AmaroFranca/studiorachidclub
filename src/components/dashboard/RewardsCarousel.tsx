
import React from "react";
import { Card } from "@/components/ui/card";
import { useRotatingRewards } from "@/hooks/useRotatingRewards";
import { handleImageError } from "@/utils/imageUtils";
import { AnimatePresence, motion } from "framer-motion";

const RewardsCarousel: React.FC = () => {
  const { currentItem, loading } = useRotatingRewards();

  if (loading) {
    return (
      <div className="border border-[rgba(115,115,115,0.5)] rounded p-3 md:p-4 mb-4 md:mb-6 py-[10px] h-32 md:h-[180px] flex items-center justify-center">
        <p className="text-[#737373] text-sm md:text-base">Carregando recompensas...</p>
      </div>
    );
  }

  return (
    <div className="border border-[rgba(115,115,115,0.5)] rounded p-3 md:p-4 mb-4 md:mb-6 py-[10px] h-32 md:h-[180px] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div 
          key={currentItem?.id} 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }} 
          transition={{ duration: 0.5 }} 
          className="flex gap-3 md:gap-5 h-full"
        >
          <img 
            alt={currentItem?.name} 
            className="w-16 h-16 md:w-20 md:h-20 lg:w-40 lg:h-40 object-cover rounded shadow-md flex-shrink-0" 
            src={currentItem?.imageUrl} 
            onError={handleImageError} 
          />
          <div className="flex flex-col justify-center h-full overflow-hidden my-0 py-2 md:py-[20px] lg:py-[50px]">
            <h3 className="font-semibold text-[#737373] text-left text-xs md:text-sm lg:text-base mb-1">
              {currentItem?.name}
            </h3>
            <p className="font-semibold text-[#bfa76f] text-left text-xs md:text-sm lg:text-base">
              {currentItem?.canRedeem ? "Você pode resgatar!" : `Faltam: ${currentItem?.pointsRemaining} pontos`}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default RewardsCarousel;
