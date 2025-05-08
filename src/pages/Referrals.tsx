
import React, { useState } from "react";
import { ArrowLeft, Filter, Plus, Check, User } from "lucide-react";
import { SidebarProvider, Sidebar } from "@/components/ui/sidebar";
import { Link } from "react-router-dom";
import AppSidebar from "@/components/layout/AppSidebar";
import { getFormattedDate } from "@/utils/dateUtils";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

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
  const [date, setDate] = useState<Date | undefined>(undefined);
  const isMobile = useIsMobile();
  
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
  const itemsPerPage = isMobile ? 10 : 5;
  const pageCount = Math.ceil(mockReferrals.length / itemsPerPage);
  const paginatedReferrals = mockReferrals.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalReferrals = mockReferrals.length;

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full">
        <Sidebar className="border-r bg-[#D9D9D9]">
          <AppSidebar activeSection="referrals" />
        </Sidebar>
        
        <main className="flex-1 bg-[#EFEFEF] p-6 flex flex-col">
          <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col">
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
              <h1 className="text-2xl font-semibold text-[#737373] mb-4 text-left">Pessoas Indicadas</h1>
              
              <div className="flex flex-col md:flex-row justify-between md:items-start bg-[#EFEFEF] mb-8">
                <div className="mb-4 md:mb-0 text-left">
                  <h2 className="text-xl font-semibold text-[#737373] text-left">
                    Total de <span className="text-[#BFA76F]">{totalReferrals.toString().padStart(2, '0')}</span> indicações Realizadas
                  </h2>
                  <p className="text-base font-semibold text-[#737373] text-left">
                    Total de Pontos: <span className="text-[#BFA76F]">270</span> pontos
                  </p>
                  
                  <div className="mt-4">
                    <Popover>
                      <PopoverTrigger asChild>
                        <button className="flex items-center gap-2 px-4 py-2 border border-[#737373]/50 rounded-md text-[#737373] font-semibold">
                          <Filter className="h-4 w-4 text-[#BFA76F]" />
                          <span>Filtro</span>
                        </button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-4">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          className="rounded-md border pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
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
            <div className="mb-8 flex-1">
              {paginatedReferrals.map((referral) => (
                <div 
                  key={referral.id}
                  className="mb-4 bg-[#D9D9D9]/50 rounded-lg shadow-[10px_10px_15px_#737373] p-4"
                >
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex items-center gap-4">
                      <div className="bg-[#B1C9C3] h-10 w-10 rounded-full flex items-center justify-center text-[#737373]">
                        <User size={20} className="text-[#737373]" />
                      </div>
                      <h3 className="text-lg font-semibold text-[#737373]">{referral.name}</h3>
                    </div>
                    
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                      <div className="text-xs font-semibold">
                        <span className="text-[#737373]">Indicado (a) em:</span><br />
                        <span className="text-[#BFA76F]">{referral.referralDate}</span>
                      </div>
                      
                      <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                          <div className="flex flex-col text-xs font-semibold text-[#737373] text-center">
                            <span>Retirou</span>
                            <span>Presente</span>
                          </div>
                          <div className="h-6 w-6 relative border-2 border-[#BFA76F] rounded">
                            {referral.collectedGift && (
                              <Check className="h-5 w-5 absolute text-[#B1C9C3] stroke-[3]" />
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
                              <Check className="h-5 w-5 absolute text-[#B1C9C3] stroke-[3]" />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Pagination - moved to footer */}
            <footer className="mt-auto py-4">
              {pageCount > 1 && (
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious 
                        href="#" 
                        onClick={(e) => {
                          e.preventDefault();
                          setCurrentPage(prev => Math.max(prev - 1, 1));
                        }}
                        className={`${currentPage === 1 ? 'pointer-events-none opacity-50' : ''} text-[#737373]`}
                      />
                    </PaginationItem>
                    
                    {Array.from({ length: pageCount }).map((_, index) => (
                      <PaginationItem key={index}>
                        <PaginationLink
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            setCurrentPage(index + 1);
                          }}
                          isActive={currentPage === index + 1}
                          className="text-[#737373] font-bold"
                        >
                          {index + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    
                    <PaginationItem>
                      <PaginationNext 
                        href="#" 
                        onClick={(e) => {
                          e.preventDefault();
                          setCurrentPage(prev => Math.min(prev + 1, pageCount));
                        }}
                        className={`${currentPage === pageCount ? 'pointer-events-none opacity-50' : ''} text-[#737373]`}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              )}
            </footer>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Referrals;
