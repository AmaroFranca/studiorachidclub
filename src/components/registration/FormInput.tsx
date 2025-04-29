
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
    <div className="mb-4 w-full">
      <div className="text-sm font-medium text-gray-700 mb-1">{label}</div>
      <input
        type={type}
        name={name}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        className="w-full h-10 border border-[rgba(115,115,115,0.3)] rounded-[5px] px-4 bg-white/50 text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-[#BFA76F] transition-colors"
        aria-label={label}
      />
    </div>
  );
};
