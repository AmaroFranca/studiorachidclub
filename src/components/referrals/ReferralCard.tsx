
import React from "react";
import { Check, User } from "lucide-react";

interface Referral {
  id: number;
  name: string;
  referralDate: string;
  collectedGift: boolean;
  becamePatient: boolean;
}

interface ReferralCardProps {
  referral: Referral;
}

const ReferralCard: React.FC<ReferralCardProps> = ({ referral }) => {
  return (
    <div className="mb-4 bg-[#D9D9D9]/50 rounded-lg shadow-[10px_10px_15px_#737373] p-4 w-full max-w-3xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="bg-[#B1C9C3] h-10 w-10 rounded-full flex items-center justify-center text-[#737373] flex-shrink-0">
            <User size={20} className="text-[#737373]" />
          </div>
          <h3 className="text-lg font-semibold text-[#737373]">{referral.name}</h3>
        </div>
        
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 w-full md:w-auto">
          <div className="text-xs font-semibold">
            <span className="text-[#737373]">Indicado (a) em:</span><br />
            <span className="text-[#BFA76F]">{referral.referralDate}</span>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="flex flex-col text-xs font-semibold text-[#737373] text-center">
                <span>Retirou</span>
                <span>Presente</span>
              </div>
              <div className="h-6 w-6 relative border-2 border-[#BFA76F] rounded">
                {referral.collectedGift && (
                  <Check className="h-5 w-5 absolute text-[#B1C9C3] stroke-[3]" />
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="flex flex-col text-xs font-semibold text-[#737373] text-center">
                <span>Virou</span>
                <span>Paciente</span>
              </div>
              <div className="h-6 w-6 relative border-2 border-[#BFA76F] rounded">
                {referral.becamePatient && (
                  <Check className="h-5 w-5 absolute text-[#B1C9C3] stroke-[3]" />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferralCard;
