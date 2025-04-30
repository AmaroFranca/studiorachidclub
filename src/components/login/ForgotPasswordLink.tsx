
import React from "react";
import { useIsMobile } from "@/hooks/use-mobile";

export const ForgotPasswordLink: React.FC = () => {
  const isMobile = useIsMobile();
  
  const fontSize = isMobile ? "text-[10px] leading-[15px]" : "text-[12px] leading-[18px]";
  
  return (
    <div className="w-full flex justify-center mt-[5px] md:mt-[10px]">
      <button 
        className={`font-poppins font-bold ${fontSize} text-[#B1C9C3]`}
        onClick={() => console.log("Forgot password clicked")}
      >
        Esqueci minha senha
      </button>
    </div>
  );
};
