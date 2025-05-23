
import React, { useState, useEffect } from "react";
import { Sidebar } from "@/components/ui/sidebar";
import { useToast } from "@/hooks/use-toast";
import AppSidebar from "@/components/layout/AppSidebar";
import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/useProfile";
import { useRewards } from "@/hooks/useRewards";
import RedeemPrizesInfo from "@/components/redeem/RedeemPrizesInfo";
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
  
  // Debug logging to check data
  useEffect(() => {
    console.log('User points:', userPoints);
    console.log('Available prizes:', prizes);
    console.log('Prizes loading:', prizesLoading);
    console.log('Profile loading:', profileLoading);
  }, [userPoints, prizes, prizesLoading, profileLoading]);
  
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
          {/* Header */}
          <StandardHeader 
            title="Resgate de Prêmios"
            backLink="/dashboard"
          />
          
          {/* Main Information Row */}
          <RedeemPrizesInfo 
            availablePrizes={availablePrizes}
            userPoints={userPoints}
            totalSelectedPoints={totalSelectedPoints}
            remainingPoints={remainingPoints}
            canRedeem={canRedeem}
            onRedeemClick={handleRedeemClick}
          />
          
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
