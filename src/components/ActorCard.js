// src/components/ActorCard.js
import React from 'react';
import styles from './ActorCard.module.css';

const ActorCard = ({ actor }) => {
  return (
    <div className={styles.actorCard}>
      <img
        src={actor.picture}
        alt={actor.first_name}
        className={styles.actorImage}
      />
      <div className={styles.actorInfo}>
        <h3
          className={styles.actorName}
        >{`${actor.first_name} ${actor.last_name}`}</h3>
        <p className={styles.actorRole}>{actor.role}</p>
      </div>
    </div>
  );
};

export default ActorCard;
