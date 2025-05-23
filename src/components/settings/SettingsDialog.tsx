
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/useProfile";
import { supabase } from "@/integrations/supabase/client";

type SettingsFormData = {
  name: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
};

interface SettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SettingsDialog({ open, onOpenChange }: SettingsDialogProps) {
  const { user } = useAuth();
  const { profile, updateProfile } = useProfile(user);
  
  const { register, handleSubmit, formState: { errors }, setValue, watch, reset } = useForm<SettingsFormData>({
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: ""
    }
  });

  // Carregar dados do usuário quando o dialog abrir
  useEffect(() => {
    if (open && profile && user) {
      setValue("name", profile.full_name || "");
      setValue("phone", profile.phone || "");
      setValue("email", user.email || "");
    }
  }, [open, profile, user, setValue]);

  const onSubmit = async (data: SettingsFormData) => {
    if (!user) {
      toast.error("Usuário não encontrado");
      return;
    }

    try {
      // Atualizar perfil se nome ou telefone mudaram
      if (data.name !== profile?.full_name || data.phone !== profile?.phone) {
        const success = await updateProfile({
          full_name: data.name,
          phone: data.phone
        });
        
        if (!success) {
          return;
        }
      }

      // Atualizar email se mudou
      if (data.email && data.email !== user.email) {
        const { error: emailError } = await supabase.auth.updateUser({
          email: data.email
        });
        
        if (emailError) {
          console.error('Error updating email:', emailError);
          toast.error("Erro ao atualizar email: " + emailError.message);
          return;
        }
        
        toast.success("Email atualizado! Verifique seu novo email para confirmar.");
      }

      // Atualizar senha se fornecida
      if (data.password) {
        if (data.password !== data.confirmPassword) {
          toast.error("As senhas não coincidem");
          return;
        }
        
        if (data.password.length < 6) {
          toast.error("A senha deve ter pelo menos 6 caracteres");
          return;
        }
        
        const { error: passwordError } = await supabase.auth.updateUser({
          password: data.password
        });
        
        if (passwordError) {
          console.error('Error updating password:', passwordError);
          toast.error("Erro ao atualizar senha: " + passwordError.message);
          return;
        }
        
        toast.success("Senha atualizada com sucesso!");
      }

      toast.success("Configurações salvas com sucesso!");
      reset();
      onOpenChange(false);
    } catch (error) {
      console.error('Error in settings update:', error);
      toast.error("Erro inesperado ao salvar configurações");
    }
  };

  React.useEffect(() => {
    // Add/remove class to body when dialog opens/closes
    if (open) {
      document.body.classList.add('dialog-open');
      document.dispatchEvent(new CustomEvent('dialog-state-change', { detail: { open: true } }));
    } else {
      document.body.classList.remove('dialog-open');
      document.dispatchEvent(new CustomEvent('dialog-state-change', { detail: { open: false } }));
    }
    
    // Cleanup on unmount
    return () => {
      document.body.classList.remove('dialog-open');
    };
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[428px] bg-[#E4E4E4] border border-[rgba(115,115,115,0.5)] rounded-[10px] shadow-[10px_10px_15px_#737373] p-[26px_0px] flex flex-col items-center overflow-y-auto max-h-[90vh] z-50">
        <div className="w-[368px] border border-[rgba(115,115,115,0.5)] rounded-[10px] p-[20px_15px] flex flex-col items-center">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold text-[#737373]">Configurações</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 w-full mt-4">
            <div className="space-y-2">
              <label className="font-semibold text-[#737373]">Alterar nome e sobrenome</label>
              <Input
                placeholder="Coloque aqui o nome"
                className="border-[rgba(115,115,115,0.5)] rounded-md h-[35px] bg-transparent"
                {...register("name", { required: "Nome é obrigatório" })}
              />
              {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
            </div>

            <div className="space-y-2">
              <label className="font-semibold text-[#737373]">Trocar número de telefone</label>
              <Input
                placeholder="Coloque aqui no número com DDD"
                className="border-[rgba(115,115,115,0.5)] rounded-md h-[35px] bg-transparent"
                {...register("phone")}
              />
            </div>

            <div className="space-y-2">
              <label className="font-semibold text-[#737373]">Trocar e-mail</label>
              <Input
                placeholder="Coloque seu melhor e-mail"
                type="email"
                className="border-[rgba(115,115,115,0.5)] rounded-md h-[35px] bg-transparent"
                {...register("email", { 
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Email inválido"
                  }
                })}
              />
              {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
            </div>

            <div className="space-y-2">
              <label className="font-semibold text-[#737373]">Alterar senha</label>
              <Input
                type="password"
                placeholder="Nova senha"
                className="border-[rgba(115,115,115,0.5)] rounded-md h-[35px] bg-transparent"
                {...register("password", {
                  minLength: {
                    value: 6,
                    message: "A senha deve ter pelo menos 6 caracteres"
                  }
                })}
              />
              {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
            </div>

            <div className="space-y-2">
              <label className="font-semibold text-[#737373]">Confirmar nova senha</label>
              <Input
                type="password"
                placeholder="Confirme a nova senha"
                className="border-[rgba(115,115,115,0.5)] rounded-md h-[35px] bg-transparent"
                {...register("confirmPassword", {
                  validate: (value) => {
                    const password = watch("password");
                    if (password && !value) return "Confirme a nova senha";
                    if (password && value !== password) return "As senhas não coincidem";
                    return true;
                  }
                })}
              />
              {errors.confirmPassword && <span className="text-red-500 text-sm">{errors.confirmPassword.message}</span>}
            </div>

            <Button 
              type="submit" 
              className="w-full bg-[#BFA76F] hover:bg-[#BFA76F]/90 text-[#EFEFEF] rounded-md py-3 font-bold"
            >
              Salvar
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
