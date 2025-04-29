
import React from "react";
import { BackgroundText } from "@/components/registration/BackgroundText";
import { RegistrationForm } from "@/components/registration/RegistrationForm";

const Index: React.FC = () => {
  return (
    <div 
      className="max-w-none w-[1280px] h-[832px] flex items-center justify-center relative mx-auto overflow-hidden font-poppins px-[426px] py-[116px]"
      style={{ 
        background: "linear-gradient(135deg, #4B5E5A 0%, #6F8983 100%)",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
      }}
    >
      <BackgroundText text="Rachid" position="bottomLeft" />
      <BackgroundText text="Studio" position="topRight" />

      <div className="flex flex-col items-center gap-[30px] w-[428px]">
        <div className="text-center w-full">
          <div className="font-normal text-[28px] text-[#EFEFEF] tracking-[-0.05em] h-[42px] flex items-center justify-center">
            Programa de indicação
          </div>
          <div className="font-bold text-[36px] text-[#EFEFEF] tracking-[-0.05em] h-[23px] flex items-center justify-center">
            Studio Rachid
          </div>
        </div>

        <RegistrationForm />
      </div>
    </div>
  );
};

export default Index;
