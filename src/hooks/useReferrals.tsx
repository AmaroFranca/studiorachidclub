
import { useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Referral {
  id: string;
  user_id: string;
  name: string;
  phone: string;
  relationship: string;
  collected_gift: boolean;
  became_patient: boolean;
  created_at: string;
  updated_at: string;
}

interface CreateReferralData {
  name: string;
  phone: string;
  relationship: string;
}

export const useReferrals = (user: User | null) => {
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      fetchReferrals();
    } else {
      setReferrals([]);
      setLoading(false);
    }
  }, [user]);

  const fetchReferrals = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('referrals')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching referrals:', error);
        toast({
          title: "Erro ao carregar indicações",
          description: "Não foi possível carregar suas indicações.",
          variant: "destructive",
        });
      } else {
        setReferrals(data || []);
      }
    } catch (error) {
      console.error('Error in fetchReferrals:', error);
    } finally {
      setLoading(false);
    }
  };

  const createReferral = async (referralData: CreateReferralData) => {
    if (!user) return false;

    try {
      const { data, error } = await supabase
        .from('referrals')
        .insert({
          user_id: user.id,
          ...referralData,
        })
        .select()
        .single();

      if (error) {
        console.error('Error creating referral:', error);
        toast({
          title: "Erro ao criar indicação",
          description: "Não foi possível salvar a indicação.",
          variant: "destructive",
        });
        return false;
      } else {
        // Criar transação de pontos para a indicação
        await supabase
          .from('points_transactions')
          .insert({
            user_id: user.id,
            amount: 20,
            description: `Indicação de ${referralData.name}`,
            referral_id: data.id,
          });

        setReferrals(prev => [data, ...prev]);
        toast({
          title: "Indicação criada com sucesso!",
          description: "Você ganhou 20 pontos pela indicação.",
        });
        return true;
      }
    } catch (error) {
      console.error('Error in createReferral:', error);
      return false;
    }
  };

  const filterReferralsByDays = (days: number | null) => {
    if (!days) return referrals;
    
    const dateLimit = new Date();
    dateLimit.setDate(dateLimit.getDate() - days);
    
    return referrals.filter(referral => 
      new Date(referral.created_at) >= dateLimit
    );
  };

  return {
    referrals,
    loading,
    createReferral,
    filterReferralsByDays,
    refetch: fetchReferrals,
  };
};
