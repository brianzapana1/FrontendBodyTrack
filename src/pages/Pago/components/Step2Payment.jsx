import styles from '../Pago.module.css';
import gymImg from '../../../assets/logo-bodytrack.png';

export default function Step2Payment({ visible, showStep }) {
  return (
    <section className={`${styles.shell} ${visible ? styles.visible : ''}`}>
      <div className={styles.ring} aria-hidden="true"></div>
      <div className={styles.shellHeader}>
        <span className={styles.dot}></span> PAGO
      </div>

      <div className={styles.grid}>
        <div>
          <div className={styles.field} style={{ marginTop: 0 }}>
            <label className={styles.pill}>Seleccione el método de pago:</label>
          </div>

          <div className={styles.option}>
            <button className={styles.btn} onClick={() => showStep('step3')}>
              Tarjeta
            </button>
            <button className={styles.btn} onClick={() => showStep('step4')}>
              QR
            </button>
          </div>
        </div>

        <aside className={styles.pricePanel}>
          <div className={styles.logoWrap}>
            <img className={styles.logo} src={gymImg} alt="BODYTRACK" />
          </div>
          <div className={styles.priceTag}>10 $us</div>
        </aside>
      </div>
    </section>
  );
}