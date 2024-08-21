import { useState } from "react";

type UsePaginationProps = {
  totalItems: number;
  itemsPerPage: number;
  initialPage?: number;
};

type UsePagination = {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
  handlePageChange: (page: number) => void;
};

const usePagination = ({
  totalItems,
  itemsPerPage,
  initialPage = 1,
}: UsePaginationProps): UsePagination => {
  const [currentPage, setCurrentPage] = useState<number>(initialPage);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return {
    currentPage,
    totalPages,
    setCurrentPage,
    handlePageChange,
  };
};

export default usePagination;
