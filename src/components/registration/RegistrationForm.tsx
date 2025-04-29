
import React, { useState } from "react";
import { FormInput } from "./FormInput";
import { Heart } from "lucide-react";

export const RegistrationForm: React.FC = () => {
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

  return (
    <div className="relative w-[428px] shadow-[10px_10px_15px_rgba(0,0,0,0.5)] border border-solid border-[rgba(115,115,115,0.5)] flex flex-col items-center gap-[10px] bg-[#E4E4E4] py-[26px] px-0 rounded-[10px]">
      <div className="w-[398px] px-[15px]">
        <div className="flex items-center justify-center gap-[10px] mb-2">
          <Heart className="text-[#B1C9C3]" size={24} />
          <div className="font-poppins font-semibold text-[22px] text-[#737373]">Faça o seu cadastro</div>
        </div>
        <div className="font-poppins text-[14px] text-[#737373] mb-5 text-center">
          Preencha com seus dados para fazer o cadastro
        </div>

        <form onSubmit={handleSubmit} className="w-full">
          <div className="w-[346px] mx-auto">
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
        </form>
      </div>
      
      <button
        type="submit"
        className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-[378px] py-[15px] px-[33px] bg-[#BFA76F] text-[#EFEFEF] font-poppins font-bold text-[16px] rounded-[5px] hover:bg-[#a89058] transition-colors uppercase text-center"
        onClick={(e) => handleSubmit(e)}
      >
        Enviar meus dados
      </button>
    </div>
  );
};
