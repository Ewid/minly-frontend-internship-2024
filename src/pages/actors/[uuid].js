import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../../components/ActorDetails.module.css'; 
import Link from 'next/link';

const ActorDetails = () => {
  const router = useRouter();
  const { uuid } = router.query;
  const [actor, setActor] = useState(null);

  useEffect(() => {
    if (uuid) {
      fetch(`http://localhost:3001/actors/${uuid}`)
        .then((response) => response.json())
        .then((data) => setActor(data))
        .catch((error) =>
          console.error('Error fetching actor details:', error)
        );
    }
  }, [uuid]);

  if (!actor) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.actorDetailsContainer}>
      <div className={styles.photoAndInfo}>
        <img
          src={actor.picture}
          alt={actor.first_name}
          className={styles.actorPhoto}
        />
        <div className={styles.personalInfo}>
          <h1>{`${actor.first_name} ${actor.last_name}`}</h1>
          <p>{actor.bio}</p>
          <div className={styles.additionalInfo}>
            <p><strong>Known For:</strong> {actor.known_for}</p>
            <p><strong>Gender:</strong> {actor.gender}</p>
            <p><strong>Birthdate:</strong> {actor.birth_date}</p>
            <p><strong>Place of Birth:</strong> {actor.place_of_birth}</p>
          </div>
        </div>
      </div>
      <div className={styles.actorDetails}>
        <h2>Acting</h2>
        <ul>
          {actor.movies.map(movie => (
            <li key={movie.id}>
              <Link href={`/movies/${movie.id}`}>{movie.title}</Link> as {movie.characterName}
            </li>
          ))}
        </ul>
        <h2>Awards & Nominations</h2>
        <ul>
          {actor.awards.map(award => (
            <li key={award.id}>
              {award.year} - {award.award} for {award.category} in <Link href={`/movies/${award.movieId}`}>{award.movieTitle}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ActorDetails;
