
import React from "react";
import { Plus } from "lucide-react";
import ReferralFilter from "./ReferralFilter";

interface ReferralSummaryProps {
  totalReferrals: number;
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
}

const ReferralSummary: React.FC<ReferralSummaryProps> = ({ 
  totalReferrals, 
  date, 
  setDate 
}) => {
  return (
    <div className="mb-10">
      <h1 className="text-2xl font-semibold text-[#737373] mb-4 text-left">Pessoas Indicadas</h1>
      
      <div className="flex flex-col md:flex-row justify-between md:items-start bg-[#EFEFEF] mb-8">
        <div className="mb-4 md:mb-0 text-left">
          <h2 className="text-xl font-semibold text-[#737373] text-left">
            Total de <span className="text-[#BFA76F]">{totalReferrals.toString().padStart(2, '0')}</span> indicações Realizadas
          </h2>
          <p className="text-base font-semibold text-[#737373] text-left">
            Total de Pontos: <span className="text-[#BFA76F]">270</span> pontos
          </p>
          
          <div className="mt-4">
            <ReferralFilter date={date} setDate={setDate} />
          </div>
        </div>
        
        <div>
          <button className="px-6 py-3 bg-[#BFA76F] rounded-md text-white font-semibold hover:bg-[#BFA76F]/90 transition-colors flex items-center gap-2">
            <Plus className="h-5 w-5" />
            QUERO INDICAR AGORA!
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReferralSummary;
