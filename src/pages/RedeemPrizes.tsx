import React, { useState } from "react";
import { SidebarProvider, Sidebar, SidebarInset } from "@/components/ui/sidebar";
import AppSidebar from "@/components/layout/AppSidebar";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import StandardHeader from "@/components/layout/StandardHeader";
import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/useProfile";
import { useRewards } from "@/hooks/useRewards";
import { useRedeems } from "@/hooks/useRedeems";
import RedeemPrizesHeader from "@/components/redeem/RedeemPrizesHeader";
import RedeemPrizesInfo from "@/components/redeem/RedeemPrizesInfo";
import RedeemPrizesGrid from "@/components/redeem/RedeemPrizesGrid";
import RedeemConfirmationDialog from "@/components/redeem/RedeemConfirmationDialog";

const RedeemPrizes: React.FC = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const { profile, loading: profileLoading, refetch: refetchProfile } = useProfile(user);
  const { prizes, loading: prizesLoading } = useRewards();
  const { createRedeem } = useRedeems(user);
  const [selectedPrizes, setSelectedPrizes] = useState<string[]>([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
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

  const handleConfirmRedeem = async () => {
    if (isProcessing) return;
    
    setIsProcessing(true);
    console.log('Processing redeems for prizes:', selectedPrizes);
    
    try {
      let successCount = 0;
      let failCount = 0;
      
      // Processar cada resgate individualmente
      for (const prizeId of selectedPrizes) {
        const success = await createRedeem(prizeId);
        if (success) {
          successCount++;
        } else {
          failCount++;
        }
      }
      
      // Recarregar o perfil para atualizar os pontos
      await refetchProfile();
      
      if (successCount > 0) {
        toast({
          title: "Resgates processados!",
          description: `${successCount} resgate(s) realizado(s) com sucesso${failCount > 0 ? `, ${failCount} falharam` : ''}.`,
        });
      }
      
      setSelectedPrizes([]);
      setShowConfirmation(false);
    } catch (error) {
      console.error('Error processing redeems:', error);
      toast({
        title: "Erro no processamento",
        description: "Ocorreu um erro ao processar os resgates.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const totalSelectedPoints = calculateTotalPoints();
  const canRedeem = selectedPrizes.length > 0 && totalSelectedPoints <= userPoints && !isProcessing;
  const remainingPoints = userPoints - totalSelectedPoints;
  const selectedPrizeNames = selectedPrizes.map(id => prizes.find(p => p.id === id)?.name).filter(Boolean).join(", ");

  // Show loading state
  if (profileLoading || prizesLoading) {
    return (
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          {!isMobile && (
            <Sidebar className="border-r bg-[#D9D9D9]">
              <AppSidebar activeSection="redeem" />
            </Sidebar>
          )}
          
          <SidebarInset className="flex-1 bg-[#EFEFEF] p-3 md:p-6">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-[#737373] text-base md:text-lg">Carregando prêmios...</div>
              </div>
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    );
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        {!isMobile && (
          <Sidebar className="border-r bg-[#D9D9D9]">
            <AppSidebar activeSection="redeem" />
          </Sidebar>
        )}
        
        <SidebarInset className="flex-1 bg-[#EFEFEF] p-3 md:p-6">
          <div className="max-w-7xl mx-auto my-[30px]">
            <StandardHeader title="Resgate de Prêmios" backLink="/dashboard" />
            
            <RedeemPrizesInfo
              availablePrizes={availablePrizes}
              userPoints={userPoints}
              totalSelectedPoints={totalSelectedPoints}
              remainingPoints={remainingPoints}
              canRedeem={canRedeem}
              isProcessing={isProcessing}
              onRedeemClick={handleRedeemClick}
            />
            
            <RedeemPrizesGrid
              prizes={prizes}
              userPoints={userPoints}
              selectedPrizes={selectedPrizes}
              onSelectChange={handleSelectChange}
            />
          </div>
        </SidebarInset>
      </div>
      
      <RedeemConfirmationDialog
        isOpen={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        onConfirm={handleConfirmRedeem}
        userPoints={userPoints}
        totalSelectedPoints={totalSelectedPoints}
        remainingPoints={remainingPoints}
        selectedPrizeNames={selectedPrizeNames}
        isProcessing={isProcessing}
      />
    </SidebarProvider>
  );
};

export default RedeemPrizes;
