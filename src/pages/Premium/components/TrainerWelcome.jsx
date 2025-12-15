import React from 'react';
import styles from '../Premium.module.css';

const TrainerWelcome = () => {
  return (
    <section id="view-trainer-welcome" className={styles.view}>
      <div className={styles.shell}>
        <div className={styles.ring} aria-hidden="true"></div>
        <div className={styles.shellLight}>
          <h3 id="welcomeTitle" className={styles.centerTitle}>¡… TE DA LA BIENVENIDA!</h3>
          <div style={{ maxWidth: '680px', margin: '0 auto', background: '#f2f6ff', border: '3px solid #2a46ff25', borderRadius: '14px', padding: '18px', color: '#12204d' }}>
            <p id="welcomeText">Texto de bienvenida.</p>
          </div>
          <div className={styles.row} style={{ justifyContent: 'center', marginTop: '18px' }}>
            <button className={styles.btn} onClick={() => setView('view-dashboard')}>Continuar</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrainerWelcome;
