import Link from 'next/link'
import React from 'react'
import styles from '../components/ActorCard.module.css'
export default function ActorCard({movie}) {
    console.log('sss',movie);
  return <>

  {movie.movieActor.map((movie)=><Link className={`${styles.textDecoration}`}href={`/actors/${movie.actor.uuid}`} passHref>
    <div className={styles.actorCard}>
      <img
        src={movie.actor.picture}
        alt={movie.actor.first_name}
        className={styles.actorImage}
      />
      <div className={styles.actorInfo}>
        <h3
          className={styles.actorName}
        >{`${movie.actor.first_name} ${movie.actor.last_name}`}</h3>
        <p className={styles.actorRole}>{movie.characterName}</p>
      </div>
    </div>
    </Link>)}
   
  
  </>
}

