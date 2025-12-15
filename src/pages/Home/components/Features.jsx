import { useEffect, useRef } from "react";
import styles from "./Features.module.css";

/**
 * Features component
 * - Reveals internal children with stagger on intersection
 */

export default function Features() {
  const rootRef = useRef(null);

  // ← Eliminamos el useEffect local → ahora usas el sistema global (igual que Plans.jsx)

  return (
    <section className={styles.feature} id="entrenadores" ref={rootRef}>
      <div className={styles.feature__box}>
        <h3 className={`${styles.feature__title} reveal`} data-reveal>
          TRANSFORMA TU CUERPO CON LA APP DE BODYTRACK
        </h3>

        <div className={styles.split}>
          <article className={`${styles.panel} reveal`} data-reveal>
            <h3 className="reveal" data-reveal>EJERCICIO</h3>
            <div className={`${styles.copy} reveal`} data-reveal>
              Comienza a transformar tu cuerpo con nuestras efectivas rutinas.
              ¿Buscas un plan único? Con BODYTRACK Premium desbloquea
              entrenamientos personalizados por un coach y registra todos tus avances.
            </div>
            <div className={`${styles.phImg} reveal`} data-reveal>
              <img
                src="/src/assets/feature-ejercicio.jpg"
                alt="Entrenamiento personalizado con BODYTRACK"
                className={styles.featureImage}
              />
            </div>
          </article>

          <article className={`${styles.panel} reveal`} data-reveal>
            <h3 className="reveal" data-reveal>MOTIVACIÓN</h3>
            <div className={`${styles.copy} reveal`} data-reveal>
              Mantente activo con el apoyo de la comunidad.
              Con Premium, accede a un foro directo, celebra cada meta cumplida con
              nuestras herramientas de seguimiento de objetivos.
            </div>
            <div className={`${styles.phImg} reveal`} data-reveal>
              <img
                src="/src/assets/feature-motivacion.jpg"
                alt="Comunidad y motivación con BODYTRACK"
                className={styles.featureImage}
              />
            </div>
          </article>
        </div>

        <p className={`${styles.center} ${styles["mt-16"]} reveal`} data-reveal>
          <a className={styles.btn} href="#planes">
            COMIENZA HOY TU CAMBIO
          </a>
        </p>
      </div>
    </section>
  );
}