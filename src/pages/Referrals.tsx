import React, { useState, useMemo } from "react";
import { SidebarProvider, Sidebar } from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import AppSidebar from "@/components/layout/AppSidebar";
import ReferralHeader from "@/components/referrals/ReferralHeader";
import ReferralSummary from "@/components/referrals/ReferralSummary";
import ReferralList from "@/components/referrals/ReferralList";
import ReferralPagination from "@/components/referrals/ReferralPagination";
import { mockReferrals } from "@/utils/referralData";
import { isDateWithinDays } from "@/utils/dateUtils";
import type { Referral } from "@/utils/referralData";

// Add a CSS class to specific elements when a dialog is open to enforce the blur effect
const applyGlobalBlur = (shouldBlur: boolean) => {
  if (shouldBlur) {
    document.body.classList.add('dialog-open');
  } else {
    document.body.classList.remove('dialog-open');
  }
};

const Referrals: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filterDays, setFilterDays] = useState<number | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const isMobile = useIsMobile();
  
  // Filter referrals based on selected period
  const filteredReferrals = useMemo(() => {
    if (!filterDays) return mockReferrals;
    
    return mockReferrals.filter(referral => 
      isDateWithinDays(referral.referralDate, filterDays)
    );
  }, [filterDays]);

  // Pagination logic
  const itemsPerPage = isMobile ? 10 : 5;
  const pageCount = Math.ceil(filteredReferrals.length / itemsPerPage);
  
  // Reset to first page when filter changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [filterDays]);

  const paginatedReferrals = filteredReferrals.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalReferrals = filteredReferrals.length;

  // Add event listeners for dialog state
  React.useEffect(() => {
    const handleDialogChange = (event: CustomEvent) => {
      const isOpen = event.detail.open;
      setIsDialogOpen(isOpen);
      applyGlobalBlur(isOpen);
    };

    // Listen for dialog open/close events
    document.addEventListener('dialog-state-change', handleDialogChange as EventListener);
    
    return () => {
      document.removeEventListener('dialog-state-change', handleDialogChange as EventListener);
      applyGlobalBlur(false);
    };
  }, []);

  // Override Radix UI Dialog's open/close events
  React.useEffect(() => {
    const originalAddEventListener = Element.prototype.addEventListener;
    const originalRemoveEventListener = Element.prototype.removeEventListener;
    
    Element.prototype.addEventListener = function(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions) {
      if (type === 'pointerdown' && this.hasAttribute('data-state')) {
        const wrappedListener = (event: Event) => {
          const dialogState = this.getAttribute('data-state');
          if (dialogState) {
            const isOpen = dialogState === 'open';
            document.dispatchEvent(new CustomEvent('dialog-state-change', { detail: { open: isOpen } }));
          }
          if (typeof listener === 'function') listener.call(this, event);
          else (listener as EventListenerObject).handleEvent(event);
        };
        return originalAddEventListener.call(this, type, wrappedListener, options);
      }
      return originalAddEventListener.call(this, type, listener, options);
    };
    
    return () => {
      Element.prototype.addEventListener = originalAddEventListener;
      Element.prototype.removeEventListener = originalRemoveEventListener;
    };
  }, []);

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full">
        {/* Sidebar - Not affected by blur */}
        <Sidebar className="border-r bg-[#D9D9D9] z-10">
          <AppSidebar activeSection="referrals" />
        </Sidebar>
        
        <main className="flex-1 bg-[#EFEFEF] p-6 flex flex-col">
          <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col">
            {/* Header - Not affected by blur */}
            <div className="z-10 relative">
              <ReferralHeader />
            </div>
            
            {/* Content area - Affected by blur */}
            <div className="flex-1 flex flex-col blur-on-dialog">
              {/* Summary and Actions */}
              <ReferralSummary
                totalReferrals={totalReferrals}
                filterDays={filterDays}
                setFilterDays={setFilterDays}
              />
              
              {/* Referral List */}
              <ReferralList 
                referrals={paginatedReferrals} 
                blurred={isDialogOpen}
              />
              
              {/* Pagination - in footer */}
              <footer className="mt-auto py-4">
                <ReferralPagination
                  currentPage={currentPage}
                  pageCount={pageCount}
                  setCurrentPage={setCurrentPage}
                />
              </footer>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Referrals;
