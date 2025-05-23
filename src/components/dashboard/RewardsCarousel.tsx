
import React from "react";
import { Card } from "@/components/ui/card";
import { useRotatingRewards } from "@/hooks/useRotatingRewards";
import { handleImageError } from "@/utils/imageUtils";
import { AnimatePresence, motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

const RewardsCarousel: React.FC = () => {
  const { currentItem, loading } = useRotatingRewards();
  const isMobile = useIsMobile();

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
          className={`flex ${isMobile ? 'flex-col items-center text-center gap-2' : 'gap-3 md:gap-5'} h-full`}
        >
          <img 
            alt={currentItem?.name} 
            className={`${isMobile ? 'w-16 h-16' : 'w-20 h-20 md:w-40 md:h-40'} object-cover rounded shadow-md flex-shrink-0`} 
            src={currentItem?.imageUrl} 
            onError={handleImageError} 
          />
          <div className={`flex flex-col justify-center h-full overflow-hidden ${isMobile ? 'items-center' : 'my-0 py-[20px] md:py-[50px]'}`}>
            <h3 className={`font-semibold text-[#737373] ${isMobile ? 'text-center text-sm' : 'text-left text-sm md:text-base'} mb-1`}>
              {currentItem?.name}
            </h3>
            <p className={`font-semibold text-[#bfa76f] ${isMobile ? 'text-center text-xs' : 'text-left text-sm md:text-base'}`}>
              {currentItem?.canRedeem ? "Você pode resgatar!" : `Faltam: ${currentItem?.pointsRemaining} pontos`}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default RewardsCarousel;
