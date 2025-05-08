
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
}

const ReferralList: React.FC<ReferralListProps> = ({ referrals }) => {
  return (
    <div className="mb-8 flex-1">
      {referrals.map((referral) => (
        <ReferralCard key={referral.id} referral={referral} />
      ))}
    </div>
  );
};

export default ReferralList;
