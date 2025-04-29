
import React from "react";
import { BackgroundText } from "@/components/registration/BackgroundText";
import { RegistrationForm } from "@/components/registration/RegistrationForm";

const Index: React.FC = () => {
  return (
    <div 
      className="flex flex-row items-center justify-center relative w-[1280px] h-[832px] mx-auto px-[426px] py-[116px] gap-[10px] overflow-hidden"
      style={{ 
        background: `linear-gradient(247deg, #B1C9C3 0%, #000 100%)`,
      }}
    >
      <BackgroundText text="Rachid" position="bottomLeft" />
      <BackgroundText text="Studio" position="topRight" />

      <div className="flex flex-col items-start gap-[30px] w-[428px] h-[600px]">
        <div className="flex flex-col items-center gap-[15px] w-[428px] h-[80px]">
          <div className="font-poppins font-normal text-[28px] leading-[42px] text-[#EFEFEF] tracking-[-0.05em] h-[42px] flex items-center justify-center w-full">
            Programa de indicação
          </div>
          <div className="font-poppins font-bold text-[36px] leading-[54px] text-[#EFEFEF] tracking-[-0.05em] h-[23px] flex items-center justify-center w-full">
            Studio Rachid
          </div>
        </div>

        <RegistrationForm />
      </div>
    </div>
  );
};

export default Index;
