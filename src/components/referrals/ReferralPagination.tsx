
import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface ReferralPaginationProps {
  currentPage: number;
  pageCount: number;
  setCurrentPage: (page: number) => void;
}

const ReferralPagination: React.FC<ReferralPaginationProps> = ({
  currentPage,
  pageCount,
  setCurrentPage,
}) => {
  if (pageCount <= 1) return null;
  
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious 
            href="#" 
            onClick={(e) => {
              e.preventDefault();
              setCurrentPage(Math.max(currentPage - 1, 1));
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
              setCurrentPage(Math.min(currentPage + 1, pageCount));
            }}
            className={`${currentPage === pageCount ? 'pointer-events-none opacity-50' : ''} text-[#737373]`}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default ReferralPagination;
