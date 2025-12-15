import React from 'react';
import styles from './Premium.module.css';

const Payments = () => {
  return (
    <section id="view-pagos" className={styles.view}>
      <div className={styles.shell}>
        <div className={styles.ring} aria-hidden="true"></div>
        <h2 className={styles.centerTitle}>¡DISFRUTA DEL PLAN PREMIUM!</h2>
        <div className={styles.shell}>
          <div className={styles.ring} aria-hidden="true"></div>
          <div className={styles.payCard}>
            <div>
              <h3 style={{ marginTop: '4px' }}>• PAGO</h3>
              <p style={{ margin: '14px 0' }}>
                Pago efectuado: <strong>20/09/2025</strong>
              </p>
              <p>Vence: <strong>20/10/2025</strong></p>
              <div className={styles.row} style={{ marginTop: '16px' }}>
                <button className={styles.btn}>RENOVAR</button>
              </div>
            </div>
            <div className={styles.panelRight}>
              <div className={styles.logoWrap} style={{ width: '160px', height: '160px' }}>
                <img className={styles.logo} src="/images/logo-bodytrack.png" alt="BODYTRACK" />
              </div>
              <div className={styles.priceTag}>140 Bs/Mes</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Payments;
