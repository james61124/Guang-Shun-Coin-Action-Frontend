import React, { useState } from 'react'
import './Pagination.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

const Pagination = ({ totalPages, pageRangeDisplayed, onPageChange }) => {
    const [currentPage, setCurrentPage] = useState(1);
  
    const handlePreviousClick = () => {
      if (currentPage > 1) {
        const newPage = currentPage - 1;
        setCurrentPage(newPage);
        onPageChange(newPage);
      }
    };
  
    const handleNextClick = () => {
      if (currentPage + pageRangeDisplayed <= totalPages) {
        const newPage = currentPage + 1;
        setCurrentPage(newPage);
        onPageChange(newPage);
      }
    };
  
    const getPageNumbers = () => {
      let startPage = Math.max(currentPage, 1);
      let endPage = Math.min(currentPage + pageRangeDisplayed - 1, totalPages);
      let pages = [];
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      return pages;
    };
  
    return (
      <div>
        <button class="pageChange" onClick={handlePreviousClick} disabled={currentPage === 1}>{'<'}</button>
        {getPageNumbers().map((page) => (
          <button
            class="page"
            key={page}
            onClick={() => {
              setCurrentPage(page);
              onPageChange(page);
            }}
            style={{ color: currentPage === page ? '#886830' : 'black' }}
          >
            {page}
          </button>
        ))}
        <button class="pageChange" onClick={handleNextClick} disabled={currentPage + pageRangeDisplayed - 1 >= totalPages}>{'>'}</button>
      </div>
    );
  };

export default Pagination