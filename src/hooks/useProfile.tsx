
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
      console.log('Fetching profile for user:', user.id);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .maybeSingle();

      if (error) {
        console.error('Error fetching profile:', error);
        toast({
          title: "Erro ao carregar perfil",
          description: "Não foi possível carregar seus dados.",
          variant: "destructive",
        });
      } else if (!data) {
        // Perfil não existe, vamos criar um
        console.log('Profile not found, creating one...');
        await createProfile();
      } else {
        console.log('Profile fetched:', data);
        setProfile(data);
      }
    } catch (error) {
      console.error('Error in fetchProfile:', error);
    } finally {
      setLoading(false);
    }
  };

  const createProfile = async () => {
    if (!user) return;

    // Usar o nome dos metadados se disponível, senão extrair do email
    const userName = user.user_metadata?.name || extractNameFromEmail(user.email);

    try {
      console.log('Creating profile with name:', userName);
      const { data, error } = await supabase
        .from('profiles')
        .insert({
          id: user.id,
          full_name: userName,
          phone: null,
          points: 0
        })
        .select()
        .single();

      if (error) {
        console.error('Error creating profile:', error);
        toast({
          title: "Erro ao criar perfil",
          description: "Não foi possível criar seu perfil.",
          variant: "destructive",
        });
      } else {
        console.log('Profile created successfully:', data);
        setProfile(data);
      }
    } catch (error) {
      console.error('Error in createProfile:', error);
    }
  };

  const extractNameFromEmail = (email: string | undefined): string => {
    if (!email) return 'Usuário';
    
    const emailName = email.split('@')[0];
    
    // Dividir por pontos, underscores ou números e capitalizar cada parte
    return emailName
      .split(/[._\d]+/)
      .filter(part => part.length > 0)
      .map(part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
      .join(' ');
  };

  const updateProfile = async (updates: Partial<Pick<Profile, 'full_name' | 'phone'>>) => {
    if (!user) return false;

    try {
      console.log('Updating profile with:', updates);
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
        console.log('Profile updated successfully:', data);
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
