import React, { useState, useMemo } from "react";
import { Sidebar } from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import AppSidebar from "@/components/layout/AppSidebar";
import ReferralHeader from "@/components/referrals/ReferralHeader";
import ReferralSummary from "@/components/referrals/ReferralSummary";
import ReferralList from "@/components/referrals/ReferralList";
import ReferralPagination from "@/components/referrals/ReferralPagination";
import { useAuth } from "@/hooks/useAuth";
import { useReferrals } from "@/hooks/useReferrals";
import MobileDropdown from "@/components/mobile/MobileDropdown";

// UI Referral interface to match ReferralCard expectations
interface UIReferral {
  id: number;
  name: string;
  referralDate: string;
  collectedGift: boolean;
  becamePatient: boolean;
}
const Referrals: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filterDays, setFilterDays] = useState<number | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const isMobile = useIsMobile();
  const {
    user
  } = useAuth();
  const {
    referrals,
    loading,
    refetch
  } = useReferrals(user);

  // Transform database referrals to UI format
  const transformedReferrals: UIReferral[] = useMemo(() => {
    return referrals.map(referral => ({
      id: parseInt(referral.id.slice(0, 8), 16),
      // Convert UUID to number for UI
      name: referral.name,
      referralDate: new Date(referral.created_at).toLocaleDateString('pt-BR'),
      collectedGift: referral.collected_gift,
      becamePatient: referral.became_patient
    }));
  }, [referrals]);

  // Filter referrals based on selected period
  const filteredReferrals = useMemo(() => {
    if (!filterDays) return transformedReferrals;
    const dateLimit = new Date();
    dateLimit.setDate(dateLimit.getDate() - filterDays);
    return transformedReferrals.filter(referral => {
      // Convert back to check against original created_at
      const originalReferral = referrals.find(r => r.name === referral.name);
      return originalReferral && new Date(originalReferral.created_at) >= dateLimit;
    });
  }, [transformedReferrals, filterDays, referrals]);

  // Pagination logic
  const itemsPerPage = isMobile ? 10 : 5;
  const pageCount = Math.ceil(filteredReferrals.length / itemsPerPage);

  // Reset to first page when filter changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [filterDays]);
  const paginatedReferrals = filteredReferrals.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalReferrals = filteredReferrals.length;

  // Add event listeners for dialog state
  React.useEffect(() => {
    const handleDialogChange = (event: CustomEvent) => {
      const isOpen = event.detail.open;
      setIsDialogOpen(isOpen);
      if (isOpen) {
        document.body.classList.add('dialog-open');
      } else {
        document.body.classList.remove('dialog-open');
      }
    };

    // Listen for dialog open/close events
    document.addEventListener('dialog-state-change', handleDialogChange as EventListener);
    return () => {
      document.removeEventListener('dialog-state-change', handleDialogChange as EventListener);
      document.body.classList.remove('dialog-open');
    };
  }, []);

  // Override Radix UI Dialog's open/close events
  React.useEffect(() => {
    const originalAddEventListener = Element.prototype.addEventListener;
    const originalRemoveEventListener = Element.prototype.removeEventListener;
    Element.prototype.addEventListener = function (type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions) {
      if (type === 'pointerdown' && this.hasAttribute('data-state')) {
        const wrappedListener = (event: Event) => {
          const dialogState = this.getAttribute('data-state');
          if (dialogState) {
            const isOpen = dialogState === 'open';
            document.dispatchEvent(new CustomEvent('dialog-state-change', {
              detail: {
                open: isOpen
              }
            }));
          }
          if (typeof listener === 'function') listener.call(this, event);else (listener as EventListenerObject).handleEvent(event);
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
  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">
        <div className="text-[#737373]">Carregando...</div>
      </div>;
  }
  return <div className="flex min-h-screen w-full">
      {!isMobile && <Sidebar className="border-r bg-[#D9D9D9] z-10">
          <AppSidebar activeSection="referrals" />
        </Sidebar>}
      
      <main className="flex-1 bg-[#EFEFEF] p-6 flex flex-col">
        <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col my-[30px]">
          {/* Header - Simplified */}
          <ReferralHeader />
          
          {/* Content area - Affected by blur */}
          <div className="flex-1 flex flex-col blur-on-dialog my-0">
            {/* Summary and Actions */}
            <ReferralSummary totalReferrals={totalReferrals} filterDays={filterDays} setFilterDays={setFilterDays} onReferralCreated={refetch} />
            
            {/* Referral List */}
            <ReferralList referrals={paginatedReferrals} blurred={isDialogOpen} />
            
            {/* Pagination - in footer */}
            <footer className="mt-auto py-4">
              <ReferralPagination currentPage={currentPage} pageCount={pageCount} setCurrentPage={setCurrentPage} />
            </footer>
          </div>
        </div>
      </main>
    </div>;
};
export default Referrals;