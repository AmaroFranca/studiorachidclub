
import React from "react";
import { useIsMobile } from "@/hooks/use-mobile";

interface FormInputProps {
  label: string;
  placeholder: string;
  type?: string;
  name: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  error?: string;
}

export const FormInput: React.FC<FormInputProps> = ({
  label,
  placeholder,
  type = "text",
  name,
  onChange,
  value,
  error,
}) => {
  const isMobile = useIsMobile();
  
  // Ajustes para dispositivos móveis
  const labelSize = isMobile ? "text-[11px] leading-[16px]" : "text-[12px] leading-[18px]";
  const inputHeight = isMobile ? "h-[35px]" : "h-[25px]";
  const inputFontSize = isMobile ? "text-[12px]" : "text-[10px]";

  return (
    <div className="flex flex-col items-start gap-[5px] w-full mb-[15px] md:mb-[20px]">
      <div className={`font-poppins font-semibold ${labelSize} text-[#737373] h-auto flex items-center`}>
        {label}
      </div>
      <div className="relative w-full">
        <input
          type={type}
          name={name}
          onChange={onChange}
          value={value}
          placeholder={placeholder}
          className={`w-full ${inputHeight} border border-[rgba(115,115,115,0.5)] rounded-[5px] px-[11px] py-0 bg-transparent ${inputFontSize} placeholder:text-[rgba(115,115,115,0.5)] placeholder:font-poppins placeholder:font-normal`}
          aria-label={label}
        />
        {error && (
          <p className="text-red-500 text-[10px] mt-1">{error}</p>
        )}
      </div>
    </div>
  );
};
