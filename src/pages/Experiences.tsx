
import React from "react";
import { Sidebar } from "@/components/ui/sidebar";
import ExperienceCard from "@/components/experiences/ExperienceCard";
import AppSidebar from "@/components/layout/AppSidebar";
import StandardHeader from "@/components/layout/StandardHeader";
import { useIsMobile } from "@/hooks/use-mobile";

// Experience data structure
interface Experience {
  id: number;
  name: string;
  image: string;
  points: number;
  remainingPoints: number;
}

// Updated data for experiences with correct image paths
const experiences: Experience[] = [
  {
    id: 1, 
    name: "Jantar Romântico", 
    image: "/lovable-uploads/58ca1406-12b0-40f7-99e4-3e95399aba2d.png", // Updated image path for Jantar Romântico
    points: 1200,
    remainingPoints: 930
  },
  {
    id: 2, 
    name: "Day SPA", 
    image: "/lovable-uploads/311d5302-7995-40d9-be5f-7e133f56ee02.png", // Updated image path for Day SPA
    points: 1500,
    remainingPoints: 1230
  },
  {
    id: 3, 
    name: "Sessão de Botox", 
    image: "/lovable-uploads/6c3d02cd-a2bb-4342-b029-77943282812d.png", // Updated image path for Sessão de Botox
    points: 1800,
    remainingPoints: 1530
  },
  {
    id: 4, 
    name: "Day Use Premium Casal", 
    image: "/lovable-uploads/25a966a8-5d2d-4a7f-984e-f09c50bcddac.png", // Updated image path for Day Use Premium Casal
    points: 2000,
    remainingPoints: 1730
  }
];

const Experiences: React.FC = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="flex min-h-screen w-full">
      {!isMobile && (
        <Sidebar className="border-r bg-[#D9D9D9]">
          <AppSidebar activeSection="experiences" />
        </Sidebar>
      )}
      
      <main className="flex-1 bg-[#EFEFEF] p-3 md:p-6">
        <div className="content-container">
          <StandardHeader 
            title="Catálogo de Experiências"
            backLink="/rewards"
          />
          
          {/* Experience Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-10">
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
  );
};

export default Experiences;
