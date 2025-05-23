
import React, { useState, useEffect } from "react";
import { SidebarProvider, Sidebar } from "@/components/ui/sidebar";
import { useToast } from "@/hooks/use-toast";
import { getFormattedDate } from "@/utils/dateUtils";
import AppSidebar from "@/components/layout/AppSidebar";
import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/useProfile";
import { useRewards } from "@/hooks/useRewards";
import RedeemPrizesHeader from "@/components/redeem/RedeemPrizesHeader";
import RedeemPrizesInfo from "@/components/redeem/RedeemPrizesInfo";
import RedeemPrizesGrid from "@/components/redeem/RedeemPrizesGrid";
import RedeemConfirmationDialog from "@/components/redeem/RedeemConfirmationDialog";

const RedeemPrizes: React.FC = () => {
  const formattedDate = getFormattedDate();
  const { toast } = useToast();
  const { user } = useAuth();
  const { profile, loading: profileLoading } = useProfile(user);
  const { prizes, loading: prizesLoading } = useRewards();
  const [selectedPrizes, setSelectedPrizes] = useState<string[]>([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  
  // Add useEffect for handling body class when dialog is open
  useEffect(() => {
    if (showConfirmation) {
      document.body.classList.add("dialog-open");
    } else {
      document.body.classList.remove("dialog-open");
    }
    
    // Cleanup on unmount
    return () => {
      document.body.classList.remove("dialog-open");
    };
  }, [showConfirmation]);
  
  const userPoints = profile?.points || 0;
  
  // Calculate available prizes based on user points
  const availablePrizes = prizes.filter(prize => userPoints >= prize.points).length;
  
  const handleSelectChange = (id: string, selected: boolean) => {
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
      <SidebarProvider defaultOpen={true}>
        <div className="flex min-h-screen w-full">
          <Sidebar className="border-r bg-[#D9D9D9]">
            <AppSidebar activeSection="redeem" />
          </Sidebar>
          
          <main className="flex-1 bg-[#EFEFEF] p-6">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-[#737373] text-lg">Carregando prêmios...</div>
              </div>
            </div>
          </main>
        </div>
      </SidebarProvider>
    );
  }
  
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full">
        <Sidebar className="border-r bg-[#D9D9D9]">
          <AppSidebar activeSection="redeem" />
        </Sidebar>
        
        <main className="flex-1 bg-[#EFEFEF] p-6">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <RedeemPrizesHeader formattedDate={formattedDate} />
            
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
      </div>
      
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
    </SidebarProvider>
  );
};

export default RedeemPrizes;
