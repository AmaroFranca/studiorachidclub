
import React, { useState } from "react";
import { Sidebar } from "@/components/ui/sidebar";
import AppSidebar from "@/components/layout/AppSidebar";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import StandardHeader from "@/components/layout/StandardHeader";
import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/useProfile";
import { useRewards } from "@/hooks/useRewards";
import { useRedeems } from "@/hooks/useRedeems";
import { useExperienceSelection } from "@/components/redeem/ExperienceSelectionManager";
import ExperienceRedeemInfo from "@/components/redeem/ExperienceRedeemInfo";
import ExperienceConfirmationDialog from "@/components/redeem/ExperienceConfirmationDialog";
import ExperienceGrid from "@/components/redeem/ExperienceGrid";

const RedeemExperiences: React.FC = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const { profile, loading: profileLoading, refetch: refetchProfile } = useProfile(user);
  const { experiences, loading: experiencesLoading } = useRewards();
  const { createRedeem } = useRedeems(user);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const isMobile = useIsMobile();

  const {
    selectedExperiences,
    handleSelectChange,
    calculateTotalPoints,
    getSelectedExperienceNames,
    clearSelection,
  } = useExperienceSelection(experiences);

  const userPoints = profile?.points || 0;
  const availableExperiences = experiences.filter(exp => userPoints >= exp.points).length;
  const totalSelectedPoints = calculateTotalPoints();
  const canRedeem = selectedExperiences.length > 0 && totalSelectedPoints <= userPoints && !isProcessing;
  const remainingPoints = userPoints - totalSelectedPoints;
  const selectedExperienceNames = getSelectedExperienceNames();

  const handleRedeemClick = () => {
    setShowConfirmation(true);
  };

  const handleConfirmRedeem = async () => {
    if (isProcessing) return;
    
    setIsProcessing(true);
    console.log('Processing experience redeems:', selectedExperiences);
    
    try {
      let successCount = 0;
      let failCount = 0;
      
      for (const experienceId of selectedExperiences) {
        const success = await createRedeem(experienceId);
        if (success) {
          successCount++;
        } else {
          failCount++;
        }
      }
      
      await refetchProfile();
      
      if (successCount > 0) {
        toast({
          title: "Resgates processados!",
          description: `${successCount} experiência(s) resgatada(s) com sucesso${failCount > 0 ? `, ${failCount} falharam` : ''}.`,
        });
      }
      
      clearSelection();
      setShowConfirmation(false);
    } catch (error) {
      console.error('Error processing experience redeems:', error);
      toast({
        title: "Erro no processamento",
        description: "Ocorreu um erro ao processar os resgates.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  if (profileLoading || experiencesLoading) {
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
              <div className="text-[#737373] text-base md:text-lg">Carregando experiências...</div>
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
        <div className="max-w-7xl mx-auto my-[30px]">
          <StandardHeader title="Resgate de Experiências" backLink="/dashboard" />
          
          <ExperienceRedeemInfo
            availableExperiences={availableExperiences}
            userPoints={userPoints}
            totalSelectedPoints={totalSelectedPoints}
            remainingPoints={remainingPoints}
            canRedeem={canRedeem}
            isProcessing={isProcessing}
            onRedeemClick={handleRedeemClick}
          />
          
          <ExperienceGrid
            experiences={experiences}
            userPoints={userPoints}
            selectedExperiences={selectedExperiences}
            onSelectChange={handleSelectChange}
          />
        </div>
      </main>
      
      <ExperienceConfirmationDialog
        isOpen={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        onConfirm={handleConfirmRedeem}
        userPoints={userPoints}
        totalSelectedPoints={totalSelectedPoints}
        remainingPoints={remainingPoints}
        selectedExperienceNames={selectedExperienceNames}
        isProcessing={isProcessing}
      />
    </div>
  );
};

export default RedeemExperiences;
