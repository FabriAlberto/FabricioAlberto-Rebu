"use client";
import React, { FC } from "react";
import { useTableNavigation } from "@/hooks/useTableNavigation";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

type Props = {
  totalCount: number;
  pageSize?: number;
};

const RadixPaginator: FC<Props> = ({ totalCount, pageSize = 10 }) => {
  const { searchParams, handlePageChange } = useTableNavigation();
  const currentPage = Number(searchParams.get("page") || 1);
  const totalPages = Math.ceil(totalCount / pageSize);

  const onPrev = () => {
    if (currentPage > 1) handlePageChange(currentPage - 1);
  };
  const onNext = () => {
    if (currentPage < totalPages) handlePageChange(currentPage + 1);
  };
  // mejoras, usar algun paginador de una libreria o modificar este para que se generern elipsis cuando sean muchas más páginas
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={onPrev}
        disabled={currentPage === 1}
        className="p-1 rounded border border-gray-200 disabled:opacity-50 hover:bg-gray-100"
      >
        <ChevronLeftIcon size={16} />
      </button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={`px-3 py-1 rounded border border-gray-200 ${
            page === currentPage
              ? "bg-[#1fcc69] text-white border-[#1fcc69]"
              : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={onNext}
        disabled={currentPage === totalPages}
        className="p-1 rounded border border-gray-200 disabled:opacity-50 hover:bg-gray-100"
      >
        <ChevronRightIcon size={16} />
      </button>
    </div>
  );
};

export default RadixPaginator;
