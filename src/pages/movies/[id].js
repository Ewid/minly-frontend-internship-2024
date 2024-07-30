// src/pages/movies/[id].js
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../../components/MovieDetails.module.css'; // Adjust path if necessary
import ActorCard from '@/components/ActorCard';

const MovieDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [movie, setMovie] = useState(null);
  useEffect(() => {
    if (id) {
      fetch(`http://localhost:3001/movies/${id}`)
        .then((response) => response.json())
        .then((data) => setMovie(data))
        .catch((error) =>
          console.error('Error fetching movie details:', error)
        );
    }
  }, [id]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.movieDetailsContainer}>
      <div className={styles.posterAndTrailer}>
        <img
          src={movie.poster}
          alt={movie.title}
          className={styles.moviePoster}
        />
        <div className={styles.trailer}>
          {movie.trailer ? (
            <iframe
              src={movie.trailer}
              title="Trailer"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          ) : (
            <p>No trailer available</p>
          )}
        </div>
      </div>
      <div className={styles.movieInfo}>
        <h1>
          {movie.title} ({movie.release_date})
        </h1>
        <p>Rating: {movie.average_rating}</p>
        <div className={styles.overview}>
          <p>{movie.overview}</p>
        </div>
        <div className={styles.details}>
          <p><strong>Director:</strong> {movie.director?.first_name} {movie.director?.last_name}</p>
          <p><strong>Writer:</strong> {movie.writer?.first_name} {movie.writer?.last_name}</p>
          <p><strong>Language:</strong> {movie.language}</p>
          <p><strong>Duration:</strong> {movie.duration}</p>
          <p><strong>Genres:</strong> {movie.genres.join(', ')}</p>
        </div>

        <ActorCard movie={movie}/>
        {/* <div className={styles.castContainer}>
          <strong>Cast:</strong>
          <div className={styles.castList}>
            {movie.actors && movie.actors.length > 0 ? (
              movie.actors.map((actor, index) => (
                <div key={index} className={styles.castMember}>
                  <img src={actor.picture} alt={actor.first_name} />
                  <p>{actor.first_name} {actor.last_name}</p>
                  <p>{actor.characterName}</p>
                </div>
              ))
            ) : (
              <p>N/A</p>
            )}
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default MovieDetails;
