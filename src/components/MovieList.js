import React, { useEffect, useState } from 'react';
import MovieCard from './MovieCard';
import styles from './MovieList.module.css';
import { Box, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import Pagination from './Pagination';
import FilterListIcon from '@mui/icons-material/FilterList';

const MovieList = ({ searchResults }) => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [sort, setSortField] = useState('average_rating');
  const [order, setSortOrder] = useState('desc');

  useEffect(() => {
    if (searchResults) {
      setMovies(searchResults);
    } else {
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
  }, [page, sort, order, searchResults]);

  const handleSortChange = (field, order) => {
    setSortField(field);
    setSortOrder(order);
  };

  return (
    <Box className={styles.container}>
      <Box className={styles.header}>
        <h1>All Movies</h1>
        <FormControl variant="outlined" className={styles.sortControl}>
          <InputLabel>Sort by</InputLabel>
          <Select
            value={`${sort}-${order}`}
            onChange={(event) => {
              console.log(event.target.value);
              handleSortChange(
                event.target.value.split('-')[0],
                event.target.value.split('-')[1]
              );
            }}
            startAdornment={<FilterListIcon />}
            label="Sort by"
          >
            <MenuItem value="release_date-asc">Release Date Ascending</MenuItem>
            <MenuItem value="release_date-desc">
              Release Date Descending
            </MenuItem>
            <MenuItem value="average_rating-asc">Rating Ascending</MenuItem>
            <MenuItem value="average_rating-desc">Rating Descending</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box className={styles.movieList}>
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </Box>
      {!searchResults && (
        <Pagination page={page} lastPage={lastPage} setPage={setPage} />
      )}
    </Box>
  );
};

export default MovieList;
