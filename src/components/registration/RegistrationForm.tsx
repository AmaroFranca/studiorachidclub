import React, { useState } from "react";
import { FormInput } from "./FormInput";

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
    <div className="w-[428px] shadow-[10px_10px_15px_rgba(0,0,0,0.5)] border flex flex-col items-center gap-2.5 bg-[#E4E4E4] px-0 py-[26px] rounded-[10px] border-solid border-[rgba(115,115,115,0.5)] max-md:w-full max-sm:w-full">
      <div className="flex items-center gap-2 mb-2">
        <div>
          <div
            dangerouslySetInnerHTML={{
              __html:
                '<svg id="527:845" layer-name="mdi:heart-outline" width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg" class="heart-icon"> <path d="M12.6 19.05L12.5 19.15L12.39 19.05C7.64 14.74 4.5 11.89 4.5 9C4.5 7 6 5.5 8 5.5C9.54 5.5 11.04 6.5 11.57 7.86H13.43C13.96 6.5 15.46 5.5 17 5.5C19 5.5 20.5 7 20.5 9C20.5 11.89 17.36 14.74 12.6 19.05ZM17 3.5C15.26 3.5 13.59 4.31 12.5 5.58C11.41 4.31 9.74 3.5 8 3.5C4.92 3.5 2.5 5.91 2.5 9C2.5 12.77 5.9 15.86 11.05 20.53L12.5 21.85L13.95 20.53C19.1 15.86 22.5 12.77 22.5 9C22.5 5.91 20.08 3.5 17 3.5Z" fill="#B1C9C3"></path> </svg>',
            }}
          />
        </div>
        <div className="font-medium text-lg">Faça o seu cadastro</div>
      </div>
      <div className="text-sm text-gray-600 mb-4">
        Preencha com seus dados para fazer o cadastro
      </div>

      <form onSubmit={handleSubmit} className="w-[90%]">
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
          className="w-full py-3 mt-4 bg-[#BFA76F] text-white font-bold rounded-[5px] hover:bg-[#a89058] transition-colors"
        >
          ENVIAR MEUS DADOS
        </button>
      </form>
    </div>
  );
};
