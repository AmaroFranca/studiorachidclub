
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface AdminUser {
  id: string;
  full_name: string;
  phone: string | null;
  points: number;
  created_at: string;
  total_referrals: number;
  pending_redeems: number;
}

export const useAdminUsers = () => {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchUsers = async () => {
    try {
      console.log('Fetching admin users...');
      
      // Buscar usuários com dados agregados
      const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select(`
          id,
          full_name,
          phone,
          points,
          created_at
        `)
        .order('created_at', { ascending: false });

      if (profilesError) {
        console.error('Error fetching users:', profilesError);
        toast({
          title: "Erro ao carregar usuários",
          description: "Não foi possível carregar a lista de usuários.",
          variant: "destructive",
        });
        return;
      }

      // Para cada usuário, buscar dados agregados
      const usersWithStats = await Promise.all(
        (profilesData || []).map(async (profile) => {
          // Contar indicações
          const { count: referralsCount } = await supabase
            .from('referrals')
            .select('*', { count: 'exact' })
            .eq('user_id', profile.id);

          // Contar resgates pendentes
          const { count: redeemsCount } = await supabase
            .from('redeems')
            .select('*', { count: 'exact' })
            .eq('user_id', profile.id)
            .eq('status', 'pending');

          return {
            ...profile,
            total_referrals: referralsCount || 0,
            pending_redeems: redeemsCount || 0,
          };
        })
      );

      console.log('Users with stats loaded:', usersWithStats);
      setUsers(usersWithStats);
    } catch (error) {
      console.error('Error in fetchUsers:', error);
      toast({
        title: "Erro inesperado",
        description: "Ocorreu um erro ao carregar os dados.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const adjustUserPoints = async (userId: string, amount: number, description: string) => {
    try {
      console.log('Adjusting points for user:', userId, 'amount:', amount);
      
      const { error } = await supabase
        .from('points_transactions')
        .insert({
          user_id: userId,
          amount: amount,
          description: `Ajuste manual: ${description}`,
        });

      if (error) {
        console.error('Error adjusting points:', error);
        toast({
          title: "Erro ao ajustar pontos",
          description: "Não foi possível ajustar os pontos do usuário.",
          variant: "destructive",
        });
        return false;
      }

      toast({
        title: "Pontos ajustados com sucesso",
        description: `${amount > 0 ? 'Adicionados' : 'Removidos'} ${Math.abs(amount)} pontos.`,
      });

      await fetchUsers(); // Recarregar lista
      return true;
    } catch (error) {
      console.error('Error in adjustUserPoints:', error);
      return false;
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return {
    users,
    loading,
    refetch: fetchUsers,
    adjustUserPoints,
  };
};
