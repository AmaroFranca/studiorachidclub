
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Settings as SettingsIcon } from "lucide-react";
import { getFormattedDate } from "@/utils/dateUtils";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/layout/AppSidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"; 
import { Input } from "@/components/ui/input"; 
import { Button } from "@/components/ui/button";

const Settings: React.FC = () => {
  const formattedDate = getFormattedDate();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Submit form data to API
    console.log("Form data submitted:", formData);
    // Implementation for actual form submission would go here
  };

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full bg-[#EFEFEF]">
        <AppSidebar activeSection="settings" />
        
        <div className="flex-1 p-6">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-2">
              <Link to="/dashboard" className="flex items-center gap-2 text-[#737373]">
                <ArrowLeft className="text-[#BFA76F]" />
                <span className="text-xl font-semibold">Voltar</span>
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-[#737373]">{formattedDate}</span>
              <Avatar className="h-[30px] w-[30px]">
                <AvatarImage src="" />
                <AvatarFallback className="bg-[#BFA76F]"></AvatarFallback>
              </Avatar>
            </div>
          </div>

          <div className="max-w-[930px] mx-auto">
            <h1 className="text-3xl font-semibold text-[#737373] mb-12">Configurações</h1>
            
            <div className="flex flex-col items-center mb-8">
              <Avatar className="h-[100px] w-[100px] mb-2">
                <AvatarImage src="" />
                <AvatarFallback className="bg-[#BFA76F] text-4xl">
                  <span className="sr-only">Avatar do usuário</span>
                </AvatarFallback>
              </Avatar>
              <span className="text-[#737373]">Alterar</span>
            </div>

            <form onSubmit={handleSubmit} className="max-w-[379px] mx-auto">
              <div className="mb-5">
                <label className="block text-[#737373] font-semibold text-base mb-2">
                  Alterar nome e sobrenome
                </label>
                <Input 
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Coloque aqui o nome"
                  className="h-[35px] border-[rgba(115,115,115,0.5)] rounded-[5px] bg-transparent placeholder:text-[#737373]"
                />
              </div>

              <div className="mb-5">
                <label className="block text-[#737373] font-semibold text-base mb-2">
                  Trocar número de telefone
                </label>
                <Input 
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Coloque aqui no número com DDD"
                  className="h-[35px] border-[rgba(115,115,115,0.5)] rounded-[5px] bg-transparent placeholder:text-[#737373]"
                />
              </div>

              <div className="mb-5">
                <label className="block text-[#737373] font-semibold text-base mb-2">
                  adicionar e-mail
                </label>
                <Input 
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Coloque seu melhor e-mail"
                  className="h-[35px] border-[rgba(115,115,115,0.5)] rounded-[5px] bg-transparent placeholder:text-[#737373]"
                />
              </div>

              <div className="mb-5">
                <label className="block text-[#737373] font-semibold text-base mb-2">
                  Alterar senha
                </label>
                <Input 
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Coloque aqui o nome"
                  className="h-[35px] border-[rgba(115,115,115,0.5)] rounded-[5px] bg-transparent placeholder:text-[#737373]"
                />
              </div>

              <div className="mb-6">
                <label className="block text-[#737373] font-semibold text-base mb-2">
                  Confirmar nova senha
                </label>
                <Input 
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Coloque aqui no número com DDD"
                  className="h-[35px] border-[rgba(115,115,115,0.5)] rounded-[5px] bg-transparent placeholder:text-[#737373]"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-[#BFA76F] hover:bg-[#BFA76F]/90 rounded-[5px] h-[49px] text-base font-bold text-[#EFEFEF]"
              >
                Salvar
              </Button>
            </form>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Settings;
