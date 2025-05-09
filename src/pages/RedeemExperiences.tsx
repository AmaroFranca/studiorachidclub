
import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { SidebarProvider, Sidebar } from "@/components/ui/sidebar";
import { Link } from "react-router-dom";
import RedeemExperienceCard from "@/components/redeem/RedeemExperienceCard";
import AppSidebar from "@/components/layout/AppSidebar";
import { getFormattedDate } from "@/utils/dateUtils";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

// Experience data structure
interface Experience {
  id: number;
  name: string;
  image: string;
  points: number;
}

// Updated data for experiences with correct image paths (same as in Experiences.tsx)
const experiences: Experience[] = [
  {
    id: 1, 
    name: "Jantar Romântico", 
    image: "/lovable-uploads/58ca1406-12b0-40f7-99e4-3e95399aba2d.png",
    points: 1200
  },
  {
    id: 2, 
    name: "Day SPA", 
    image: "/lovable-uploads/311d5302-7995-40d9-be5f-7e133f56ee02.png",
    points: 1500
  },
  {
    id: 3, 
    name: "Sessão de Botox", 
    image: "/lovable-uploads/6c3d02cd-a2bb-4342-b029-77943282812d.png",
    points: 1800
  },
  {
    id: 4, 
    name: "Day Use Premium Casal", 
    image: "/lovable-uploads/25a966a8-5d2d-4a7f-984e-f09c50bcddac.png",
    points: 2000
  }
];

const RedeemExperiences: React.FC = () => {
  const formattedDate = getFormattedDate();
  const { toast } = useToast();
  const [selectedExperiences, setSelectedExperiences] = useState<number[]>([]);
  const userPoints = 270; // Fixed user points for now
  
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
  
  const handleRedeem = () => {
    toast({
      title: "Resgate realizado com sucesso!",
      description: `Você resgatou ${selectedExperiences.length} experiência(s) totalizando ${calculateTotalPoints()} pontos.`,
    });
    setSelectedExperiences([]);
  };
  
  const totalSelectedPoints = calculateTotalPoints();
  const canRedeem = selectedExperiences.length > 0 && totalSelectedPoints <= userPoints;
  const remainingPoints = userPoints - totalSelectedPoints;
  
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full">
        <Sidebar className="border-r bg-[#D9D9D9]">
          <AppSidebar activeSection="redeem" />
        </Sidebar>
        
        <main className="flex-1 bg-[#EFEFEF] p-6">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex justify-between items-center mb-10">
              <div className="flex items-center gap-2">
                <Link to="/dashboard" className="flex items-center gap-2 text-[#737373]">
                  <ArrowLeft className="text-[#BFA76F]" />
                  <span className="text-xl font-semibold">Voltar</span>
                </Link>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-[#737373]">{formattedDate}</span>
              </div>
            </div>
            
            {/* Main Information Row */}
            <div className="flex flex-row items-center justify-between w-full mb-8" style={{gap: "177px"}}>
              {/* Left Side: Title & Count - Updated to show available experiences */}
              <div className="flex flex-col">
                <h1 className="text-4xl font-bold text-[#737373] text-left">Resgate de Experiências</h1>
                <p className="text-xl text-[#737373] mt-2 text-left">Total de Experiências: {availableExperiences}</p>
              </div>
              
              {/* Right Side: Calculator & Button - Widened calculator box */}
              <div className="flex flex-col">
                {/* Points Calculator - Widened with more padding */}
                <div className="bg-white p-4 px-8 rounded-md w-full mb-4 min-w-[280px]">
                  <div className="flex justify-between">
                    <p className="text-[#737373] font-medium">Pontos disponíveis:</p>
                    <span className="text-[#BFA76F] font-bold">{userPoints}</span>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-[#737373] font-medium">Pontos selecionados:</p>
                    <span className="text-[#737373] font-bold">-{totalSelectedPoints}</span>
                  </div>
                  <hr className="my-2" />
                  <div className="flex justify-between">
                    <p className="text-[#737373] font-medium">Saldo de pontos:</p>
                    <span className="text-[#BFA76F] font-bold">{remainingPoints}</span>
                  </div>
                </div>
                
                {/* Redeem Button */}
                <Button 
                  disabled={!canRedeem} 
                  onClick={handleRedeem}
                  className="bg-[#BFA76F] hover:bg-[#BFA76F]/90 text-white w-full py-3"
                >
                  RESGATAR AGORA!
                </Button>
              </div>
            </div>
            
            {/* Experience Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {experiences.map((experience) => (
                <RedeemExperienceCard 
                  key={experience.id}
                  id={experience.id}
                  name={experience.name}
                  image={experience.image}
                  points={experience.points}
                  userPoints={userPoints}
                  isSelected={selectedExperiences.includes(experience.id)}
                  onSelectChange={handleSelectChange}
                />
              ))}
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default RedeemExperiences;
