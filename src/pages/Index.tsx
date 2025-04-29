
import React from "react";
import { BackgroundText } from "@/components/registration/BackgroundText";
import { RegistrationForm } from "@/components/registration/RegistrationForm";

const Index: React.FC = () => {
  return (
    <div 
      className="max-w-none w-full h-screen flex items-center justify-center relative mx-auto overflow-hidden"
      style={{ 
        background: "linear-gradient(135deg, #4B5E5A 0%, #6F8983 100%)",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
      }}
    >
      <BackgroundText text="Rachid" position="bottomLeft" />
      <BackgroundText text="Studio" position="topRight" />

      <div className="flex flex-col items-center gap-[30px]">
        <div className="text-center">
          <div className="font-normal text-[28px] text-white tracking-[-0.5px]">
            Programa de indicação
          </div>
          <div className="font-bold text-5xl text-white tracking-[-0.5px]">
            Studio Rachid
          </div>
        </div>

        <RegistrationForm />
      </div>
    </div>
  );
};

export default Index;
