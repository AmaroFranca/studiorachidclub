import React, { useState } from "react";
import { Plus } from "lucide-react";
import ReferralFilter from "./ReferralFilter";
import ReferralFormDialog from "./ReferralFormDialog";
import ReferralSuccessDialog from "./ReferralSuccessDialog";
import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/useProfile";
import { useReferrals } from "@/hooks/useReferrals";
import { supabase } from "@/integrations/supabase/client";
interface ReferralSummaryProps {
  totalReferrals: number;
  filterDays: number | null;
  setFilterDays: (days: number | null) => void;
  onReferralCreated: () => void;
}
const ReferralSummary: React.FC<ReferralSummaryProps> = ({
  totalReferrals,
  filterDays,
  setFilterDays,
  onReferralCreated
}) => {
  const {
    user
  } = useAuth();
  const {
    profile
  } = useProfile(user);
  const {
    createReferral
  } = useReferrals(user);
  const [formDialogOpen, setFormDialogOpen] = useState(false);
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const [lastCreatedReferralId, setLastCreatedReferralId] = useState<string | undefined>(undefined);
  const handleReferButtonClick = () => {
    setFormDialogOpen(true);
  };
  const handleFormSubmit = async (data: {
    name: string;
    phone: string;
    relationship: string;
  }) => {
    const success = await createReferral(data);
    if (success) {
      // Aqui precisamos obter o ID da indicação recém-criada
      const {
        data: newReferrals
      } = await supabase.from('referrals').select('id').eq('user_id', user?.id).order('created_at', {
        ascending: false
      }).limit(1);
      if (newReferrals && newReferrals.length > 0) {
        setLastCreatedReferralId(newReferrals[0].id);
      }
      setFormDialogOpen(false);
      setSuccessDialogOpen(true);
      onReferralCreated();
    }
  };
  return <>
      <div className="mb-10">
        <h1 className="text-2xl font-semibold text-[#737373] mb-4 text-left">Pessoas Indicadas</h1>
        
        <div className="flex flex-col md:flex-row justify-between md:items-start bg-[#EFEFEF] p-4 rounded-lg mb-8 px-0">
          <div className="mb-4 md:mb-0 text-left">
            <h2 className="font-semibold text-[#737373] text-left text-base">
              Total de <span className="text-[#BFA76F]">{totalReferrals.toString().padStart(2, '0')}</span> indicações Realizadas
            </h2>
            <p className="text-base font-semibold text-[#737373] text-left">
              Total de Pontos: <span className="text-[#BFA76F]">{profile?.points || 0}</span> pontos
            </p>
            
            <div className="mt-4">
              <ReferralFilter filterDays={filterDays} setFilterDays={setFilterDays} totalReferrals={totalReferrals} />
            </div>
          </div>
          
          <div>
            <button onClick={handleReferButtonClick} className="px-6 py-3 bg-[#BFA76F] rounded-md text-white font-semibold hover:bg-[#BFA76F]/90 transition-colors flex items-center gap-2 text-justify">
              <Plus className="h-5 w-5" />
              QUERO INDICAR AGORA!
            </button>
          </div>
        </div>
      </div>

      <ReferralFormDialog open={formDialogOpen} onOpenChange={setFormDialogOpen} onSubmit={handleFormSubmit} />
      
      <ReferralSuccessDialog open={successDialogOpen} onOpenChange={setSuccessDialogOpen} referralId={lastCreatedReferralId} />
    </>;
};
export default ReferralSummary;