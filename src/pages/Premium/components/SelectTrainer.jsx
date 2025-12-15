import React from 'react';
import styles from './Premium.module.css';

const SelectTrainer = ({ setView }) => {
  const trainers = ['Fernando', 'Lorena', 'Carlos'];

  const openTrainer = (name) => {
    setView('view-trainer-detail');
    // Aquí puedes cargar la información del entrenador
  };

  return (
    <section id="view-select-trainer" className={`${styles.view} ${styles.active}`}>
      <div className={styles.shell}>
        <div className={styles.ring} aria-hidden="true"></div>
        <div className={styles.shellLight}>
          <h3 className={styles.centerTitle}>SELECCIONA A TU ENTRENADOR</h3>
          <div className={styles.grid3}>
            {trainers.map((trainer) => (
              <div key={trainer} className={styles.trainer}>
                <div className={styles.tag}>{trainer}</div>
                <div className={styles.photo}>[ foto ]</div>
                <button className={styles.btn} onClick={() => openTrainer(trainer)}>
                  Conoce más a {trainer}
                </button>
              </div>
            ))}
          </div>
          <div className={styles.row} style={{ justifyContent: 'flex-end', marginTop: '18px' }}>
            <button className={styles.btn} onClick={() => setView('view-dashboard')}>Continuar</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SelectTrainer;
