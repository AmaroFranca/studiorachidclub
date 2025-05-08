
import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { getFormattedDate } from "@/utils/dateUtils";

const ReferralHeader: React.FC = () => {
  const formattedDate = getFormattedDate();
  
  return (
    <div className="flex justify-between items-center mb-8">
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
  );
};

export default ReferralHeader;
