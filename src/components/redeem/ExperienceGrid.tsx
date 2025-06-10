
import React from "react";
import RedeemExperienceCard from "./RedeemExperienceCard";

interface Experience {
  id: string;
  name: string;
  points: number;
  image_url: string;
}

interface ExperienceGridProps {
  experiences: Experience[];
  userPoints: number;
  selectedExperiences: string[];
  onSelectChange: (id: string, selected: boolean) => void;
}

const ExperienceGrid: React.FC<ExperienceGridProps> = ({
  experiences,
  userPoints,
  selectedExperiences,
  onSelectChange,
}) => {
  return (
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
          onSelectChange={onSelectChange}
        />
      ))}
    </div>
  );
};

export default ExperienceGrid;
