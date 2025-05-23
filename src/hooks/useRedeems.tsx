
import { useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Redeem {
  id: string;
  user_id: string;
  reward_id: string;
  status: 'pending' | 'approved' | 'delivered' | 'cancelled';
  created_at: string;
  updated_at: string;
}

export const useRedeems = (user: User | null) => {
  const [redeems, setRedeems] = useState<Redeem[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      fetchRedeems();
    } else {
      setRedeems([]);
      setLoading(false);
    }
  }, [user]);

  const fetchRedeems = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('redeems')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching redeems:', error);
        toast({
          title: "Erro ao carregar resgates",
          description: "Não foi possível carregar seus resgates.",
          variant: "destructive",
        });
      } else {
        // Type assertion to ensure proper typing
        setRedeems((data as Redeem[]) || []);
      }
    } catch (error) {
      console.error('Error in fetchRedeems:', error);
    } finally {
      setLoading(false);
    }
  };

  const createRedeem = async (rewardId: string) => {
    if (!user) return false;

    try {
      const { data, error } = await supabase
        .from('redeems')
        .insert({
          user_id: user.id,
          reward_id: rewardId,
          status: 'pending',
        })
        .select()
        .single();

      if (error) {
        console.error('Error creating redeem:', error);
        if (error.message.includes('Pontos insuficientes')) {
          toast({
            title: "Pontos insuficientes",
            description: "Você não tem pontos suficientes para resgatar esta recompensa.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Erro ao resgatar recompensa",
            description: "Não foi possível processar o resgate.",
            variant: "destructive",
          });
        }
        return false;
      } else {
        // Type assertion for the returned data
        setRedeems(prev => [data as Redeem, ...prev]);
        toast({
          title: "Resgate realizado com sucesso!",
          description: "Sua solicitação de resgate foi processada.",
        });
        return true;
      }
    } catch (error) {
      console.error('Error in createRedeem:', error);
      return false;
    }
  };

  return {
    redeems,
    loading,
    createRedeem,
    refetch: fetchRedeems,
  };
};
