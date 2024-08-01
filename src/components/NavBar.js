import React, { useCallback, useState } from 'react';
import styles from './NavBar.module.css';
import { Box, InputBase, Typography } from '@mui/material';
import Link from 'next/link';
import debounce from 'lodash/debounce';

const NavBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  

  const handleDebounceSearch = useCallback(
    debounce((searchQuery) => {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
      fetch(`${baseUrl}/movies?search=${searchQuery}`)
        .then((response) => response.json())
        .then((data) => {
          if (Array.isArray(data)) {
            onSearch(data);
          } else {
            onSearch([]); 
          }
        })
        .catch(() => {
          onSearch([]); 
        });
    }, 500),
[onSearch]
  );

  const handleSearchChange = (event) => {
    const { value } = event.target;
    setSearchQuery(value);
    handleDebounceSearch(value);
  };

  return (
    <div className={styles.navbar}>
      <Typography className={styles.logo}>
        <Link href="/">MMDB</Link>
      </Typography>
      <Box
        component="form"
        onSubmit={(e) => e.preventDefault()}
        className={styles.searchContainer}
      >
        <InputBase
          placeholder="Search…"
          classes={{
            root: styles.inputRoot,
            input: styles.inputInput,
          }}
          inputProps={{ 'aria-label': 'search' }}
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </Box>
    </div>
  );
};

export default NavBar;
