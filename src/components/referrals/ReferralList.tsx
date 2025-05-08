
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
    <div className={`mb-8 flex-1 ${blurred ? 'filter blur-sm transition-all' : ''}`}>
      {referrals.map((referral) => (
        <ReferralCard key={referral.id} referral={referral} />
      ))}
    </div>
  );
};

export default ReferralList;
