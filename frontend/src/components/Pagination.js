import React, { useEffect, useState, useMemo } from "react";
//import Pagination from "react-bootstrap/Pagination";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

const PaginationComponent = ({
  total = 0,
  itemsPerPage = 5,
  currentPage = 1,
  onPageChange,
}) => {
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (total > 0 && itemsPerPage > 0)
      setTotalPages(Math.ceil(total / itemsPerPage));
  }, [total, itemsPerPage]);

  const paginationItems = useMemo(() => {
    const pages = [];

    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <PaginationItem
        
          key={i}
          active={i === currentPage}
          onClick={() => onPageChange(i)}
        >
          <PaginationLink className="bg-dark border-0">{i}</PaginationLink>
        </PaginationItem>
      );
    }

    return pages;
  }, [totalPages, currentPage]);

  if (totalPages === 0) return null;

  return (
    <Pagination className="d-flex d-inline mt-2">
      <PaginationItem 
      className=""
      disabled={currentPage === 1}>
        <PaginationLink
          previous
          className="bg-gray text-white"
          onClick={() => onPageChange(currentPage - 1)}
        />
      </PaginationItem>
      {paginationItems}
      <PaginationItem 
        disabled={currentPage === totalPages}>
        <PaginationLink
          next 
          className="bg-gray text-white"
          onClick={() => onPageChange(currentPage + 1)}
        />
      </PaginationItem>
    </Pagination>
  );
};

export default PaginationComponent;
