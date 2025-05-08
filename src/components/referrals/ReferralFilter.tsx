
import React from "react";
import { Filter } from "lucide-react";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

interface ReferralFilterProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
}

const ReferralFilter: React.FC<ReferralFilterProps> = ({ date, setDate }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="flex items-center gap-2 px-4 py-2 border border-[#737373]/50 rounded-md text-[#737373] font-semibold">
          <Filter className="h-4 w-4 text-[#BFA76F]" />
          <span>Filtro</span>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-4">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border pointer-events-auto"
        />
      </PopoverContent>
    </Popover>
  );
};

export default ReferralFilter;
