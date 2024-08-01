// src/components/MovieCard.js
import React from 'react';
import Link from 'next/link';
import styles from './MovieCard.module.css';
import { Box } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { yellow } from '@mui/material/colors';

const MovieCard = ({ movie }) => {
  return (
    <Link className={`${styles.textDecoration}`}href={`/movies/${movie.id}`} passHref>
      <Box component="a" className={styles.movieCard}>
        <img
          src={movie.poster}
          alt={movie.title}
          className={styles.moviePoster}
        />
        <Box className={styles.movieDetails}>
          <Box className={styles.movieRating}>
            <span><StarIcon style={{color: yellow[800],margin:1,padding:1}}/> {movie.average_rating}</span> 
          </Box>
          <h2 className={styles.movieTitle}>{movie.title}</h2>
          <Box className={styles.movieYear}>{movie.release_date}</Box>
        </Box>
      </Box>
    </Link>
  );
};

export default MovieCard;
