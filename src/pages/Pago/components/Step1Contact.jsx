import { useState, useEffect, useRef } from 'react';
import styles from '../Pago.module.css';
import gymImg from '../../../assets/logo-bodytrack.png';


export default function Step1Contact({ visible, showStep }) {
  const [canContinue, setCanContinue] = useState(false);
  const formRef = useRef(null);

  const checkForm = () => {
    if (!formRef.current) return;
    const form = formRef.current;

    const name = form.c_name.value.trim();
    const dept = form.c_dept.value;
    const phone = form.c_phone.value.trim();
    const mail = form.c_mail.value.trim();
    const terms = form.c_terms.checked;

    setCanContinue(!!(name && dept && phone && mail && terms));
  };

  // Revisar al montar y cada vez que cambie la visibilidad
  useEffect(() => {
    if (visible) checkForm();
  }, [visible]);

  return (
    <section className={`${styles.shell} ${visible ? styles.visible : ''}`}>
      <div className={styles.ring} aria-hidden="true"></div>

      <div className={styles.shellHeader}>
        <span className={styles.dot}></span> CONTACTO
      </div>

      <div className={styles.grid}>
        <div>
          <form ref={formRef} onInput={checkForm} onChange={checkForm}>
            <div className={styles.field}>
              <label className={styles.pill}>Nombre</label>
              <input name="c_name" type="text" placeholder="Tu nombre completo" />
            </div>

            <div className={styles.field}>
              <label className={styles.pill}>Departamento</label>
              <select name="c_dept">
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

            <div className={styles.field}>
              <label className={styles.pill}>Celular</label>
              <input name="c_phone" type="tel" placeholder="7xxxxxxxx" />
            </div>

            <div className={styles.field}>
              <label className={styles.pill}>Correo</label>
              <input name="c_mail" type="email" placeholder="tucorreo@ejemplo.com" />
            </div>

            <label className={styles.check}>
              <input name="c_terms" type="checkbox" />
              <span>Acepto las políticas de privacidad y condiciones</span>
            </label>

            <div className={styles.row}>
              <button
                type="button"
                className={styles.btn}
                disabled={!canContinue}
                onClick={() => showStep('step2')}
              >
                Continuar
              </button>
            </div>
          </form>
        </div>

        <aside className={styles.pricePanel}>
          <div className={styles.logoWrap}>
            <img
              className={styles.logo}
              src={gymImg}
              alt="BODYTRACK"
            />
          </div>
          <div className={styles.priceTag}>10 $us</div>
        </aside>
      </div>
    </section>
  );
}