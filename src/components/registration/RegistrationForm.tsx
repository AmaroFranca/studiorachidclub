import React, { useState } from "react";
import { FormInput } from "./FormInput";
import { Heart } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export const RegistrationForm: React.FC = () => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear error when typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: ""
    };
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = "Nome é obrigatório";
      isValid = false;
    }

    if (!formData.email) {
      newErrors.email = "E-mail é obrigatório";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "E-mail inválido";
      isValid = false;
    }

    if (!formData.phone) {
      newErrors.phone = "Telefone é obrigatório";
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = "Senha é obrigatória";
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Senha deve ter pelo menos 6 caracteres";
      isValid = false;
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Senhas não coincidem";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      console.log('Attempting to sign up user:', formData.email);
      
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            name: formData.name,
            phone: formData.phone,
          }
        }
      });

      if (error) {
        console.error('Signup error:', error);
        
        if (error.message.includes('already registered')) {
          toast.error("Este e-mail já está cadastrado", {
            description: "Tente fazer login ou use outro e-mail."
          });
        } else {
          toast.error("Erro ao criar conta", {
            description: error.message
          });
        }
        return;
      }

      console.log('Signup successful:', data);
      
      toast.success("Conta criada com sucesso!", {
        description: "Você pode fazer login agora."
      });
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
      });

      // Navigate to login
      navigate('/login');
      
    } catch (error) {
      console.error('Unexpected error:', error);
      toast.error("Erro inesperado", {
        description: "Tente novamente em alguns instantes."
      });
    } finally {
      setIsSubmitting(false);
    }
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
              error={errors.name}
            />

            <FormInput
              label="E-mail"
              placeholder="Coloque aqui o seu melhor e-mail"
              type="email"
              name="email"
              onChange={handleChange}
              value={formData.email}
              error={errors.email}
            />

            <FormInput
              label="Número com WhatsApp"
              placeholder="Coloque aqui no número com DDD"
              type="tel"
              name="phone"
              onChange={handleChange}
              value={formData.phone}
              error={errors.phone}
            />

            <FormInput
              label="Senha"
              placeholder="Insira uma senha"
              type="password"
              name="password"
              onChange={handleChange}
              value={formData.password}
              error={errors.password}
            />

            <FormInput
              label="Confirme a senha"
              placeholder="Confirme a sua senha"
              type="password"
              name="confirmPassword"
              onChange={handleChange}
              value={formData.confirmPassword}
              error={errors.confirmPassword}
            />
          </div>
        
          <div className={`w-full flex justify-center ${buttonMargin}`}>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full max-w-[378px] ${buttonPadding} bg-[#BFA76F] hover:bg-[#A89057] disabled:opacity-50 disabled:cursor-not-allowed rounded-[5px] transition-colors`}
            >
              <span className={`font-poppins font-bold ${buttonFontSize} leading-[24px] text-[#EFEFEF] uppercase`}>
                {isSubmitting ? "CRIANDO CONTA..." : "ENVIAR MEUS DADOS"}
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
