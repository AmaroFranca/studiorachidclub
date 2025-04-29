
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
    <div className="w-[450px] shadow-[10px_10px_20px_rgba(0,0,0,0.3)] border flex flex-col items-center gap-2.5 bg-[#f0f0f0] px-0 py-[26px] rounded-[10px] border-solid border-[rgba(255,255,255,0.7)]">
      <div className="w-[90%]">
        <div className="flex items-center gap-2 mb-2">
          <Heart className="text-[#B1C9C3]" size={22} />
          <div className="font-medium text-lg text-gray-700">Faça o seu cadastro</div>
        </div>
        <div className="text-sm text-gray-600 mb-5">
          Preencha com seus dados para fazer o cadastro
        </div>

        <form onSubmit={handleSubmit} className="w-full">
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

          <button
            type="submit"
            className="w-full py-3 mt-2 bg-[#BFA76F] text-white font-bold rounded-[5px] hover:bg-[#a89058] transition-colors uppercase"
          >
            Enviar meus dados
          </button>
        </form>
      </div>
    </div>
  );
};
