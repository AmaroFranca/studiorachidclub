
import React, { useState } from "react";
import { Heart, EyeOff, Eye } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export const LoginForm: React.FC = () => {
  const isMobile = useIsMobile();
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

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
      email: "",
      password: ""
    };
    let isValid = true;

    if (!formData.email) {
      newErrors.email = "E-mail é obrigatório";
      isValid = false;
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "E-mail inválido";
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = "Senha é obrigatória";
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Senha deve ter pelo menos 6 caracteres";
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
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Success message
      toast.success("Login realizado com sucesso", {
        description: "Você será redirecionado em instantes."
      });
      
      // Reset form
      setFormData({
        email: "",
        password: ""
      });
    } catch (error) {
      toast.error("Erro ao realizar login", {
        description: "Verifique suas credenciais e tente novamente."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Responsive adjustments
  const formPadding = isMobile ? "py-[20px] px-[15px]" : "py-[25px] px-0";
  const formHeight = isMobile ? "min-h-[280px]" : "min-h-[318px]";
  const titleSize = isMobile ? "text-[18px] leading-[27px]" : "text-[22px] leading-[33px]";
  const subtitleSize = isMobile ? "text-[12px] leading-[18px]" : "text-[14px] leading-[22px]";
  const buttonMargin = isMobile ? "mt-[15px]" : "mt-[30px]";
  const buttonPadding = isMobile ? "py-[12px]" : "py-[15px]";
  const buttonFontSize = isMobile ? "text-[14px]" : "text-[16px]";
  
  return (
    <div className={`relative w-full box-border flex flex-col items-center gap-[10px] bg-[#E4E4E4] ${formPadding} rounded-[10px] border border-solid border-[rgba(115,115,115,0.5)] shadow-[5px_5px_15px_rgba(0,0,0,0.5)] md:shadow-[10px_10px_15px_rgba(0,0,0,0.5)] ${formHeight}`}>
      <div className="w-full px-[15px]">
        <div className="flex items-center justify-center gap-[10px] mb-[5px]">
          <Heart className="text-[#B1C9C3]" size={isMobile ? 20 : 24} />
          <div className={`font-poppins font-semibold ${titleSize} text-[#737373] flex items-center`}>
            Faça o seu Login
          </div>
        </div>
        <div className={`font-poppins ${subtitleSize} text-[#737373] text-center mb-[15px] md:mb-[20px]`}>
          Preencha com seus dados para fazer o cadastro
        </div>

        <form onSubmit={handleSubmit} className="w-full flex flex-col items-center">
          <div className="w-full max-w-[346px] mx-auto space-y-4">
            <div className="space-y-1">
              <Label 
                htmlFor="email" 
                className="font-poppins font-semibold text-[12px] leading-[18px] text-[#737373]"
              >
                E-mail
              </Label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`h-[38px] text-sm font-poppins border-[rgba(115,115,115,0.5)] focus-visible:ring-[#B1C9C3] px-[11px] py-0 bg-transparent`}
                  aria-invalid={!!errors.email}
                />
                {!formData.email && (
                  <div className="absolute left-[11px] top-[50%] transform -translate-y-1/2 font-poppins font-normal text-[12px] md:text-[10px] leading-[15px] text-[rgba(115,115,115,0.5)]">
                    Coloque aqui o seu melhor e-mail
                  </div>
                )}
                {errors.email && (
                  <p className="text-red-500 text-[10px] mt-1">{errors.email}</p>
                )}
              </div>
            </div>

            <div className="space-y-1">
              <Label 
                htmlFor="password" 
                className="font-poppins font-semibold text-[12px] leading-[18px] text-[#737373]"
              >
                Senha
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="h-[38px] text-sm font-poppins border-[rgba(115,115,115,0.5)] pr-10 focus-visible:ring-[#B1C9C3] px-[11px] py-0 bg-transparent"
                  aria-invalid={!!errors.password}
                />
                {!formData.password && (
                  <div className="absolute left-[11px] top-[50%] transform -translate-y-1/2 font-poppins font-normal text-[12px] md:text-[10px] leading-[15px] text-[rgba(115,115,115,0.5)]">
                    Insira uma senha
                  </div>
                )}
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#737373] hover:text-[#4b4b4b]"
                  aria-label={showPassword ? "Esconder senha" : "Mostrar senha"}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
                {errors.password && (
                  <p className="text-red-500 text-[10px] mt-1">{errors.password}</p>
                )}
              </div>
            </div>
          </div>
        
          <div className={`w-full flex justify-center ${buttonMargin}`}>
            <Button
              type="submit"
              className={`w-full max-w-[378px] ${buttonPadding} font-poppins font-bold ${buttonFontSize} leading-[24px] text-[#EFEFEF] uppercase bg-[#BFA76F] hover:bg-[#A89057] rounded-[5px]`}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Enviando..." : "Enviar meus dados"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
