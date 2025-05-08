
import React, { useState } from "react";
import { ArrowLeft, Filter, Plus, Check, ArrowRight } from "lucide-react";
import { SidebarProvider, Sidebar } from "@/components/ui/sidebar";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import AppSidebar from "@/components/layout/AppSidebar";
import { getFormattedDate } from "@/utils/dateUtils";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";

interface Referral {
  id: number;
  name: string;
  referralDate: string;
  collectedGift: boolean;
  becamePatient: boolean;
}

const Referrals: React.FC = () => {
  const formattedDate = getFormattedDate();
  const [currentPage, setCurrentPage] = useState(1);
  
  const mockReferrals: Referral[] = [
    {
      id: 1,
      name: "Pamela Monti Rachid",
      referralDate: "10/04/2024",
      collectedGift: true,
      becamePatient: true
    },
    {
      id: 2,
      name: "Vinícius Lima",
      referralDate: "15/04/2024",
      collectedGift: false,
      becamePatient: false
    },
    {
      id: 3,
      name: "Maria Fernanda",
      referralDate: "20/04/2024",
      collectedGift: true,
      becamePatient: false
    },
    // Adding more mock data to demonstrate pagination
    {
      id: 4,
      name: "Carlos Oliveira",
      referralDate: "22/04/2024",
      collectedGift: false,
      becamePatient: true
    },
    {
      id: 5,
      name: "Ana Carolina",
      referralDate: "23/04/2024",
      collectedGift: true,
      becamePatient: false
    },
    {
      id: 6,
      name: "Paulo Mendes",
      referralDate: "24/04/2024",
      collectedGift: false,
      becamePatient: false
    },
    {
      id: 7,
      name: "Juliana Costa",
      referralDate: "25/04/2024",
      collectedGift: true,
      becamePatient: true
    },
    {
      id: 8,
      name: "Ricardo Ferreira",
      referralDate: "26/04/2024",
      collectedGift: false,
      becamePatient: false
    },
    {
      id: 9,
      name: "Mariana Silva",
      referralDate: "27/04/2024",
      collectedGift: true,
      becamePatient: false
    },
    {
      id: 10,
      name: "Roberto Alves",
      referralDate: "28/04/2024",
      collectedGift: false,
      becamePatient: true
    }
  ];

  // Pagination logic
  const itemsPerPage = 10;
  const pageCount = Math.ceil(mockReferrals.length / itemsPerPage);
  const paginatedReferrals = mockReferrals.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full">
        <Sidebar className="border-r bg-[#D9D9D9]">
          <AppSidebar activeSection="referrals" />
        </Sidebar>
        
        <main className="flex-1 bg-[#EFEFEF] p-6">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-2">
                <Link to="/dashboard" className="flex items-center gap-2 text-[#737373]">
                  <ArrowLeft className="text-[#BFA76F]" />
                  <span className="text-xl font-semibold">Voltar</span>
                </Link>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-[#737373]">{formattedDate}</span>
              </div>
            </div>
            
            {/* Summary and Actions */}
            <div className="mb-10">
              <h1 className="text-2xl font-semibold text-[#737373] mb-4">Pessoas Indicadas</h1>
              
              <div className="flex flex-col md:flex-row justify-between md:items-center bg-[#EFEFEF] mb-8">
                <div className="mb-4 md:mb-0">
                  <h2 className="text-xl font-semibold text-[#737373]">
                    Total de <span className="text-[#BFA76F]">03</span> indicações Realizadas
                  </h2>
                  <p className="text-base font-semibold text-[#737373]">
                    Total de Pontos: <span className="text-[#BFA76F]">270</span> pontos
                  </p>
                  
                  <div className="mt-4">
                    <button className="flex items-center gap-2 px-4 py-2 border border-[#737373]/50 rounded-md text-[#737373] font-semibold">
                      <Filter className="h-4 w-4 text-[#BFA76F]" />
                      <span>Filtro</span>
                    </button>
                  </div>
                </div>
                
                <div>
                  <button className="px-6 py-3 bg-[#BFA76F] rounded-md text-white font-semibold hover:bg-[#BFA76F]/90 transition-colors flex items-center gap-2">
                    <Plus className="h-5 w-5" />
                    QUERO INDICAR AGORA!
                  </button>
                </div>
              </div>
            </div>
            
            {/* Referral List */}
            <div className="mb-8">
              {paginatedReferrals.map((referral) => (
                <div 
                  key={referral.id}
                  className="mb-4 bg-[#D9D9D9]/50 rounded-lg shadow-[10px_10px_15px_#737373] p-4"
                >
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex items-center gap-4">
                      <div className="bg-[#B1C9C3] h-10 w-10 rounded-full flex items-center justify-center text-[#737373]">
                        {/* User icon placeholder */}
                      </div>
                      <h3 className="text-lg font-semibold text-[#737373]">{referral.name}</h3>
                    </div>
                    
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                      <div className="text-xs font-semibold text-[#737373]">
                        Indicado (a) em:<br />{referral.referralDate}
                      </div>
                      
                      <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                          <div className="flex flex-col text-xs font-semibold text-[#737373] text-center">
                            <span>Retirou</span>
                            <span>Presente</span>
                          </div>
                          <div className="h-6 w-6 relative border-2 border-[#BFA76F] rounded">
                            {referral.collectedGift && (
                              <Check className="h-5 w-5 absolute text-[#B1C9C3]" />
                            )}
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <div className="flex flex-col text-xs font-semibold text-[#737373] text-center">
                            <span>Virou</span>
                            <span>Paciente</span>
                          </div>
                          <div className="h-6 w-6 relative border-2 border-[#BFA76F] rounded">
                            {referral.becamePatient && (
                              <Check className="h-5 w-5 absolute text-[#B1C9C3]" />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Pagination */}
            {pageCount > 1 && (
              <div className="flex justify-center items-center gap-2 mt-8">
                <button 
                  className="px-2 py-1 text-[#737373] font-bold"
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  &lt;&lt;
                </button>
                <span className="text-[#737373] font-bold">{currentPage}</span>
                <button 
                  className="px-2 py-1 text-[#737373] font-bold"
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, pageCount))}
                  disabled={currentPage === pageCount}
                >
                  &gt;&gt;
                </button>
              </div>
            )}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Referrals;
