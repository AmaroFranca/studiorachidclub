import React, { useState, useEffect } from "react";
import { Heart, Check } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { useReferrals } from "@/hooks/useReferrals";
interface ReferralSuccessDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  referralId?: string; // ID da indicação que acabou de ser criada
}
const ReferralSuccessDialog: React.FC<ReferralSuccessDialogProps> = ({
  open,
  onOpenChange,
  referralId
}) => {
  const {
    toast
  } = useToast();
  const [copied, setCopied] = useState(false);
  const {
    user
  } = useAuth();
  const {
    markMessageCopied
  } = useReferrals(user);
  const messageTemplate = `Oi [NOME]! Tudo bem? Sou paciente da Clínica Studio Rachid, especialistas em Harmonização Facial e Estética do Sorriso. Gosto muito do cuidado deles e decidi indicar algumas pessoas especiais — como você! A clínica preparou um presente exclusivo para quem recebe essa indicação. Depois me conta se gostou!`;
  const handleCopyMessage = async () => {
    try {
      await navigator.clipboard.writeText(messageTemplate);
      setCopied(true);

      // Registrar que a mensagem foi copiada e conceder pontos
      if (referralId) {
        await markMessageCopied(referralId);
      }
      toast({
        title: "Mensagem copiada!",
        description: "A mensagem foi copiada para a área de transferência e você ganhou 10 pontos!"
      });
      setTimeout(() => {
        onOpenChange(false);
      }, 1500);
    } catch (err) {
      console.error('Erro ao copiar: ', err);
      toast({
        title: "Erro ao copiar a mensagem",
        description: "Tente novamente.",
        variant: "destructive"
      });
    }
  };

  // Standardize the dialog state management and event dispatching
  useEffect(() => {
    if (open) {
      document.body.classList.add('dialog-open');
      document.dispatchEvent(new CustomEvent('dialog-state-change', {
        detail: {
          open: true
        }
      }));
    } else {
      document.body.classList.remove('dialog-open');
      document.dispatchEvent(new CustomEvent('dialog-state-change', {
        detail: {
          open: false
        }
      }));
      setCopied(false); // Reset o estado quando o diálogo é fechado
    }

    // Cleanup on unmount
    return () => {
      document.body.classList.remove('dialog-open');
    };
  }, [open]);
  return <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[360px] bg-[#E4E4E4] border border-[rgba(115,115,115,0.5)] rounded-[10px] shadow-[10px_10px_15px_#737373] p-[26px_15px] flex flex-col items-center overflow-y-auto max-h-[90vh] z-50">
        <div className="w-[340px] border border-[rgba(115,115,115,0.5)] rounded-[10px] p-[20px_15px] flex flex-col items-center px-[10px] py-[10px]">
          <div className="w-full flex flex-col items-start gap-[40px]">
            <div className="w-full flex justify-center items-center gap-[10px]">
              <Heart className="w-6 h-6 text-[#BFA76F]" />
              <h2 className="font-semibold text-[22px] text-[#737373]">Meus parabéns!</h2>
            </div>
            <p className="w-full text-[12px] text-center text-[#737373]">
              Você acaba de indicar mais uma pessoa. Indicar algo que confiamos é um sinal de carinho.
            </p>
          </div>

          <div className="w-full flex flex-col items-start gap-[20px]">
            <h3 className="w-full font-bold text-[16px] text-[#BFA76F] text-center">
              Quer ganhar 10 pontos agora?
            </h3>
            <p className="w-full font-bold text-[12px] text-[#737373] text-center">
              É só tocar no botão, copiar a mensagem abaixo e enviar para quem você indicou.
              Você receberá mais 20 pontos quando o indicado comparecer à clínica!
            </p>
          </div>

          <div className="w-full flex flex-col items-start gap-[20px]">
            <div className="w-full flex flex-col items-start gap-[5px]">
              <label className="text-[12px] font-normal text-[#737373]">
                Mensagem para o WhatsApp
              </label>
              <div className="relative w-full border border-[rgba(115,115,115,0.5)] rounded-[5px] p-[10px] min-h-[138px] py-[20px]">
                <p className="text-[10px] text-[#737373]">{messageTemplate}</p>
              </div>
            </div>
          </div>
        </div>

        <button onClick={handleCopyMessage} className="w-[348px] py-[15px] bg-[#BFA76F] rounded-[5px] text-[16px] font-bold text-[#EFEFEF] mt-[30px] flex items-center justify-center gap-2">
          {copied ? <Check className="w-4 h-4" /> : null}
          COPIAR A MENSAGEM
        </button>
      </DialogContent>
    </Dialog>;
};
export default ReferralSuccessDialog;