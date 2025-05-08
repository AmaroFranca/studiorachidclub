
import React from "react";
import { ArrowLeft } from "lucide-react";
import { SidebarProvider, Sidebar } from "@/components/ui/sidebar";
import { Link } from "react-router-dom";
import ExperienceCard from "@/components/experiences/ExperienceCard";
import AppSidebar from "@/components/layout/AppSidebar";
import { getFormattedDate } from "@/utils/dateUtils";

// Experience data structure
interface Experience {
  id: number;
  name: string;
  image: string;
  points: number;
  remainingPoints: number;
}

// Sample data for experiences
const experiences: Experience[] = [
  {
    id: 1, 
    name: "Jantar Romântico", 
    image: "/lovable-uploads/725aafbb-7d9b-4169-9571-1ffec9b4cbfc.png",
    points: 1200,
    remainingPoints: 930
  },
  {
    id: 2, 
    name: "Day SPA", 
    image: "/lovable-uploads/a26f2756-a870-4948-9e68-e60e987d56f6.png",
    points: 1500,
    remainingPoints: 1230
  },
  {
    id: 3, 
    name: "Sessão de Botox", 
    image: "/lovable-uploads/5cbdd0c4-dc11-4a49-8cdf-814f246bbb75.png",
    points: 1800,
    remainingPoints: 1530
  },
  {
    id: 4, 
    name: "Day Use Premium Casal", 
    image: "/lovable-uploads/f0c97a94-a561-49ca-a0eb-55797b7cb6c2.png",
    points: 2000,
    remainingPoints: 1730
  }
];

const Experiences: React.FC = () => {
  const formattedDate = getFormattedDate();
  
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full">
        <Sidebar className="border-r bg-[#D9D9D9]">
          <AppSidebar activeSection="experiences" />
        </Sidebar>
        
        <main className="flex-1 bg-[#EFEFEF] p-6">
          <div className="max-w-7xl mx-auto">
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
              <h1 className="text-4xl font-bold text-[#737373]">Catálogo de Experiências</h1>
            </div>
            
            {/* Experience Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {experiences.map((experience) => (
                <ExperienceCard 
                  key={experience.id}
                  name={experience.name}
                  image={experience.image}
                  points={experience.points}
                  remainingPoints={experience.remainingPoints}
                />
              ))}
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Experiences;
