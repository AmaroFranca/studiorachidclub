
import { useState } from "react";

interface Experience {
  id: string;
  name: string;
  points: number;
  image_url: string;
}

interface ExperienceSelectionManagerProps {
  experiences: Experience[];
  userPoints: number;
  onRedeemClick: (selectedIds: string[], totalPoints: number, selectedNames: string) => void;
  isProcessing: boolean;
}

export const useExperienceSelection = (experiences: Experience[]) => {
  const [selectedExperiences, setSelectedExperiences] = useState<string[]>([]);

  const handleSelectChange = (id: string, selected: boolean) => {
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

  const getSelectedExperienceNames = () => {
    return selectedExperiences
      .map(id => experiences.find(exp => exp.id === id)?.name)
      .filter(Boolean)
      .join(", ");
  };

  const clearSelection = () => {
    setSelectedExperiences([]);
  };

  return {
    selectedExperiences,
    handleSelectChange,
    calculateTotalPoints,
    getSelectedExperienceNames,
    clearSelection,
  };
};
