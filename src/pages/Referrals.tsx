
import React, { useState } from "react";
import { SidebarProvider, Sidebar } from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import AppSidebar from "@/components/layout/AppSidebar";
import ReferralHeader from "@/components/referrals/ReferralHeader";
import ReferralSummary from "@/components/referrals/ReferralSummary";
import ReferralList from "@/components/referrals/ReferralList";
import ReferralPagination from "@/components/referrals/ReferralPagination";
import { mockReferrals } from "@/utils/referralData";
import type { Referral } from "@/utils/referralData";

const Referrals: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const isMobile = useIsMobile();
  
  // Pagination logic
  const itemsPerPage = isMobile ? 10 : 5;
  const pageCount = Math.ceil(mockReferrals.length / itemsPerPage);
  const paginatedReferrals = mockReferrals.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalReferrals = mockReferrals.length;

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full">
        <Sidebar className="border-r bg-[#D9D9D9]">
          <AppSidebar activeSection="referrals" />
        </Sidebar>
        
        <main className="flex-1 bg-[#EFEFEF] p-6 flex flex-col">
          <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col">
            {/* Header */}
            <ReferralHeader />
            
            {/* Summary and Actions */}
            <ReferralSummary
              totalReferrals={totalReferrals}
              date={date}
              setDate={setDate}
            />
            
            {/* Referral List */}
            <ReferralList referrals={paginatedReferrals} />
            
            {/* Pagination - in footer */}
            <footer className="mt-auto py-4">
              <ReferralPagination
                currentPage={currentPage}
                pageCount={pageCount}
                setCurrentPage={setCurrentPage}
              />
            </footer>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Referrals;
