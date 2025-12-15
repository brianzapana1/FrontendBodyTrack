import React from 'react';
import styles from '../Premium.module.css';

const TrainerDetail = () => {
  return (
    <section id="view-trainer-detail" className={styles.view}>
      <div className={styles.shell}>
        <div className={styles.ring} aria-hidden="true"></div>
        <div className={styles.shellLight}>
          <h3 id="trainerTitle" className={styles.centerTitle}>CONOCE MEJOR A ...</h3>
          <div className={styles.row} style={{ gap: '26px' }}>
            <div className={styles.trainer} style={{ flex: '0 0 320px' }}>
              <div className={styles.tag} id="trainerName">Nombre</div>
              <div className={styles.photo} style={{ width: '260px', height: '200px' }}>[ foto ]</div>
            </div>
            <div style={{ flex: 1 }}>
              <h4>Biografía</h4>
              <p id="trainerBio" style={{ color: '#0a1745' }}>
                Profesional en entrenamiento funcional y fuerza. 6+ años guiando a deportistas y principiantes. Enfoque en técnica segura, progresión y hábitos.
              </p>
              <div className={styles.row} style={{ marginTop: '14px' }}>
                <button className={styles.btn} onClick={() => setView('view-trainer-welcome')}>Continuar</button>
                <button className={styles.btnSecondary} onClick={() => setView('view-select-trainer')}>Regresar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrainerDetail;
