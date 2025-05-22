
import React, { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { SidebarProvider, Sidebar } from "@/components/ui/sidebar";
import { Link } from "react-router-dom";
import RedeemPrizeCard from "@/components/redeem/RedeemPrizeCard";
import AppSidebar from "@/components/layout/AppSidebar";
import { getFormattedDate } from "@/utils/dateUtils";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

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
  const [showConfirmation, setShowConfirmation] = useState(false);
  const userPoints = 270; // Fixed user points for now
  
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
  
  // Calculate available prizes based on user points
  const availablePrizes = prizes.filter(prize => userPoints >= prize.points).length;
  
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
  
  const handleCancelRedeem = () => {
    setShowConfirmation(false);
  };
  
  const totalSelectedPoints = calculateTotalPoints();
  const canRedeem = selectedPrizes.length > 0 && totalSelectedPoints <= userPoints;
  const remainingPoints = userPoints - totalSelectedPoints;
  
  const selectedPrizeNames = selectedPrizes
    .map(id => prizes.find(p => p.id === id)?.name)
    .filter(Boolean)
    .join(", ");
  
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
              {/* Left Side: Title & Count - Updated to show available prizes */}
              <div className="flex flex-col">
                <h1 className="text-4xl font-bold text-[#737373] text-left">Resgate de Prêmios</h1>
                <p className="text-xl text-[#737373] mt-2 text-left">Total de Prêmios: {availablePrizes}</p>
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
                  onClick={handleRedeemClick}
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
      
      {/* Updated Confirmation Dialog to match standard styling */}
      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent className="bg-[#E4E4E4] p-6 max-w-[428px]">
          <DialogHeader className="flex items-start gap-2">
            <div className="flex items-center gap-2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#BFA76F]">
                <path d="M12 1.99L20.53 19H3.47L12 1.99ZM12 0L1.61 21H22.39L12 0Z" fill="#BFA76F"/>
                <path d="M11 10V14H13V10H11ZM11 18V16H13V18H11Z" fill="#BFA76F"/>
              </svg>
              <DialogTitle className="text-xl text-[#737373] font-semibold">Confirmação de Resgate</DialogTitle>
            </div>
          </DialogHeader>
          <div className="flex flex-col gap-2 text-left">
            <div className="flex justify-between">
              <p className="text-[#737373] font-medium">Total de Pontos:</p>
              <span className="text-[#BFA76F] font-bold">{userPoints} pontos</span>
            </div>
            <div className="flex justify-between">
              <p className="text-[#737373] font-medium">Pontos Selecionados:</p>
              <span className="text-[#737373] font-bold">-{totalSelectedPoints} pontos</span>
            </div>
            <div className="flex justify-between">
              <p className="text-[#737373] font-medium">Saldo de Pontos:</p>
              <span className="text-[#BFA76F] font-bold">{remainingPoints} pontos</span>
            </div>
            {selectedPrizeNames && (
              <div className="mt-2">
                <p className="text-[#737373] font-medium">Prêmios selecionados:</p>
                <p className="text-[#737373]">{selectedPrizeNames}</p>
              </div>
            )}
          </div>
          <DialogDescription className="text-center text-[#737373]">
            Aperte o botão abaixo para confirmar o Resgate.
          </DialogDescription>
          <Button 
            onClick={handleConfirmRedeem}
            className="bg-[#BFA76F] hover:bg-[#BFA76F]/90 text-white w-full py-3"
          >
            RESGATAR AGORA!
          </Button>
        </DialogContent>
      </Dialog>
    </SidebarProvider>
  );
};

export default RedeemPrizes;
