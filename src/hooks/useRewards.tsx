
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Reward {
  id: string;
  name: string;
  description: string | null;
  points: number;
  image_url: string;
  type: 'prize' | 'experience';
  active: boolean;
  created_at: string;
  updated_at: string;
}

export const useRewards = () => {
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchRewards();
  }, []);

  const fetchRewards = async () => {
    try {
      console.log('Fetching rewards from database...');
      const { data, error } = await supabase
        .from('rewards_catalog')
        .select('*')
        .eq('active', true)
        .order('points', { ascending: true });

      if (error) {
        console.error('Error fetching rewards:', error);
        toast({
          title: "Erro ao carregar recompensas",
          description: "Não foi possível carregar as recompensas disponíveis.",
          variant: "destructive",
        });
      } else {
        console.log('Rewards fetched successfully:', data);
        setRewards((data as Reward[]) || []);
      }
    } catch (error) {
      console.error('Error in fetchRewards:', error);
    } finally {
      setLoading(false);
    }
  };

  const getPrizes = () => rewards.filter(reward => reward.type === 'prize');
  const getExperiences = () => rewards.filter(reward => reward.type === 'experience');

  return {
    rewards,
    prizes: getPrizes(),
    experiences: getExperiences(),
    loading,
    refetch: fetchRewards,
  };
};
