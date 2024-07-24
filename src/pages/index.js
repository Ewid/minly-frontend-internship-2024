import React, { useState } from 'react';
import { Box } from '@mui/material';
import MovieList from '../components/MovieList';
import NavBar from '../components/NavBar';
import styles from './index.module.css';

export default function Home() {
  const [searchResults, setSearchResults] = useState(null);

  const handleSearch = (results) => {
    setSearchResults(results);
  };

  return (
    <>
      <NavBar onSearch={handleSearch} />
      <Box className={styles.index}>
        <MovieList searchResults={searchResults} />
      </Box>
    </>
  );
}
