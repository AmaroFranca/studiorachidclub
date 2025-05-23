import React from "react";
import { Heart } from "lucide-react";
import { useForm } from "react-hook-form";
import { 
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { 
  Form, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormControl 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/hooks/useAuth";
import { useReferrals } from "@/hooks/useReferrals";

interface ReferralFormValues {
  name: string;
  phone: string;
  relationship: string;
}

interface ReferralFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: { name: string; phone: string; relationship: string }) => Promise<void>;
}

const relationshipOptions = [
  { value: "spouse", label: "Marido/Esposa" },
  { value: "child", label: "Filho(a)" },
  { value: "father", label: "Pai" },
  { value: "mother", label: "Mãe" },
  { value: "sibling", label: "Irmão(ã)" },
  { value: "relative", label: "Parente" },
  { value: "friend", label: "Amigo" },
  { value: "colleague", label: "Colega de trabalho" },
];

const ReferralFormDialog: React.FC<ReferralFormDialogProps> = ({ 
  open, 
  onOpenChange,
  onSubmit 
}) => {
  const form = useForm<ReferralFormValues>({
    defaultValues: {
      name: "",
      phone: "",
      relationship: "",
    },
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    console.log("Form submitted with data:", data);
    
    await onSubmit(data);
    form.reset();
  });

  // When dialog opens/closes, add/remove class to body
  React.useEffect(() => {
    if (open) {
      document.body.classList.add('dialog-open');
      document.dispatchEvent(new CustomEvent('dialog-state-change', { detail: { open: true } }));
    } else {
      document.body.classList.remove('dialog-open');
      document.dispatchEvent(new CustomEvent('dialog-state-change', { detail: { open: false } }));
    }
    
    return () => {
      document.body.classList.remove('dialog-open');
    };
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[428px] bg-[#E4E4E4] border border-[rgba(115,115,115,0.5)] rounded-[10px] shadow-[10px_10px_15px_#737373] p-[26px_0px] flex flex-col items-center overflow-y-auto max-h-[90vh] z-50">
        <div className="w-[368px] border border-[rgba(115,115,115,0.5)] rounded-[10px] p-[20px_15px] flex flex-col items-center">
          <div className="w-full flex flex-col items-center gap-[15px] mb-[30px]">
            <div className="flex justify-center items-center gap-[10px]">
              <Heart className="w-6 h-6 text-[#BFA76F]" />
              <h2 className="font-semibold text-[22px] text-[#737373]">Indique uma pessoa</h2>
            </div>
            <p className="text-[14px] text-[#737373] text-center">
              Preencha os dados da pessoa abaixo e depois aperte o botão.
            </p>
          </div>
          
          <div className="w-full flex flex-col items-center gap-[30px]">
            <h3 className="font-bold text-[18px] text-[#BFA76F] text-center">Etapa Única</h3>
            
            <Form {...form}>
              <form onSubmit={handleSubmit} className="w-full space-y-[20px]">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="text-[12px] font-normal text-[#737373]">Nome e sobrenome</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            placeholder="Coloque aqui o nome"
                            className="h-[25px] text-[10px] border-[rgba(115,115,115,0.5)] rounded-[5px] bg-transparent"
                            {...field}
                          />
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="text-[12px] font-normal text-[#737373]">Número com WhatsApp</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            placeholder="Coloque aqui no número com DDD"
                            className="h-[25px] text-[10px] border-[rgba(115,115,115,0.5)] rounded-[5px] bg-transparent"
                            {...field}
                          />
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="relationship"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="text-[12px] font-normal text-[#737373]">Grau de Relação</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-[25px] text-[10px] border-[rgba(115,115,115,0.5)] rounded-[5px] bg-transparent">
                            <SelectValue placeholder="Selecione o grau de relação" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {relationshipOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value} className="text-[#737373] text-xs">
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />

                <button
                  type="submit"
                  className="w-full py-[15px] bg-[#BFA76F] rounded-[5px] text-[16px] font-bold text-[#EFEFEF] mt-[30px]"
                >
                  QUERO INDICAR AGORA!
                </button>
              </form>
            </Form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReferralFormDialog;
