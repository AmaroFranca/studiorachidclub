
import React, { useState } from "react";
import { FormInput } from "./FormInput";
import { Heart } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

export const RegistrationForm: React.FC = () => {
  const isMobile = useIsMobile();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic would go here
    console.log("Form submitted:", formData);
  };

  // Ajustes responsivos
  const formPadding = isMobile ? "py-[20px] px-[15px]" : "py-[26px] px-0";
  const formHeight = isMobile ? "min-h-[480px]" : "min-h-[490px]";
  const titleSize = isMobile ? "text-[18px] leading-[27px]" : "text-[22px] leading-[33px]";
  const subtitleSize = isMobile ? "text-[12px] leading-[18px]" : "text-[14px] leading-[22px]";
  const buttonMargin = isMobile ? "mt-[20px]" : "mt-[30px]";
  const buttonPadding = isMobile ? "py-[12px] px-[20px]" : "py-[15px] px-[33px]";
  const buttonFontSize = isMobile ? "text-[14px]" : "text-[16px]";
  
  return (
    <div className={`relative w-full box-border flex flex-col items-center gap-[10px] bg-[#E4E4E4] ${formPadding} rounded-[10px] border border-solid border-[rgba(115,115,115,0.5)] shadow-[5px_5px_15px_rgba(0,0,0,0.5)] md:shadow-[10px_10px_15px_rgba(0,0,0,0.5)] ${formHeight}`}>
      <div className="w-full px-[15px]">
        <div className="flex items-center justify-center gap-[10px] mb-[5px]">
          <Heart className="text-[#B1C9C3]" size={isMobile ? 20 : 24} />
          <div className={`font-poppins font-semibold ${titleSize} text-[#737373] flex items-center`}>
            Faça o seu cadastro
          </div>
        </div>
        <div className={`font-poppins ${subtitleSize} text-[#737373] text-center mb-[15px] md:mb-[20px]`}>
          Preencha com seus dados para fazer o cadastro
        </div>

        <form onSubmit={handleSubmit} className="w-full flex flex-col items-center">
          <div className="w-full max-w-[346px] mx-auto">
            <FormInput
              label="Nome"
              placeholder="Coloque aqui o nome"
              name="name"
              onChange={handleChange}
              value={formData.name}
            />

            <FormInput
              label="E-mail"
              placeholder="Coloque aqui o seu melhor e-mail"
              type="email"
              name="email"
              onChange={handleChange}
              value={formData.email}
            />

            <FormInput
              label="Número com WhatsApp"
              placeholder="Coloque aqui no número com DDD"
              type="tel"
              name="phone"
              onChange={handleChange}
              value={formData.phone}
            />

            <FormInput
              label="Senha"
              placeholder="Insira uma senha"
              type="password"
              name="password"
              onChange={handleChange}
              value={formData.password}
            />

            <FormInput
              label="Confirme a senha"
              placeholder="Confirme a sua senha"
              type="password"
              name="confirmPassword"
              onChange={handleChange}
              value={formData.confirmPassword}
            />
          </div>
        
          <div className={`w-full flex justify-center ${buttonMargin}`}>
            <button
              type="submit"
              className={`w-full max-w-[378px] ${buttonPadding} bg-[#BFA76F] rounded-[5px]`}
              onClick={(e) => handleSubmit(e)}
            >
              <span className={`font-poppins font-bold ${buttonFontSize} leading-[24px] text-[#EFEFEF] uppercase`}>
                ENVIAR MEUS DADOS
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
