import React from "react";
import { BackgroundText } from "@/components/registration/BackgroundText";
import { RegistrationForm } from "@/components/registration/RegistrationForm";

const Index: React.FC = () => {
  return (
    <div className="max-w-none w-full h-screen flex items-center justify-center relative mx-auto bg-gray-900 max-md:max-w-[991px] max-md:p-5 max-sm:max-w-screen-sm max-sm:p-4">
      <BackgroundText text="Rachid" position="bottomLeft" />
      <BackgroundText text="Studio" position="topRight" />

      <div className="flex flex-col items-center gap-[30px]">
        <div className="text-center">
          <div className="font-normal text-[28px] text-[#EFEFEF] tracking-[-1.4px]">
            Programa de indicação
          </div>
          <div className="font-bold text-4xl text-[#EFEFEF] tracking-[-1.8px]">
            Studio Rachid
          </div>
        </div>

        <RegistrationForm />
      </div>
    </div>
  );
};

export default Index;
