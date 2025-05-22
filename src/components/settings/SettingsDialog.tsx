
import React from "react";
import { useForm } from "react-hook-form";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { BlurDialogOverlay } from "@/components/ui/custom-dialog";

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
  const { register, handleSubmit, formState: { errors } } = useForm<SettingsFormData>({
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: ""
    }
  });

  const onSubmit = (data: SettingsFormData) => {
    // In real application, this would save to backend
    console.log("Form data:", data);
    toast.success("Configurações salvas com sucesso!");
    onOpenChange(false);
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
      document.dispatchEvent(new CustomEvent('dialog-state-change', { detail: { open: false } }));
    };
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <BlurDialogOverlay />
      <DialogContent className="w-[428px] bg-[#E4E4E4] border border-[rgba(115,115,115,0.5)] rounded-[10px] shadow-[10px_10px_15px_#737373] p-[26px_0px] flex flex-col items-center overflow-y-auto max-h-[90vh] z-50">
        <div className="w-[398px] border border-[rgba(115,115,115,0.5)] rounded-[10px] p-[20px_15px] flex flex-col items-center">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold text-[#737373]">Configurações</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 w-full mt-4">
            <div className="space-y-2">
              <label className="font-semibold text-[#737373]">Alterar nome e sobrenome</label>
              <Input
                placeholder="Coloque aqui o nome"
                className="border-[rgba(115,115,115,0.5)] rounded-md h-[35px] bg-transparent"
                {...register("name")}
              />
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
                className="border-[rgba(115,115,115,0.5)] rounded-md h-[35px] bg-transparent"
                {...register("email")}
              />
            </div>

            <div className="space-y-2">
              <label className="font-semibold text-[#737373]">Alterar senha</label>
              <Input
                type="password"
                placeholder="Nova senha"
                className="border-[rgba(115,115,115,0.5)] rounded-md h-[35px] bg-transparent"
                {...register("password")}
              />
            </div>

            <div className="space-y-2">
              <label className="font-semibold text-[#737373]">Confirmar nova senha</label>
              <Input
                type="password"
                placeholder="Confirme a nova senha"
                className="border-[rgba(115,115,115,0.5)] rounded-md h-[35px] bg-transparent"
                {...register("confirmPassword")}
              />
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
