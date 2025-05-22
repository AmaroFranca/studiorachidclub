
import React from "react";
import { ArrowLeft } from "lucide-react";
import { SidebarProvider, Sidebar } from "@/components/ui/sidebar";
import { Link } from "react-router-dom";
import PrizeCard from "@/components/prizes/PrizeCard";
import AppSidebar from "@/components/layout/AppSidebar";
import { getFormattedDate } from "@/utils/dateUtils";

// Prize data structure
interface Prize {
  id: number;
  name: string;
  image: string;
  points: number;
  userPoints?: number;
}

// Sample data for prizes
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
    points: 400,
    userPoints: 270
  },
  {
    id: 5, 
    name: "Escova Elétrica Philips Sonic Pro 50", 
    image: "/lovable-uploads/0c6054b2-ce8f-4db3-8229-b5fa253ccce7.png",
    points: 750,
    userPoints: 270
  },
  {
    id: 6, 
    name: "Alexa Echo Dot", 
    image: "/lovable-uploads/8ee045bc-a834-4510-8ac3-548896e0a4ca.png",
    points: 900,
    userPoints: 270
  }
];

const Prizes: React.FC = () => {
  const formattedDate = getFormattedDate();
  
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full">
        <Sidebar className="border-r bg-[#D9D9D9]">
          <AppSidebar activeSection="prizes" />
        </Sidebar>
        
        <main className="flex-1 bg-[#EFEFEF] p-6">
          <div className="content-container">
            {/* Header */}
            <div className="flex justify-between items-center mb-10">
              <div className="flex items-center gap-2">
                <Link to="/rewards" className="flex items-center gap-2 text-[#737373]">
                  <ArrowLeft className="text-[#BFA76F]" />
                  <span className="text-xl font-semibold">Voltar</span>
                </Link>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-[#737373]">{formattedDate}</span>
              </div>
            </div>
            
            {/* Page Title */}
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-[#737373]">Catálogo de Prêmios</h1>
            </div>
            
            {/* Prize Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-10">
              {prizes.map((prize) => (
                <PrizeCard 
                  key={prize.id}
                  name={prize.name}
                  image={prize.image}
                  points={prize.points}
                  userPoints={prize.userPoints}
                />
              ))}
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Prizes;
