import React, { useEffect, useState } from 'react';
import MovieCard from './MovieCard';
import styles from './MovieList.module.css';
import { Box, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import Pagination from './Pagination';
import FilterListIcon from '@mui/icons-material/FilterList';
import { LIST_FILTERS } from './constants';

const filterOptions = [
  { value: LIST_FILTERS.RELEASE_DATE_ASC, label: 'Release Date Ascending' },
  { value: LIST_FILTERS.RELEASE_DATE_DESC, label: 'Release Date Descending' },
  { value: LIST_FILTERS.AVERAGE_RATING_ASC, label: 'Rating Ascending' },
  { value: LIST_FILTERS.AVERAGE_RATING_DESC, label: 'Rating Descending' },
];

const MovieList = ({ searchResults }) => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [sortOrder, setSortOrder] = useState('average_rating-desc');

  useEffect(() => {
    if (searchResults) {
      setMovies(searchResults);
    } else {
      const [sort, order] = sortOrder.split('-');
      fetch(
        `http://localhost:3001/movies?page=${page}&sort=${sort}&order=${order}`
      )
        .then((response) => response.json())
        .then((data) => {
          setMovies(data.data);
          setLastPage(data.lastPage);
        })
        .catch((error) => console.error('Error fetching movies:', error));
    }
  }, [page, sortOrder, searchResults]);

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  return (
    <Box className={styles.container}>
      <Box className={styles.header}>
        <h1>All Movies</h1>
        <FormControl variant="outlined" className={styles.sortControl}>
          <InputLabel>Sort by</InputLabel>
          <Select
            value={sortOrder}
            onChange={handleSortChange}
            startAdornment={<FilterListIcon />}
            label="Sort by"
          >
            {filterOptions.map((filter) => (
              <MenuItem key={filter.value} value={filter.value}>
                {filter.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box className={styles.movieList}>
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </Box>
      {!searchResults && (
        <Pagination currentPage={page} pagesCount={lastPage} setCurrentPage={setPage} />
      )}
    </Box>
  );
};

export default MovieList;
