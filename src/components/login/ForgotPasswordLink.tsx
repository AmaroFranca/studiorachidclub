
import React from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const ForgotPasswordLink: React.FC = () => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  
  const fontSize = isMobile ? "text-[10px] leading-[15px]" : "text-[12px] leading-[18px]";
  
  const handleForgotPassword = () => {
    // In a real app, this would navigate to a password reset page
    toast("Funcionalidade de recuperação de senha será implementada em breve.", {
      description: "Por favor, entre em contato com o suporte."
    });
  };
  
  return (
    <div className="w-full flex justify-center mt-[5px] md:mt-[10px]">
      <Button 
        variant="link"
        className={`font-poppins font-bold ${fontSize} text-[#B1C9C3] p-0 h-auto`}
        onClick={handleForgotPassword}
      >
        Esqueci minha senha
      </Button>
    </div>
  );
};
