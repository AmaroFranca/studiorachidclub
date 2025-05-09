
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
            
            {/* Page Title */}
            <div className="text-center mb-6">
              <h1 className="text-4xl font-bold text-[#737373]">Resgate de Prêmios</h1>
            </div>
            
            {/* Points Summary */}
            <div className="flex justify-between items-center mb-8 bg-[#D9D9D9] p-4 rounded-md">
              <div>
                <p className="text-[#737373] font-medium">Pontos disponíveis: <span className="text-[#BFA76F] font-bold">{userPoints}</span></p>
                <p className="text-[#737373] font-medium">Pontos selecionados: <span className="text-[#BFA76F] font-bold">{totalSelectedPoints}</span></p>
              </div>
              <div>
                <Link to="/redeem-experiences">
                  <Button 
                    variant="outline" 
                    className="mr-4 border-[#BFA76F] text-[#737373] hover:text-[#737373] hover:bg-[#BFA76F]/10"
                  >
                    Ver Experiências
                  </Button>
                </Link>
                <Button 
                  disabled={!canRedeem} 
                  onClick={handleRedeem}
                  className="bg-[#BFA76F] hover:bg-[#BFA76F]/90 text-white"
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
            
            {/* Footer Action */}
            {selectedPrizes.length > 0 && (
              <div className="mt-8 text-center">
                <Button 
                  onClick={handleRedeem}
                  disabled={!canRedeem}
                  className="bg-[#BFA76F] hover:bg-[#BFA76F]/90 text-white px-8 py-6 text-lg"
                >
                  RESGATAR AGORA!
                </Button>
                {!canRedeem && (
                  <p className="text-red-500 mt-2">
                    Pontos insuficientes para realizar o resgate
                  </p>
                )}
              </div>
            )}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default RedeemPrizes;
