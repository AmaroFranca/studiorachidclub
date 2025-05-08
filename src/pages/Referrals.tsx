
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

// Add a CSS class to the body when a dialog is open to enforce the blur effect
const applyGlobalBlur = (shouldBlur: boolean) => {
  if (shouldBlur) {
    document.body.classList.add('dialog-open');
  } else {
    document.body.classList.remove('dialog-open');
  }
};

const Referrals: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const isMobile = useIsMobile();
  
  // Pagination logic
  const itemsPerPage = isMobile ? 10 : 5;
  const pageCount = Math.ceil(mockReferrals.length / itemsPerPage);
  const paginatedReferrals = mockReferrals.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalReferrals = mockReferrals.length;

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
            <ReferralList 
              referrals={paginatedReferrals} 
              blurred={isDialogOpen}
            />
            
            {/* Pagination - in footer */}
            <footer className={`mt-auto py-4 ${isDialogOpen ? 'filter blur-sm' : ''}`}>
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
