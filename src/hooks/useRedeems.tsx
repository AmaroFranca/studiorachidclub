
import { useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Redeem {
  id: string;
  reward_name: string;
  reward_points: number;
  status: 'pending' | 'approved' | 'delivered' | 'cancelled';
  created_at: string;
}

interface RedeemProcessResult {
  success: boolean;
  points_deducted?: number;
  remaining_points?: number;
  error?: string;
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
      console.log('Fetching redeems for user:', user.id);
      const { data, error } = await supabase.rpc('get_user_redeems', {
        user_id_param: user.id
      });

      if (error) {
        console.error('Error fetching redeems:', error);
        toast({
          title: "Erro ao carregar resgates",
          description: "Não foi possível carregar seus resgates.",
          variant: "destructive",
        });
      } else {
        console.log('Redeems fetched successfully:', data);
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
      console.log('Creating redeem for reward:', rewardId, 'user:', user.id);
      const { data, error } = await supabase.rpc('process_redeem', {
        user_id_param: user.id,
        reward_id_param: rewardId
      });

      if (error) {
        console.error('Error creating redeem:', error);
        toast({
          title: "Erro ao resgatar recompensa",
          description: "Não foi possível processar o resgate.",
          variant: "destructive",
        });
        return false;
      } else {
        console.log('Redeem processed successfully:', data);
        const result = data as RedeemProcessResult;
        
        if (result.success) {
          await fetchRedeems(); // Recarregar lista de resgates
          toast({
            title: "Resgate realizado com sucesso!",
            description: `Você debitou ${result.points_deducted} pontos. Saldo atual: ${result.remaining_points} pontos.`,
          });
          return true;
        } else {
          toast({
            title: "Erro no resgate",
            description: result.error || "Não foi possível processar o resgate.",
            variant: "destructive",
          });
          return false;
        }
      }
    } catch (error) {
      console.error('Error in createRedeem:', error);
      toast({
        title: "Erro inesperado",
        description: "Ocorreu um erro inesperado.",
        variant: "destructive",
      });
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
