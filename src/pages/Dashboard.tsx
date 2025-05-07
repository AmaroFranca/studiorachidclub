
import React from "react";
import { SidebarProvider, Sidebar } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard/SidebarMenu";
import { ProfileDropdown } from "@/components/dashboard/ProfileDropdown";
import { ScoreCard } from "@/components/dashboard/ScoreCard";
import { ReferralCard } from "@/components/dashboard/ReferralCard";
import { formatDate } from "@/components/dashboard/DateFormatter";
import { BackgroundText } from "@/components/registration/BackgroundText";

const Dashboard: React.FC = () => {
  const currentDate = new Date();
  const formattedDate = formatDate(currentDate);
  
  return (
    <div 
      className="min-h-screen w-full overflow-hidden"
      style={{
        background: `linear-gradient(247deg, #B1C9C3 0%, #000 100%)`
      }}
    >
      <BackgroundText text="Rachid" position="bottomLeft" />
      <BackgroundText text="Studio" position="topRight" />
      
      <SidebarProvider defaultOpen={true}>
        <div className="flex min-h-screen w-full relative">
          <Sidebar className="border-r bg-[#D9D9D9] relative z-10">
            <DashboardSidebar />
          </Sidebar>
          
          <main className="flex-1 bg-transparent p-6 relative z-10">
            <div className="max-w-5xl mx-auto">
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-2xl font-semibold text-[#EFEFEF]">Olá, Amaro</h2>
                <ProfileDropdown formattedDate={formattedDate} />
              </div>
              
              <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-[#EFEFEF]">Studio Rachid Club</h1>
              </div>
              
              <div className="flex flex-col md:flex-row gap-6 justify-center">
                <ScoreCard />
                <ReferralCard />
              </div>
            </div>
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default Dashboard;
