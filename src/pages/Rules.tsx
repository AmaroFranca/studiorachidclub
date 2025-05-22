
import React from "react";
import { List } from "lucide-react";
import { Link } from "react-router-dom";
import { SidebarProvider, Sidebar } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import AppSidebar from "@/components/layout/AppSidebar";

const Rules: React.FC = () => {
  const currentDate = new Date();
  const formattedDate = `${currentDate.getDate()} de ${getMonthName(currentDate.getMonth())} de ${currentDate.getFullYear()}`;
  
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full">
        <Sidebar className="border-r bg-[#D9D9D9]">
          <AppSidebar activeSection="rules" />
        </Sidebar>
        
        <main className="flex-1 bg-[#EFEFEF] p-6">
          <div className="max-w-5xl mx-auto">
            {/* Header */}
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-2xl font-semibold text-[#737373]">Olá, Amaro</h2>
              <div className="flex items-center gap-4">
                <span className="text-sm text-[#737373]">{formattedDate}</span>
              </div>
            </div>
            
            {/* Page Title */}
            <div className="flex items-center justify-center gap-3 mb-8">
              <List className="text-[#BFA76F] h-8 w-8" />
              <h1 className="text-3xl font-bold text-[#737373]">Regras do Programa</h1>
            </div>
            
            {/* Rules Content */}
            <div className="bg-[#D9D9D9] rounded-lg shadow-[10px_10px_15px_#737373] p-8">
              <div className="text-left max-w-4xl mx-auto space-y-8 text-[#737373]">
                
                <section>
                  <h2 className="text-2xl font-bold text-[#737373] mb-4">Regras do Programa de Indicação</h2>
                  
                  <h3 className="text-xl font-semibold text-[#737373] mb-3">Como funciona:</h3>
                  <p className="mb-3">Sabe quando você gosta tanto de um lugar que quer indicar pra todo mundo?</p>
                  <p>Aqui no Studio Rachid, você ganha pontos por isso.</p>
                  <p>Você indica alguém → a pessoa vem até a clínica → você acumula pontos → e troca por prêmios ou experiências top. Simples assim.</p>
                </section>
                
                <hr className="border-[#737373] opacity-30" />
                
                <section>
                  <h3 className="text-xl font-semibold text-[#737373] mb-3">Como ganhar pontos:</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>20 pontos</strong> – se a pessoa que você indicou vier retirar o presente.</li>
                    <li><strong>50 pontos</strong> – se ela fechar um tratamento de até R$ 500.</li>
                    <li><strong>100 pontos</strong> – se o tratamento for até R$ 1.000.</li>
                    <li><strong>250 pontos</strong> – se for um tratamento premium (acima de R$ 5.000).</li>
                  </ul>
                  <p className="mt-3">Você pode indicar quantas pessoas quiser. Indicação boa é indicação compartilhada.</p>
                </section>
                
                <hr className="border-[#737373] opacity-30" />
                
                <section>
                  <h3 className="text-xl font-semibold text-[#737373] mb-3">Prêmios e experiências:</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>A partir de 100 pontos, você já pode trocar por prêmios.</li>
                    <li>Quando bater 1.000 pontos, você desbloqueia a fase VIP, com experiências exclusivas como jantar romântico, spa, botox e muito mais.</li>
                  </ul>
                </section>
                
                <hr className="border-[#737373] opacity-30" />
                
                <section>
                  <h3 className="text-xl font-semibold text-[#737373] mb-3">Quer ganhar mais 10 pontos rapidinho?</h3>
                  <p>Depois que você faz uma indicação, o app te mostra uma mensagem pronta.</p>
                  <p>Se você copiar e mandar essa mensagem pro indicado pelo WhatsApp, ganha mais 10 pontos e ainda ajuda a pessoa a entender o que está rolando.</p>
                  <p className="mt-3">Você se aproxima e a clínica também.</p>
                </section>
                
                <hr className="border-[#737373] opacity-30" />
                
                <section>
                  <h3 className="text-xl font-semibold text-[#737373] mb-3">Regras rápidas:</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Os pontos valem por 12 meses.</li>
                    <li>A equipe da clínica confere se o indicado compareceu ou fechou tratamento.</li>
                    <li>Os prêmios estão sujeitos à disponibilidade.</li>
                    <li>O resgate é feito por aqui mesmo, direto no app.</li>
                  </ul>
                </section>
                
                <div className="flex justify-center pt-6">
                  <Link to="/dashboard">
                    <Button className="bg-[#B1C9C3] hover:bg-[#9fb9b2] text-[#737373] font-semibold py-3 px-6">
                      Voltar ao painel
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

// Helper function to get month name
function getMonthName(month: number): string {
  const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
  return months[month];
}

export default Rules;
