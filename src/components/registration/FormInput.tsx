
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
    <div className="mb-[20px] w-full">
      <div className="text-xs font-semibold text-[#737373] mb-[5px]">{label}</div>
      <div className="relative">
        <input
          type={type}
          name={name}
          onChange={onChange}
          value={value}
          className="w-full h-[25px] border border-[rgba(115,115,115,0.5)] rounded-[5px] px-[11px] py-0 bg-transparent text-[10px] text-[#737373] focus:outline-none focus:border-[#BFA76F] transition-colors"
          aria-label={label}
        />
        <div className="absolute left-[11px] top-[2.5px] pointer-events-none text-[10px] text-[rgba(115,115,115,0.5)]">
          {!value && placeholder}
        </div>
      </div>
    </div>
  );
};
