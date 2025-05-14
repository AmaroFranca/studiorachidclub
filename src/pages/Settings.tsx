
import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import AppSidebar from "@/components/layout/AppSidebar";
import { FormInput } from "@/components/registration/FormInput";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { SidebarProvider } from "@/components/ui/sidebar";

const Settings = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "João da Silva",
    phone: "(11) 98765-4321",
    email: "joao.silva@email.com",
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
  
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate passwords match
    if (formData.password && formData.password !== formData.confirmPassword) {
      toast({
        title: "Erro",
        description: "As senhas não coincidem",
        variant: "destructive"
      });
      return;
    }

    // Here would go API call to update user data
    console.log("Saving user data:", formData);

    // Show success message
    toast({
      title: "Sucesso!",
      description: "Suas configurações foram salvas com sucesso."
    });
  };

  // Format current date
  const today = new Date();
  const formattedDate = new Intl.DateTimeFormat('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(today);

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full">
        {/* Sidebar */}
        <AppSidebar activeSection="settings" />
        
        {/* Main content */}
        <main className="flex-1 bg-[#EFEFEF] p-6">
          <div className="max-w-[930px] mx-auto">
            {/* Header with back button and date */}
            <div className="flex justify-between items-center mb-[30px]">
              <div className="flex items-center gap-2">
                <Link to="/dashboard" className="flex items-center gap-2 text-[#737373]">
                  <ArrowLeft className="text-[#BFA76F]" size={24} />
                  <span className="font-semibold text-xl md:text-2xl">Voltar</span>
                </Link>
              </div>
              
              <div>
                <span className="text-[#737373] text-sm">{formattedDate}</span>
              </div>
            </div>
            
            {/* Page title */}
            <h1 className="text-2xl font-semibold text-[#737373] mb-[40px]">Configurações</h1>
            
            {/* Form */}
            <div className="max-w-[437px]">
              <form onSubmit={handleSave} className="space-y-5">
                <div>
                  <FormInput 
                    label="Alterar nome e sobrenome" 
                    placeholder="Nome completo" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleChange} 
                  />
                </div>
                
                <div>
                  <FormInput 
                    label="Trocar número de telefone" 
                    placeholder="Coloque aqui no número com DDD" 
                    name="phone" 
                    value={formData.phone} 
                    onChange={handleChange} 
                  />
                </div>
                
                <div>
                  <FormInput 
                    label="Adicionar e-mail" 
                    placeholder="Coloque seu melhor e-mail" 
                    type="email" 
                    name="email" 
                    value={formData.email} 
                    onChange={handleChange} 
                  />
                </div>
                
                <div>
                  <FormInput 
                    label="Alterar senha" 
                    placeholder="Nova senha" 
                    type="password" 
                    name="password" 
                    value={formData.password} 
                    onChange={handleChange} 
                  />
                </div>
                
                <div>
                  <FormInput 
                    label="Confirmar nova senha" 
                    placeholder="Confirme sua nova senha" 
                    type="password" 
                    name="confirmPassword" 
                    value={formData.confirmPassword} 
                    onChange={handleChange} 
                  />
                </div>
                
                <div className="pt-4">
                  <Button 
                    type="submit" 
                    className="w-full bg-[#BFA76F] hover:bg-[#A89050] text-[#EFEFEF] font-bold text-base py-3"
                  >
                    SALVAR
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Settings;
