import styles from '../Pago.module.css';
import gymImg from '../../../assets/logo-bodytrack.png';


export default function Step3Card({ visible, showStep, onSuccess }) {
  return (
    <section className={`${styles.shell} ${visible ? styles.visible : ''}`}>
      <div className={styles.ring} aria-hidden="true"></div>
      <div className={styles.shellHeader}>
        <span className={styles.dot}></span> PAGO CON TARJETA
      </div>

      <div className={styles.grid}>
        <div>
          <div className={styles.field}>
            <label className={styles.pill}>Número de tarjeta</label>
            <input id="card_num" type="text" placeholder="1234 1234 1234 1234" />
          </div>

          <div className={styles.row}>
            <div className={styles.field} style={{ flex: '1 1 210px' }}>
              <label className={styles.pill}>Fecha de caducidad</label>
              <input id="card_exp" placeholder="MM/AA" />
            </div>
            <div className={styles.field} style={{ flex: '1 1 210px' }}>
              <label className={styles.pill}>Código de seguridad</label>
              <input id="card_cvc" placeholder="CVC" />
            </div>
          </div>

          <div className={styles.field}>
            <label className={styles.pill}>Departamento</label>
            <select id="card_dept">
              <option value="">Selecciona...</option>
              <option>La Paz</option>
              <option>Cochabamba</option>
              <option>Santa Cruz</option>
              <option>Oruro</option>
              <option>Potosí</option>
              <option>Chuquisaca</option>
              <option>Tarija</option>
              <option>Beni</option>
              <option>Pando</option>
            </select>
          </div>

          <div className={styles.row}>
            <button className={styles.btn} onClick={onSuccess}>
              Pagar ahora
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