
import React from "react";
import ReferralCard from "./ReferralCard";

interface Referral {
  id: number;
  name: string;
  referralDate: string;
  collectedGift: boolean;
  becamePatient: boolean;
}

interface ReferralListProps {
  referrals: Referral[];
  blurred?: boolean;
}

const ReferralList: React.FC<ReferralListProps> = ({ referrals, blurred = false }) => {
  return (
    <div className={`mb-8 flex-1 ${blurred ? 'filter blur-sm transition-all blur-on-dialog' : ''}`}>
      {referrals.length === 0 ? (
        <div className="py-10 text-center text-[#737373]">
          <p>Nenhuma indicação encontrada.</p>
        </div>
      ) : (
        <div className="flex flex-col space-y-4 max-w-3xl mx-auto">
          {referrals.map((referral) => (
            <ReferralCard key={referral.id} referral={referral} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ReferralList;
