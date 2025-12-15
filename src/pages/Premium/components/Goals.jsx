import React from 'react';
import styles from './Premium.module.css';

const Goals = () => {
  return (
    <section id="view-objetivos" className={styles.view}>
      <div className={styles.shell}>
        <div className={styles.ring} aria-hidden="true"></div>
        <h2 className={styles.centerTitle}>OBJETIVOS Y LOGROS</h2>
        <div className={styles.shellLight}>
          <div className={styles.dual}>
            <div className={styles.box}>
              <h3>OBJETIVOS</h3>
              <p><span className={styles.bullet}></span> Bajar 3% de grasa</p>
              <p><span className={styles.bullet}></span> 10.000 pasos diarios</p>
              <p><span className={styles.bullet}></span> Hidratar 2L/día</p>
            </div>
            <div className={styles.box}>
              <h3>LOGROS</h3>
              <p>✔ 5 entrenos esta semana</p>
              <p>✔ +20 kg en peso muerto</p>
              <p>✔ Sin refrescos 7 días</p>
            </div>
          </div>
          <div className={styles.row} style={{ justifyContent: 'flex-end', marginTop: '16px' }}>
            <button className={styles.btnSecondary} onClick={() => setView('view-dashboard')}>Regresar</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Goals;
