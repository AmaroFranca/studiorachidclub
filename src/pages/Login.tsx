import React from "react";
import { BackgroundText } from "@/components/registration/BackgroundText";
import { LoginForm } from "@/components/login/LoginForm";
import { ForgotPasswordLink } from "@/components/login/ForgotPasswordLink";
import { useIsMobile } from "@/hooks/use-mobile";
const Login: React.FC = () => {
  const isMobile = useIsMobile();
  return <div className="flex flex-col items-center justify-center relative w-full min-h-screen mx-auto py-[5vh] px-[5vw] overflow-hidden" style={{
    background: `linear-gradient(247deg, #B1C9C3 0%, #000 100%)`
  }}>
      <BackgroundText text="Rachid" position="bottomLeft" />
      <BackgroundText text="Studio" position="topRight" />

      <div className="flex flex-col items-start gap-[20px] md:gap-[30px] w-full max-w-[428px]">
        <div className="flex flex-col items-center gap-[5px] md:gap-[15px] w-full">
          <div className={`font-poppins font-normal ${isMobile ? "text-[22px] leading-[33px]" : "text-[28px] leading-[42px]"} text-[#EFEFEF] tracking-[-0.05em] flex items-center justify-center w-full`}>
            Programa de indicação
          </div>
          <div className={`font-poppins font-bold ${isMobile ? "text-[28px] leading-[42px]" : "text-[36px] leading-[54px]"} text-[#EFEFEF] tracking-[-0.05em] flex items-center justify-center w-full`}>Studio Rachid Club</div>
        </div>

        <div className="flex flex-col w-full gap-[5px] md:gap-[10px]">
          <LoginForm />
          <ForgotPasswordLink />
        </div>
      </div>
    </div>;
};
export default Login;