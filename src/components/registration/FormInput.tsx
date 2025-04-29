
import React from "react";
import { useIsMobile } from "@/hooks/use-mobile";

interface FormInputProps {
  label: string;
  placeholder: string;
  type?: string;
  name: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
}

export const FormInput: React.FC<FormInputProps> = ({
  label,
  placeholder,
  type = "text",
  name,
  onChange,
  value,
}) => {
  const isMobile = useIsMobile();
  
  // Ajustes para dispositivos móveis
  const labelSize = isMobile ? "text-[11px] leading-[16px]" : "text-[12px] leading-[18px]";
  const inputHeight = isMobile ? "h-[35px]" : "h-[25px]";
  const inputFontSize = isMobile ? "text-[12px]" : "text-[10px]";
  const placeholderFontSize = isMobile ? "text-[12px]" : "text-[10px]";

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
          className={`w-full ${inputHeight} border border-[rgba(115,115,115,0.5)] rounded-[5px] px-[11px] py-0 bg-transparent ${inputFontSize}`}
          aria-label={label}
        />
        {!value && (
          <div className={`absolute left-[11px] top-[50%] transform -translate-y-1/2 font-poppins font-normal ${placeholderFontSize} leading-[15px] text-[rgba(115,115,115,0.5)]`}>
            {placeholder}
          </div>
        )}
      </div>
    </div>
  );
};
