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
      <div className="relative">
        <div className="absolute top-[10px] left-[10px] text-gray-500 text-sm">
          {placeholder}
        </div>
        <input
          type={type}
          name={name}
          onChange={onChange}
          value={value}
          className="w-full h-10 border border-[rgba(115,115,115,0.5)] rounded-[5px] px-2 bg-transparent"
          aria-label={label}
        />
      </div>
    </div>
  );
};
