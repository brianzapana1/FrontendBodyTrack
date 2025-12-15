import styles from '../Pago.module.css';
import gymImg from '../../../assets/logo-bodytrack.png';


export default function Step4QR({ visible, showStep, onSuccess }) {
  return (
    <section className={`${styles.shell} ${visible ? styles.visible : ''}`}>
      <div className={styles.ring} aria-hidden="true"></div>
      <div className={styles.shellHeader}>
        <span className={styles.dot}></span> PAGO POR QR
      </div>

      <div className={styles.grid}>
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          <div className={styles.qr} title="Código QR" aria-label="Escanea este QR para pagar"></div>

          <div className={styles.row} style={{ alignItems: 'flex-start' }}>
            <button className={styles.btn} onClick={onSuccess}>
              Pago realizado
            </button>
            <button className={`${styles.btn} ${styles.btnSecondary}`} onClick={() => showStep('step2')}>
              Volver
            </button>
          </div>
        </div>

        <aside className={styles.pricePanel}>
          <div className={styles.logoWrap}>
            <img className={styles.logo} src={gymImg} alt="BODYTRACK" />
          </div>
          <div className={styles.priceTag}>10 $us</div>
          <div className={styles.priceSub}>MENSUAL</div>
        </aside>
      </div>
    </section>
  );
}