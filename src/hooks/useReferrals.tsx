
import { useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useProfile } from './useProfile';

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
  phase: number | null;
  message_copied_at: string | null;
  points_awarded: number | null;
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
  const { refetch: refetchProfile } = useProfile(user);

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
          phase: 1, // Fase inicial
          points_awarded: 0, // Sem pontos iniciais
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
        setReferrals(prev => [data, ...prev]);
        
        toast({
          title: "Indicação criada com sucesso!",
          description: "Copie a mensagem para ganhar 10 pontos.",
        });
        return true;
      }
    } catch (error) {
      console.error('Error in createReferral:', error);
      return false;
    }
  };

  const markMessageCopied = async (referralId: string) => {
    if (!user) return false;

    try {
      // Verificar a fase atual
      const { data: referral } = await supabase
        .from('referrals')
        .select('phase')
        .eq('id', referralId)
        .single();

      if (referral && referral.phase < 2) {
        // Chamar a função do banco de dados para atualizar fase e conceder pontos
        const { error } = await supabase.rpc('award_referral_points', {
          referral_id_param: referralId,
          phase_param: 2,
          points_param: 10
        });

        if (error) {
          console.error('Error marking message copied:', error);
          toast({
            title: "Erro ao registrar mensagem copiada",
            description: "Não foi possível registrar os pontos.",
            variant: "destructive",
          });
          return false;
        } else {
          // Atualizar a lista de indicações
          await fetchReferrals();
          // Atualizar o perfil para refletir os novos pontos
          refetchProfile();
          
          toast({
            title: "Mensagem copiada!",
            description: "Você ganhou 10 pontos! Receberá mais 20 pontos quando seu indicado retirar o presente na clínica.",
          });
          return true;
        }
      }
      return true; // Já está na fase 2 ou superior
    } catch (error) {
      console.error('Error in markMessageCopied:', error);
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
    markMessageCopied,
    filterReferralsByDays,
    refetch: fetchReferrals,
  };
};
