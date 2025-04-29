
import React from "react";

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
  return (
    <div className="flex flex-col items-start gap-[5px] w-[346px] mb-[20px]">
      <div className="font-poppins font-semibold text-[12px] leading-[18px] text-[#737373] h-[9px] flex items-center">
        {label}
      </div>
      <div className="relative w-full">
        <input
          type={type}
          name={name}
          onChange={onChange}
          value={value}
          className="w-[346px] h-[25px] border border-[rgba(115,115,115,0.5)] rounded-[5px] px-[11px] py-0 bg-transparent text-[10px]"
          aria-label={label}
        />
        {!value && (
          <div className="absolute left-[11px] top-[5px] font-poppins font-normal text-[10px] leading-[15px] text-[rgba(115,115,115,0.5)]">
            {placeholder}
          </div>
        )}
      </div>
    </div>
  );
};
