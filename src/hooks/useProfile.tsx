
import { useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Profile {
  id: string;
  full_name: string;
  phone: string | null;
  points: number;
  created_at: string;
  updated_at: string;
}

export const useProfile = (user: User | null) => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      fetchProfile();
    } else {
      setProfile(null);
      setLoading(false);
    }
  }, [user]);

  const fetchProfile = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        toast({
          title: "Erro ao carregar perfil",
          description: "Não foi possível carregar seus dados.",
          variant: "destructive",
        });
      } else {
        setProfile(data);
      }
    } catch (error) {
      console.error('Error in fetchProfile:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updates: Partial<Pick<Profile, 'full_name' | 'phone'>>) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id)
        .select()
        .single();

      if (error) {
        console.error('Error updating profile:', error);
        toast({
          title: "Erro ao atualizar perfil",
          description: "Não foi possível atualizar seus dados.",
          variant: "destructive",
        });
        return false;
      } else {
        setProfile(data);
        toast({
          title: "Perfil atualizado",
          description: "Seus dados foram salvos com sucesso.",
        });
        return true;
      }
    } catch (error) {
      console.error('Error in updateProfile:', error);
      return false;
    }
  };

  return {
    profile,
    loading,
    updateProfile,
    refetch: fetchProfile,
  };
};
