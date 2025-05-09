
import React from "react";
import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ReferralFilterProps {
  filterDays: number | null;
  setFilterDays: (days: number | null) => void;
}

const ReferralFilter: React.FC<ReferralFilterProps> = ({ filterDays, setFilterDays }) => {
  // Filter periods in days (7, 14, 28, 30*1, 30*2, 30*3, 30*6, 30*12)
  const filterOptions = [
    { label: "7 dias", value: "7", days: 7 },
    { label: "14 dias", value: "14", days: 14 },
    { label: "28 dias", value: "28", days: 28 },
    { label: "1 mês", value: "30", days: 30 },
    { label: "2 meses", value: "60", days: 60 },
    { label: "3 meses", value: "90", days: 90 },
    { label: "6 meses", value: "180", days: 180 },
    { label: "12 meses", value: "360", days: 360 }
  ];

  const handleValueChange = (value: string) => {
    if (value) {
      setFilterDays(parseInt(value, 10));
    } else {
      setFilterDays(null);
    }
  };

  // Get the label for the currently selected filter
  const getSelectedFilterLabel = () => {
    if (filterDays === null) return "";
    const selectedOption = filterOptions.find(option => option.days === filterDays);
    return selectedOption ? selectedOption.label : "";
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="relative">
        <Select
          value={filterDays?.toString() || ""}
          onValueChange={handleValueChange}
        >
          <SelectTrigger 
            className="w-full px-4 py-2 flex items-center gap-2 border border-[#737373]/50 rounded-md text-[#737373] font-semibold bg-white"
          >
            <Filter className="h-4 w-4 text-[#BFA76F]" />
            <SelectValue placeholder="Filtro" />
          </SelectTrigger>
          <SelectContent className="bg-white border border-[#737373]/20 rounded-md shadow-md z-50">
            {filterOptions.map((option) => (
              <SelectItem 
                key={option.value} 
                value={option.value}
                className="text-[#737373] hover:text-[#BFA76F] hover:bg-[#F5F5F5] cursor-pointer"
              >
                {option.label}
              </SelectItem>
            ))}
            {filterDays !== null && (
              <div className="px-2 py-2 border-t border-[#737373]/20 mt-1">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setFilterDays(null)}
                  className="w-full text-xs text-[#737373] hover:text-[#BFA76F] justify-start px-2"
                >
                  Limpar filtro
                </Button>
              </div>
            )}
          </SelectContent>
        </Select>
      </div>
      
      {filterDays !== null && (
        <div className="text-xs text-[#737373] font-medium mt-1">
          Filtrado por: {getSelectedFilterLabel()}
        </div>
      )}
    </div>
  );
};

export default ReferralFilter;
