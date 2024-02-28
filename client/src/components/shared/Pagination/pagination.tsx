import useSearchParams from "@/hooks/useSearchParams";
import React from "react";
import { PaginationProps } from "./types";
import { Button } from "../Button";

const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  itemsPerPage,
  currentPage,
  visiblePages,
}) => {
  const { updateSearchParams } = useSearchParams();
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const { startPage, endPage } = calculatePagination(
    totalPages,
    currentPage,
    visiblePages
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      updateSearchParams("page", String(page), "add");
    }
  };

  return (
    <div className="flex items-center justify-center gap-3">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="disabled:text-gray-300"
      >
        {"< "}
        Previous
      </button>
      <div className="flex items-center gap-3">
        {Array.from(
          { length: endPage - startPage + 1 },
          (_, i) => i + startPage
        ).map((page) => (
          <Button
            variant="outlined"
            key={page}
            onClick={() => handlePageChange(page)}
            disabled={page === currentPage}
            className="px-[16px]"
          >
            {page}
          </Button>
        ))}
      </div>
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="disabled:text-gray-300"
      >
        Next
        {" >"}
      </button>
    </div>
  );
};

const calculatePagination = (
  totalPages: number,
  currentPage: number,
  visiblePages: number
) => {
  let startPage, endPage;

  if (totalPages <= visiblePages) {
    startPage = 1;
    endPage = totalPages;
  } else {
    const halfVisiblePages = Math.floor(visiblePages / 2);
    if (currentPage <= halfVisiblePages) {
      startPage = 1;
      endPage = visiblePages;
    } else if (currentPage + halfVisiblePages >= totalPages) {
      startPage = totalPages - visiblePages + 1;
      endPage = totalPages;
    } else {
      startPage = currentPage - halfVisiblePages;
      endPage = currentPage + halfVisiblePages;
    }
  }

  return { startPage, endPage };
};

export { Pagination };
