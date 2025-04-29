
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
    <div className="mb-5 w-full">
      <div className="text-sm font-semibold text-[#737373] mb-1.5">{label}</div>
      <input
        type={type}
        name={name}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        className="w-full h-9 border border-[rgba(115,115,115,0.5)] rounded-[5px] px-3 py-2 bg-transparent text-xs text-gray-700 placeholder:text-[#737373] focus:outline-none focus:border-[#BFA76F] transition-colors"
        aria-label={label}
      />
    </div>
  );
};
