import React, { useState } from "react";
import { Sidebar } from "@/components/ui/sidebar";
import RedeemExperienceCard from "@/components/redeem/RedeemExperienceCard";
import AppSidebar from "@/components/layout/AppSidebar";
import { getFormattedDate } from "@/utils/dateUtils";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import StandardHeader from "@/components/layout/StandardHeader";

// Experience data structure
interface Experience {
  id: number;
  name: string;
  image: string;
  points: number;
}

// Updated data for experiences with correct image paths (same as in Experiences.tsx)
const experiences: Experience[] = [{
  id: 1,
  name: "Jantar Romântico",
  image: "/lovable-uploads/58ca1406-12b0-40f7-99e4-3e95399aba2d.png",
  points: 1200
}, {
  id: 2,
  name: "Day SPA",
  image: "/lovable-uploads/311d5302-7995-40d9-be5f-7e133f56ee02.png",
  points: 1500
}, {
  id: 3,
  name: "Sessão de Botox",
  image: "/lovable-uploads/6c3d02cd-a2bb-4342-b029-77943282812d.png",
  points: 1800
}, {
  id: 4,
  name: "Day Use Premium Casal",
  image: "/lovable-uploads/25a966a8-5d2d-4a7f-984e-f09c50bcddac.png",
  points: 2000
}];
const RedeemExperiences: React.FC = () => {
  const formattedDate = getFormattedDate();
  const {
    toast
  } = useToast();
  const [selectedExperiences, setSelectedExperiences] = useState<number[]>([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const userPoints = 270; // Fixed user points for now
  const isMobile = useIsMobile();

  // Calculate available experiences based on user points
  const availableExperiences = experiences.filter(exp => userPoints >= exp.points).length;
  const handleSelectChange = (id: number, selected: boolean) => {
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
  const handleConfirmRedeem = () => {
    toast({
      title: "Resgate realizado com sucesso!",
      description: `Você resgatou ${selectedExperiences.length} experiência(s) totalizando ${calculateTotalPoints()} pontos.`
    });
    setSelectedExperiences([]);
    setShowConfirmation(false);
  };
  const handleCancelRedeem = () => {
    setShowConfirmation(false);
  };
  const totalSelectedPoints = calculateTotalPoints();
  const canRedeem = selectedExperiences.length > 0 && totalSelectedPoints <= userPoints;
  const remainingPoints = userPoints - totalSelectedPoints;
  const selectedExperienceNames = selectedExperiences.map(id => experiences.find(exp => exp.id === id)?.name).filter(Boolean).join(", ");
  return <div className="flex min-h-screen w-full">
      {!isMobile && <Sidebar className="border-r bg-[#D9D9D9]">
          <AppSidebar activeSection="redeem" />
        </Sidebar>}
      
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
              <Button disabled={!canRedeem} onClick={handleRedeemClick} className="bg-[#BFA76F] hover:bg-[#BFA76F]/90 text-white w-full py-2 md:py-3">
                RESGATAR AGORA!
              </Button>
            </div>
          </div>
          
          {/* Experience Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-10">
            {experiences.map(experience => <RedeemExperienceCard key={experience.id} id={experience.id} name={experience.name} image={experience.image} points={experience.points} userPoints={userPoints} isSelected={selectedExperiences.includes(experience.id)} onSelectChange={handleSelectChange} />)}
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
            {selectedExperienceNames && <div className="mt-2">
                <p className="text-sm md:text-base text-[#737373] font-medium">Experiências selecionadas:</p>
                <p className="text-sm md:text-base text-[#737373]">{selectedExperienceNames}</p>
              </div>}
          </div>
          <DialogDescription className="text-center text-sm md:text-base text-[#737373]">
            Aperte o botão abaixo para confirmar o Resgate.
          </DialogDescription>
          <Button onClick={handleConfirmRedeem} className="bg-[#BFA76F] hover:bg-[#BFA76F]/90 text-white w-full py-2 md:py-3">
            RESGATAR AGORA!
          </Button>
        </DialogContent>
      </Dialog>
    </div>;
};
export default RedeemExperiences;