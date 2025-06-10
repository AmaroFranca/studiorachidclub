
import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ExperienceConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  userPoints: number;
  totalSelectedPoints: number;
  remainingPoints: number;
  selectedExperienceNames: string;
  isProcessing: boolean;
}

const ExperienceConfirmationDialog: React.FC<ExperienceConfirmationDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  userPoints,
  totalSelectedPoints,
  remainingPoints,
  selectedExperienceNames,
  isProcessing,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#E4E4E4] border border-[#737373]/50 shadow-[10px_10px_15px_#737373] rounded-[10px] p-4 md:p-6 max-w-[90%] md:max-w-[428px] mx-4 md:mx-auto flex flex-col gap-4 md:gap-6">
        <DialogHeader className="flex items-start gap-2">
          <div className="flex items-center gap-2">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#BFA76F]">
              <path d="M12 1.99L20.53 19H3.47L12 1.99ZM12 0L1.61 21H22.39L12 0Z" fill="#BFA76F" />
              <path d="M11 10V14H13V10H11ZM11 18V16H13V18H11Z" fill="#BFA76F" />
            </svg>
            <DialogTitle className="text-lg md:text-xl text-[#737373] font-semibold">
              Confirmação de Resgate
            </DialogTitle>
          </div>
        </DialogHeader>
        <div className="flex flex-col gap-2 text-left">
          <div className="flex justify-between">
            <p className="text-sm md:text-base text-[#737373] font-medium">Total de Pontos:</p>
            <span className="text-sm md:text-base text-[#BFA76F] font-bold">{userPoints} pontos</span>
          </div>
          <div className="flex justify-between">
            <p className="text-sm md:text-base text-[#737373] font-medium">Pontos Selecionados:</p>
            <span className="text-sm md:text-base text-[#737373] font-bold">-{totalSelectedPoints} pontos</span>
          </div>
          <div className="flex justify-between">
            <p className="text-sm md:text-base text-[#737373] font-medium">Saldo de Pontos:</p>
            <span className="text-sm md:text-base text-[#BFA76F] font-bold">{remainingPoints} pontos</span>
          </div>
          {selectedExperienceNames && (
            <div className="mt-2">
              <p className="text-sm md:text-base text-[#737373] font-medium">Experiências selecionadas:</p>
              <p className="text-sm md:text-base text-[#737373]">{selectedExperienceNames}</p>
            </div>
          )}
        </div>
        <DialogDescription className="text-center text-sm md:text-base text-[#737373]">
          Aperte o botão abaixo para confirmar o Resgate.
        </DialogDescription>
        <Button 
          onClick={onConfirm}
          disabled={isProcessing}
          className="bg-[#BFA76F] hover:bg-[#BFA76F]/90 text-white w-full py-2 md:py-3"
        >
          {isProcessing ? "PROCESSANDO..." : "RESGATAR AGORA!"}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default ExperienceConfirmationDialog;
