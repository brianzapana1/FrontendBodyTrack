import React, { useEffect } from 'react';
import styles from '../Premium.module.css';

const Background = () => {
  useEffect(() => {
    const stars = document.getElementById('stars');
    const N = 28;
    if (stars) {
      for (let i = 0; i < N; i++) {
        const dot = document.createElement('span');
        dot.className = styles.dot;
        const size = Math.random() * 2.2 + 1.2;
        dot.style.width = dot.style.height = `${size}px`;
        dot.style.left = `${Math.random() * 100}%`;
        dot.style.top = `${Math.random() * 100}%`;
        dot.style.animationDuration = `${Math.random() * 12 + 10}s`;
        dot.style.animationDelay = `-${Math.random() * 10}s`;
        stars.appendChild(dot);
      }
    }
  }, []);

  return (
    <>
      <div className={styles.bg} aria-hidden="true"></div>
      <div className={styles.stars} id="stars" aria-hidden="true"></div>
    </>
  );
};

export default Background;
