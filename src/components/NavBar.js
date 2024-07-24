import React, { useState } from 'react';
import styles from './NavBar.module.css';
import { Box, InputBase } from '@mui/material';
import Link from 'next/link';

const NavBar = ({ onSearch }) => {
  const [search, setSearchQuery] = useState('');

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    fetch(`http://localhost:3001/movies?search=${search}`)
      .then((response) => response.json())
      .then((data) => {
        onSearch(data);
      })
      .catch((error) => console.error('Error fetching search results:', error));
  };

  return (
    <div className={styles.navbar}>
      <Box className={styles.logo}>
        <Link href="/">MMDB</Link>
      </Box>
      <Box
        component="form"
        onSubmit={handleSearchSubmit}
        className={styles.searchContainer}
      >
        <InputBase
          placeholder="Search…"
          classes={{
            root: styles.inputRoot,
            input: styles.inputInput,
          }}
          inputProps={{ 'aria-label': 'search' }}
          value={search}
          onChange={handleSearchChange}
        />
      </Box>
    </div>
  );
};

export default NavBar;
