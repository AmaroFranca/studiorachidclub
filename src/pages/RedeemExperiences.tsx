
import React, { useState } from "react";
import { Sidebar } from "@/components/ui/sidebar";
import RedeemExperienceCard from "@/components/redeem/RedeemExperienceCard";
import AppSidebar from "@/components/layout/AppSidebar";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import StandardHeader from "@/components/layout/StandardHeader";
import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/useProfile";
import { useRewards } from "@/hooks/useRewards";
import { useRedeems } from "@/hooks/useRedeems";

const RedeemExperiences: React.FC = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const { profile, loading: profileLoading, refetch: refetchProfile } = useProfile(user);
  const { experiences, loading: experiencesLoading } = useRewards();
  const { createRedeem } = useRedeems(user);
  const [selectedExperiences, setSelectedExperiences] = useState<string[]>([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const isMobile = useIsMobile();

  const userPoints = profile?.points || 0;

  // Calculate available experiences based on user points
  const availableExperiences = experiences.filter(exp => userPoints >= exp.points).length;

  const handleSelectChange = (id: string, selected: boolean) => {
    if (selected) {
      setSelectedExperiences([...selectedExperiences, id]);
    } else {
      setSelectedExperiences(selectedExperiences.filter(expId => expId !== id));
    }
  };

  const calculateTotalPoints = () => {
    return selectedExperiences.reduce((total, id) => {
      const experience = experiences.find(e => e.id === id);
      return total + (experience ? experience.points : 0);
    }, 0);
  };

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
      
      // Processar cada resgate individualmente
      for (const experienceId of selectedExperiences) {
        const success = await createRedeem(experienceId);
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
          description: `${successCount} experiência(s) resgatada(s) com sucesso${failCount > 0 ? `, ${failCount} falharam` : ''}.`,
        });
      }
      
      setSelectedExperiences([]);
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

  const totalSelectedPoints = calculateTotalPoints();
  const canRedeem = selectedExperiences.length > 0 && totalSelectedPoints <= userPoints && !isProcessing;
  const remainingPoints = userPoints - totalSelectedPoints;
  const selectedExperienceNames = selectedExperiences.map(id => experiences.find(exp => exp.id === id)?.name).filter(Boolean).join(", ");

  // Show loading state
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
          {/* Header with StandardHeader component */}
          <StandardHeader title="Resgate de Experiências" backLink="/dashboard" />
          
          {/* Main Information Row */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between w-full mb-6 md:mb-8 gap-4 md:gap-6">
            {/* Left Side: Count info */}
            <div className="flex flex-col w-full md:w-auto">
              <p className="text-lg md:text-xl text-[#737373] mt-2 text-left">Total de Experiências: {availableExperiences}</p>
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
                {isProcessing ? "PROCESSANDO..." : "RESGATAR AGORA!"}
              </Button>
            </div>
          </div>
          
          {/* Experience Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-10">
            {experiences.map((experience) => (
              <RedeemExperienceCard 
                key={experience.id}
                id={experience.id}
                name={experience.name}
                image={experience.image_url}
                points={experience.points}
                userPoints={userPoints}
                isSelected={selectedExperiences.includes(experience.id)}
                onSelectChange={(id, selected) => handleSelectChange(id, selected)}
              />
            ))}
          </div>
        </div>
      </main>
      
      {/* Confirmation Dialog */}
      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent className="bg-[#E4E4E4] border border-[#737373]/50 shadow-[10px_10px_15px_#737373] rounded-[10px] p-4 md:p-6 max-w-[90%] md:max-w-[428px] mx-4 md:mx-auto flex flex-col gap-4 md:gap-6">
          <DialogHeader className="flex items-start gap-2">
            <div className="flex items-center gap-2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#BFA76F]">
                <path d="M12 1.99L20.53 19H3.47L12 1.99ZM12 0L1.61 21H22.39L12 0Z" fill="#BFA76F" />
                <path d="M11 10V14H13V10H11ZM11 18V16H13V18H11Z" fill="#BFA76F" />
              </svg>
              <DialogTitle className="text-lg md:text-xl text-[#737373] font-semibold">Confirmação de Resgate</DialogTitle>
            </div>
          </DialogHeader>
          <div className="flex flex-col gap-2 text-left">
            <div className="flex justify-between">
              <p className="text-sm md:text-base text-[#737373] font-medium">Total de Pontos:</p>
              <span className="text-sm md:text-base text-[#BFA76F] font-bold">{userPoints} pontos</span>
            </div>
            <div className="flex justify-between">
              <p className="text-sm md:text-base text-[#737373] font-medium">Pontos Selecionados:</p>
              <span className="text-sm md:text-base text-[#737373] font-bold">-{totalSelectedPoints} pontos</span>
            </div>
            <div className="flex justify-between">
              <p className="text-sm md:text-base text-[#737373] font-medium">Saldo de Pontos:</p>
              <span className="text-sm md:text-base text-[#BFA76F] font-bold">{remainingPoints} pontos</span>
            </div>
            {selectedExperienceNames && (
              <div className="mt-2">
                <p className="text-sm md:text-base text-[#737373] font-medium">Experiências selecionadas:</p>
                <p className="text-sm md:text-base text-[#737373]">{selectedExperienceNames}</p>
              </div>
            )}
          </div>
          <DialogDescription className="text-center text-sm md:text-base text-[#737373]">
            Aperte o botão abaixo para confirmar o Resgate.
          </DialogDescription>
          <Button 
            onClick={handleConfirmRedeem}
            disabled={isProcessing}
            className="bg-[#BFA76F] hover:bg-[#BFA76F]/90 text-white w-full py-2 md:py-3"
          >
            {isProcessing ? "PROCESSANDO..." : "RESGATAR AGORA!"}
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RedeemExperiences;
