
import React from "react";
import StatsCard from "./StatsCard";
import IndicationCard from "./IndicationCard";

const DashboardCards: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <StatsCard />
      <IndicationCard />
    </div>
  );
};

export default DashboardCards;
