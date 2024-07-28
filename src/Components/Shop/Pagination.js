import React, { useState } from 'react';
import styles from './Pagination.module.css';
import Select from 'react-select';

const Pagination = ({ totalPages, onPageChange }) => {
  const [currentPage, setCurrentPage] = useState(1);
  // totalPages = 10;

  const options = Array.from({ length: totalPages }, (_, i) => ({
    value: i + 1,
    label: `${i + 1}`,
  }));

  const handlePreviousClick = () => {
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      setCurrentPage(newPage);
      onPageChange(newPage);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      const newPage = currentPage + 1;
      setCurrentPage(newPage);
      onPageChange(newPage);
    }
  };

  const handlePageChange = (event) => {
    const page = Number(event.value);
    setCurrentPage(page);
    onPageChange(page);
  };

  const getPageNumbers = () => {
    const pages = [];
    const pageRange = 5;

    let startPage, endPage;

    if (totalPages <= pageRange) {
      startPage = 1;
      endPage = totalPages;
    } else {
      if (currentPage <= Math.ceil(pageRange / 2)) {
        startPage = 1;
        endPage = pageRange;
      } else if (currentPage + Math.floor(pageRange / 2) >= totalPages) {
        startPage = totalPages - pageRange + 1;
        endPage = totalPages;
      } else {
        startPage = currentPage - Math.floor(pageRange / 2);
        endPage = currentPage + Math.floor(pageRange / 2);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (startPage > 1) {
      pages.unshift('...');
    }

    if (endPage < totalPages) {
      pages.push('...');
    }

    return pages;
  };

  return (
    <div className={styles.paginationContainer}>
      <div className={styles.paginationWrapper}>
        {currentPage > 1 && (
          <div className={styles.pageChangeLeftWrapper}>
            <div className={styles.pageChangeLeft} onClick={handlePreviousClick}>
              {'<'}
            </div>
          </div>
        )}

        {getPageNumbers().map((page, index) => (
          <div
            key={index}
            className={styles.pageWrapper}
            style={{ background: currentPage === page ? '#886830' : 'transparent' }}
          >
            {page === '...' ? (
              <div className={styles.page} style={{ color: 'white' }}>
                {page}
              </div>
            ) : (
              <div
                className={styles.page}
                onClick={() => {
                  setCurrentPage(page);
                  onPageChange(page);
                }}
                style={{ color: currentPage === page ? 'white' : 'black' }}
              >
                {page}
              </div>
            )}
          </div>
        ))}

        {currentPage < totalPages && (
          <div className={styles.pageChangeRightWrapper}>
            <div className={styles.pageChangeRight} onClick={handleNextClick}>
              {'>'}
            </div>
          </div>
        )}

        <Select
          className={styles.pageDropdown}
          options={options}
          value={options.find(option => option.value === currentPage)}
          onChange={handlePageChange}
          menuPortalTarget={document.body} 
          styles={{
            control: (provided) => ({
              ...provided,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'KingHwa-OldSong',
              fontSize: '16px',
              color: 'white',
              background: 'transparent',
              cursor: 'pointer',
              minHeight: 'auto',
              height: 'auto',
              border: '1px solid rgb(145, 145, 145)', // 添加方形外框
              'margin-left': '10px',
            }),
            singleValue: (provided) => ({
              ...provided,
              color: 'black',
              fontFamily: 'KingHwa-OldSong',
              fontSize: '16px',
            }),
            dropdownIndicator: (provided) => ({
              ...provided,
              padding: 0,
              color: 'black',
            }),
            indicatorSeparator: () => ({
              display: 'none',
            }),
            // 不修改 menu 和其他 dropdown 样式，以保持默认
          }}
        />

      </div>
    </div>
  );
};

export default Pagination;