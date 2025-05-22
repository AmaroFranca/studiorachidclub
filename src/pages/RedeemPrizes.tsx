
import React, { useState, useEffect } from "react";
import { SidebarProvider, Sidebar } from "@/components/ui/sidebar";
import { useToast } from "@/hooks/use-toast";
import { getFormattedDate } from "@/utils/dateUtils";
import AppSidebar from "@/components/layout/AppSidebar";
import { Prize } from "@/types/prize";
import RedeemPrizesHeader from "@/components/redeem/RedeemPrizesHeader";
import RedeemPrizesInfo from "@/components/redeem/RedeemPrizesInfo";
import RedeemPrizesGrid from "@/components/redeem/RedeemPrizesGrid";
import RedeemConfirmationDialog from "@/components/redeem/RedeemConfirmationDialog";

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
