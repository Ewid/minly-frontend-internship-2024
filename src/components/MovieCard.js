// src/components/MovieCard.js
import React from 'react';
import Link from 'next/link';
import styles from './MovieCard.module.css';
import { Box } from '@mui/material';

const MovieCard = ({ movie }) => {
  return (
    <Link href={`/movies/${movie.id}`} passHref>
      <Box component="a" className={styles.movieCard}>
        <img
          src={movie.poster}
          alt={movie.title}
          className={styles.moviePoster}
        />
        <Box className={styles.movieDetails}>
          <Box className={styles.movieRating}>
            <span>⭐</span> {movie.average_rating}
          </Box>
          <h2 className={styles.movieTitle}>{movie.title}</h2>
          <Box className={styles.movieYear}>{movie.release_date}</Box>
        </Box>
      </Box>
    </Link>
  );
};

export default MovieCard;
