
import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { SidebarProvider, Sidebar } from "@/components/ui/sidebar";
import { Link } from "react-router-dom";
import RedeemPrizeCard from "@/components/redeem/RedeemPrizeCard";
import AppSidebar from "@/components/layout/AppSidebar";
import { getFormattedDate } from "@/utils/dateUtils";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

// Prize data structure
interface Prize {
  id: number;
  name: string;
  image: string;
  points: number;
}

// Sample data for prizes (same as in Prize.tsx)
const prizes: Prize[] = [
  {
    id: 1, 
    name: "Copo Térmico inox c/ tampa 500 ml", 
    image: "/lovable-uploads/1d7f27da-bcf5-4547-9b79-2a6d1f4865ea.png",
    points: 100
  },
  {
    id: 2, 
    name: "Copo Térmico 1,2L", 
    image: "/lovable-uploads/b6d09a9c-6e5c-4d2f-ac1e-fcf6ceaeefbd.png",
    points: 150
  },
  {
    id: 3, 
    name: "2 Ingressos para o Cinema", 
    image: "/lovable-uploads/0cae2b39-8129-4da7-8c68-a0a2342d5bf5.png",
    points: 200
  },
  {
    id: 4, 
    name: "Gift Card Outback", 
    image: "/lovable-uploads/df66f7b5-06d3-42d3-89ff-19622d6b8f8f.png",
    points: 400
  },
  {
    id: 5, 
    name: "Escova Elétrica Philips Sonic Pro 50", 
    image: "/lovable-uploads/0c6054b2-ce8f-4db3-8229-b5fa253ccce7.png",
    points: 750
  },
  {
    id: 6, 
    name: "Alexa Echo Dot", 
    image: "/lovable-uploads/8ee045bc-a834-4510-8ac3-548896e0a4ca.png",
    points: 900
  }
];

const RedeemPrizes: React.FC = () => {
  const formattedDate = getFormattedDate();
  const { toast } = useToast();
  const [selectedPrizes, setSelectedPrizes] = useState<number[]>([]);
  const userPoints = 270; // Fixed user points for now
  
  const handleSelectChange = (id: number, selected: boolean) => {
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
  
  const handleRedeem = () => {
    toast({
      title: "Resgate realizado com sucesso!",
      description: `Você resgatou ${selectedPrizes.length} item(s) totalizando ${calculateTotalPoints()} pontos.`,
    });
    setSelectedPrizes([]);
  };
  
  const totalSelectedPoints = calculateTotalPoints();
  const canRedeem = selectedPrizes.length > 0 && totalSelectedPoints <= userPoints;
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
              {/* Left Side: Title & Count - Updated format */}
              <div className="flex flex-col">
                <h1 className="text-4xl font-bold text-[#737373] text-left">Resgate de Prêmios</h1>
                <p className="text-xl text-[#737373] mt-2 text-left">Total de Prêmios: {prizes.length}</p>
              </div>
              
              {/* Right Side: Calculator & Button - Updated styling */}
              <div className="flex flex-col">
                {/* Points Calculator - Updated with right-aligned values */}
                <div className="bg-white p-4 rounded-md w-full mb-4">
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
            
            {/* Prize Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {prizes.map((prize) => (
                <RedeemPrizeCard 
                  key={prize.id}
                  id={prize.id}
                  name={prize.name}
                  image={prize.image}
                  points={prize.points}
                  userPoints={userPoints}
                  isSelected={selectedPrizes.includes(prize.id)}
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

export default RedeemPrizes;
