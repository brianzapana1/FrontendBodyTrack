import styles from "./Plans.module.css";

export default function Plans() {
  return (
    <section id="planes" className={styles.subs}>
      <div className={`${styles.title}`}>
        <h2 data-reveal className="reveal">SUSCRIPCIÓN</h2>
        <h3 data-reveal className="reveal">¿QUÉ CONTIENE BODYTRACK?</h3>
      </div>

      <div className={styles.plans}>
        {/* PLAN PREMIUM */}
        <div className={styles.plan}>
          <span data-reveal className={`reveal ${styles.tab}`}>
            PLAN PREMIUM
          </span>

          <ul>
            {[
              "Acceso completo a todas las opciones de la página.",
              "Acceso al foro de la comunidad.",
              "Contacto privado con los entrenadores.",
              "Rutinas personalizadas.",
              "Registro de objetivos y logros.",
              "Registro de avances en el proceso.",
            ].map((item, i) => (
              <li key={i} data-reveal className="reveal">
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* PLAN GRATUITO */}
        <div className={styles.plan}>
          <span data-reveal className={`reveal ${styles.tab}`}>
            PLAN GRATUITO
          </span>

          <ul>
            {[
              "Acceso a rutinas descritas.",
              "Acceso a videos de rutinas.",
              "Acceso al foro de la comunidad.",
            ].map((item, i) => (
              <li key={i} data-reveal className="reveal">
                {item}
              </li>
            ))}
          </ul>

          <div className={styles.ctaRight}>
            <a
              data-reveal
              className={`reveal ${styles.ghostBtn}`}
              href="/pago"
            >
              ¡Quiero ser parte!
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

