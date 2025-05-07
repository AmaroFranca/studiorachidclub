
import React from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardTitle from "@/components/dashboard/DashboardTitle";
import DashboardCards from "@/components/dashboard/DashboardCards";
import { getFormattedDate } from "@/utils/dateUtils";

const Dashboard: React.FC = () => {
  const formattedDate = getFormattedDate();
  
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full">
        <DashboardSidebar />
        
        <main className="flex-1 bg-[#EFEFEF] p-6">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <DashboardHeader formattedDate={formattedDate} />
            
            {/* Page Title */}
            <DashboardTitle />
            
            {/* Cards */}
            <DashboardCards />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
