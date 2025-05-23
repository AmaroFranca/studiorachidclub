
import React, { useEffect } from "react";
import { BackgroundText } from "@/components/registration/BackgroundText";
import { RegistrationForm } from "@/components/registration/RegistrationForm";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Index: React.FC = () => {
  const isMobile = useIsMobile();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  return (
    <div 
      className="flex flex-col items-center justify-center relative w-full min-h-screen mx-auto py-[5vh] px-[5vw] overflow-hidden" 
      style={{
        background: `linear-gradient(247deg, #B1C9C3 0%, #000 100%)`
      }}
    >
      <BackgroundText text="Rachid" position="bottomLeft" />
      <BackgroundText text="Studio" position="topRight" />

      <div className="flex flex-col items-start gap-[20px] md:gap-[30px] w-full max-w-[428px]">
        <div className="flex flex-col items-center gap-[5px] md:gap-[15px] w-full">
          <div className={`font-poppins font-bold ${isMobile ? "text-[28px] leading-[42px]" : "text-[36px] leading-[54px]"} text-[#EFEFEF] tracking-[-0.05em] flex items-center justify-center w-full`}>
            Studio Rachid Club
          </div>
        </div>

        <RegistrationForm />
        
        <div className="w-full flex justify-center mt-[10px]">
          <Button 
            variant="link"
            onClick={() => navigate('/login')}
            className="font-poppins font-bold text-[12px] text-[#B1C9C3] p-0 h-auto"
          >
            Já tem conta? Faça login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
