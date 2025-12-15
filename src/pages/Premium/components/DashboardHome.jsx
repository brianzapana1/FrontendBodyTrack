import React from 'react';
import styles from '../Premium.module.css';

const DashboardHome = ({ setView }) => {
  return (
    <section id="view-dashboard" className={styles.view}>
      <div className={styles.shell}>
        <div className={styles.ring} aria-hidden="true"></div>
        <div className={styles.logoWrap}>
          <img className={styles.logo} src="/images/logo-bodytrack.png" alt="BODYTRACK" />
        </div>
        <h2 className={styles.centerTitle}>BIENVENID@ A BODYTRACK</h2>
        <div className={styles.tiles}>
          {['MI PERFIL', 'FORO COMUNIDAD', 'ENTRENADOR', 'PAGOS', 'LOGROS Y OBJETIVOS', 'ENTRENAMIENTO'].map((tile) => (
            <div key={tile} className={styles.tile}>
              {tile}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DashboardHome;
