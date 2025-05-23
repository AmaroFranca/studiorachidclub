
import React, { useState, useEffect } from "react";
import { Sidebar } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import AppSidebar from "@/components/layout/AppSidebar";
import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/useProfile";
import { useRewards } from "@/hooks/useRewards";
import RedeemPrizesGrid from "@/components/redeem/RedeemPrizesGrid";
import RedeemConfirmationDialog from "@/components/redeem/RedeemConfirmationDialog";
import { useIsMobile } from "@/hooks/use-mobile";
import StandardHeader from "@/components/layout/StandardHeader";

const RedeemPrizes: React.FC = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const { profile, loading: profileLoading } = useProfile(user);
  const { prizes, loading: prizesLoading } = useRewards();
  const [selectedPrizes, setSelectedPrizes] = useState<string[]>([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const isMobile = useIsMobile();
  
  const userPoints = profile?.points || 0;
  
  // Calculate available prizes based on user points
  const availablePrizes = prizes.filter(prize => userPoints >= prize.points).length;
  
  const handleSelectChange = (id: string, selected: boolean) => {
    console.log('Prize selection changed:', id, selected);
    if (selected) {
      setSelectedPrizes([...selectedPrizes, id]);
    } else {
      setSelectedPrizes(selectedPrizes.filter(prizeId => prizeId !== id));
    }
  };
  
  const calculateTotalPoints = () => {
    return selectedPrizes.reduce((total, id) => {
      const prize = prizes.find(p => p.id === id);
      return total + (prize ? prize.points : 0);
    }, 0);
  };
  
  const handleRedeemClick = () => {
    setShowConfirmation(true);
  };
  
  const handleConfirmRedeem = () => {
    toast({
      title: "Resgate realizado com sucesso!",
      description: `Você resgatou ${selectedPrizes.length} item(s) totalizando ${calculateTotalPoints()} pontos.`,
    });
    setSelectedPrizes([]);
    setShowConfirmation(false);
  };
  
  const totalSelectedPoints = calculateTotalPoints();
  const canRedeem = selectedPrizes.length > 0 && totalSelectedPoints <= userPoints;
  const remainingPoints = userPoints - totalSelectedPoints;
  
  const selectedPrizeNames = selectedPrizes
    .map(id => prizes.find(p => p.id === id)?.name)
    .filter(Boolean)
    .join(", ");
  
  // Show loading state
  if (profileLoading || prizesLoading) {
    return (
      <div className="flex min-h-screen w-full">
        {!isMobile && (
          <Sidebar className="border-r bg-[#D9D9D9]">
            <AppSidebar activeSection="redeem" />
          </Sidebar>
        )}
        
        <main className="flex-1 bg-[#EFEFEF] p-3 md:p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="text-[#737373] text-base md:text-lg">Carregando prêmios...</div>
            </div>
          </div>
        </main>
      </div>
    );
  }
  
  return (
    <div className="flex min-h-screen w-full">
      {!isMobile && (
        <Sidebar className="border-r bg-[#D9D9D9]">
          <AppSidebar activeSection="redeem" />
        </Sidebar>
      )}
      
      <main className="flex-1 bg-[#EFEFEF] p-3 md:p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header with StandardHeader component */}
          <StandardHeader 
            title="Resgate de Prêmios"
            backLink="/dashboard"
          />
          
          {/* Main Information Row */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between w-full mb-6 md:mb-8 gap-4 md:gap-6">
            {/* Left Side: Count info */}
            <div className="flex flex-col w-full md:w-auto">
              <p className="text-lg md:text-xl text-[#737373] mt-2 text-left">Total de Prêmios: {availablePrizes}</p>
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
                onClick={handleRedeemClick}
                className="bg-[#BFA76F] hover:bg-[#BFA76F]/90 text-white w-full py-2 md:py-3"
              >
                RESGATAR AGORA!
              </Button>
            </div>
          </div>
          
          {/* Prize Cards Grid */}
          <RedeemPrizesGrid 
            prizes={prizes}
            userPoints={userPoints}
            selectedPrizes={selectedPrizes}
            onSelectChange={handleSelectChange}
          />
        </div>
      </main>
      
      {/* Confirmation Dialog */}
      <RedeemConfirmationDialog 
        open={showConfirmation}
        onOpenChange={setShowConfirmation}
        userPoints={userPoints}
        totalSelectedPoints={totalSelectedPoints}
        remainingPoints={remainingPoints}
        selectedPrizeNames={selectedPrizeNames}
        onConfirm={handleConfirmRedeem}
      />
    </div>
  );
};

export default RedeemPrizes;
