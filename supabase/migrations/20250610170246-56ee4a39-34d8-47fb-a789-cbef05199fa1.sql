
-- Melhorar a função de resgate para incluir validações mais robustas
CREATE OR REPLACE FUNCTION public.process_redeem(
  user_id_param UUID,
  reward_id_param UUID
)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  user_points INTEGER;
  reward_points INTEGER;
  reward_name TEXT;
  result JSON;
BEGIN
  -- Buscar pontos do usuário
  SELECT points INTO user_points 
  FROM public.profiles 
  WHERE id = user_id_param;
  
  IF user_points IS NULL THEN
    RETURN json_build_object('success', false, 'error', 'Usuário não encontrado');
  END IF;
  
  -- Buscar dados da recompensa
  SELECT points, name INTO reward_points, reward_name 
  FROM public.rewards_catalog 
  WHERE id = reward_id_param AND active = true;
  
  IF reward_points IS NULL THEN
    RETURN json_build_object('success', false, 'error', 'Recompensa não encontrada ou inativa');
  END IF;
  
  -- Verificar se tem pontos suficientes
  IF user_points < reward_points THEN
    RETURN json_build_object('success', false, 'error', 'Pontos insuficientes');
  END IF;
  
  -- Criar o resgate
  INSERT INTO public.redeems (user_id, reward_id, status)
  VALUES (user_id_param, reward_id_param, 'pending');
  
  -- Criar transação de pontos negativa
  INSERT INTO public.points_transactions (user_id, amount, description)
  VALUES (user_id_param, -reward_points, 'Resgate: ' || reward_name);
  
  RETURN json_build_object(
    'success', true, 
    'points_deducted', reward_points,
    'remaining_points', user_points - reward_points
  );
END;
$$;

-- Melhorar a função de pontos de indicação para garantir os 20 pontos iniciais
CREATE OR REPLACE FUNCTION public.award_initial_referral_points()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Dar 20 pontos imediatamente ao criar uma indicação
  INSERT INTO public.points_transactions (user_id, amount, description, referral_id)
  VALUES (
    NEW.user_id, 
    20, 
    'Indicação criada: ' || NEW.name,
    NEW.id
  );
  
  RETURN NEW;
END;
$$;

-- Criar trigger para dar pontos automaticamente na criação de indicação
DROP TRIGGER IF EXISTS trigger_award_initial_referral_points ON public.referrals;
CREATE TRIGGER trigger_award_initial_referral_points
  AFTER INSERT ON public.referrals
  FOR EACH ROW
  EXECUTE FUNCTION public.award_initial_referral_points();

-- Criar função para buscar histórico de resgates do usuário
CREATE OR REPLACE FUNCTION public.get_user_redeems(user_id_param UUID)
RETURNS TABLE (
  id UUID,
  reward_name TEXT,
  reward_points INTEGER,
  status TEXT,
  created_at TIMESTAMP WITH TIME ZONE
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    r.id,
    rc.name as reward_name,
    rc.points as reward_points,
    r.status,
    r.created_at
  FROM public.redeems r
  JOIN public.rewards_catalog rc ON r.reward_id = rc.id
  WHERE r.user_id = user_id_param
  ORDER BY r.created_at DESC;
END;
$$;
