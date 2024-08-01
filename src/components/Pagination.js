import React from 'react';
import styles from './Pagination.module.css';
import { Box } from '@mui/material';

const Pagination = ({ currentPage, pagesCount, setCurrentPage }) => {
  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < pagesCount) setCurrentPage(currentPage + 1);
  };

  return (
    <Box className={styles.pagination}>
      <button onClick={handlePrev} disabled={currentPage <= 1}>
        Prev
      </button>
      {[...Array(pagesCount).keys()].map((num) => (
        <button
          key={num}
          className={num + 1 === currentPage ? styles.active : ''}
          onClick={() => setCurrentPage(num + 1)}
        >
          {num + 1}
        </button>
      ))}
      <button onClick={handleNext} disabled={currentPage >= pagesCount}>
        Next
      </button>
    </Box>
  );
};

export default Pagination;
