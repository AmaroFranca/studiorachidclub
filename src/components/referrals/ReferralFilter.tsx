
import React from "react";
import { Filter } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Button } from "@/components/ui/button";

interface ReferralFilterProps {
  filterDays: number | null;
  setFilterDays: (days: number | null) => void;
}

const ReferralFilter: React.FC<ReferralFilterProps> = ({ filterDays, setFilterDays }) => {
  // Filter periods in days (7, 14, 28, 30*1, 30*2, 30*3, 30*6, 30*12)
  const filterOptions = [
    { label: "7d", days: 7 },
    { label: "14d", days: 14 },
    { label: "28d", days: 28 },
    { label: "1m", days: 30 },
    { label: "2m", days: 60 },
    { label: "3m", days: 90 },
    { label: "6m", days: 180 },
    { label: "12m", days: 360 }
  ];

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2 px-4 py-2 border border-[#737373]/50 rounded-md text-[#737373] font-semibold">
        <Filter className="h-4 w-4 text-[#BFA76F]" />
        <span>Filtro</span>
      </div>
      
      <div className="mt-2 flex flex-wrap gap-1.5 items-center">
        <ToggleGroup type="single" value={filterDays?.toString() || ""} onValueChange={(value) => setFilterDays(value ? parseInt(value) : null)}>
          {filterOptions.map((option, index) => {
            // Calculate the gap multiplier to create progressive spacing
            // First items have small gaps, later items have larger gaps
            const spacingClass = index < 3 ? "mr-0.5" : 
                                index < 5 ? "mr-1" : "mr-1.5";
            
            return (
              <ToggleGroupItem 
                key={option.days} 
                value={option.days.toString()} 
                className={`${spacingClass} px-2 py-1 text-xs rounded-md border ${filterDays === option.days ? 'bg-[#BFA76F] text-white border-[#BFA76F]' : 'text-[#737373] border-[#737373]/30'}`}
              >
                {option.label}
              </ToggleGroupItem>
            );
          })}
        </ToggleGroup>
        
        {filterDays !== null && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setFilterDays(null)}
            className="text-xs text-[#737373] hover:text-[#BFA76F]"
          >
            Limpar
          </Button>
        )}
      </div>
    </div>
  );
};

export default ReferralFilter;
