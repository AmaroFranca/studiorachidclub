
import React, { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/layout/AppSidebar";
import { ArrowLeft } from "lucide-react";
import { FormInput } from "@/components/registration/FormInput";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

const Settings = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Format date to "DD de Month de YYYY" in Portuguese
  const today = new Date();
  const day = today.getDate();
  const year = today.getFullYear();
  
  const months = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];
  const month = months[today.getMonth()];
  
  const formattedDate = `${day} de ${month} de ${year}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (password !== confirmPassword) {
      toast({
        title: "Erro",
        description: "As senhas não coincidem",
        variant: "destructive",
      });
      return;
    }
    
    // Submit form data
    toast({
      title: "Sucesso",
      description: "Suas configurações foram salvas",
    });
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar activeSection="settings" />
        
        <div className="flex-1 bg-[#EFEFEF]">
          <div className="p-6 max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-14">
              <div className="flex items-center gap-2.5">
                <ArrowLeft className="text-[#BFA76F]" />
                <span className="font-poppins font-semibold text-[22px] text-[#737373]">Voltar</span>
              </div>
              <div className="font-poppins font-normal text-[12px] leading-[18px] text-[#737373]">
                {formattedDate}
              </div>
            </div>
            
            <div className="flex flex-col items-start">
              <h1 className="font-poppins font-semibold text-[36px] leading-[54px] text-[#737373] mb-10">
                Configurações
              </h1>
              
              <form onSubmit={handleSubmit} className="w-full max-w-[379px]">
                <div className="mb-5">
                  <label className="block font-poppins font-semibold text-[16px] text-[#737373] mb-2.5">
                    Alterar nome e sobrenome
                  </label>
                  <FormInput
                    label=""
                    placeholder="Coloque aqui o nome"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                
                <div className="mb-5">
                  <label className="block font-poppins font-semibold text-[16px] text-[#737373] mb-2.5">
                    Trocar número de telefone
                  </label>
                  <FormInput
                    label=""
                    placeholder="Coloque aqui no número com DDD"
                    name="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                
                <div className="mb-5">
                  <label className="block font-poppins font-semibold text-[16px] text-[#737373] mb-2.5">
                    Trocar e-mail
                  </label>
                  <FormInput
                    label=""
                    placeholder="Coloque seu melhor e-mail"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                
                <div className="mb-5">
                  <label className="block font-poppins font-semibold text-[16px] text-[#737373] mb-2.5">
                    Alterar senha
                  </label>
                  <FormInput
                    label=""
                    placeholder="Coloque aqui o nome"
                    name="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                
                <div className="mb-5">
                  <label className="block font-poppins font-semibold text-[16px] text-[#737373] mb-2.5">
                    Confirmar nova senha
                  </label>
                  <FormInput
                    label=""
                    placeholder="Coloque aqui no número com DDD"
                    name="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                
                <Button 
                  type="submit"
                  className="w-full h-[49px] bg-[#BFA76F] hover:bg-[#a8916a] text-[#EFEFEF] font-bold rounded-[5px] mt-5"
                >
                  Salvar
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Settings;
