import { useEffect, useRef } from "react";
import styles from "./Diff.module.css";

/**
 * Diff component - two cards comparing pre-made vs personalized routines
 * - Uses intersection observer on the root to reveal inner elements individually (stagger)
 */

export default function Diff() {
  const rootRef = useRef(null);

  // ← Eliminamos el useEffect local porque ahora usas el sistema global de animación (igual que Plans.jsx)

  return (
    <section
      className={styles.diff}
      ref={rootRef}
      aria-label="Diferencias entre tipos de rutina"
    >
      <div className={styles["diff__box"]}>
        <h2 data-reveal className="reveal">
          ¿QUÉ DIFERENCIA EXISTE ENTRE SEGUIR UNA RUTINA PRE-HECHA A TENER UNA RUTINA
          PERSONALIZADA?
        </h2>

        <div className={styles.diffGrid}>
          <article className={`${styles.diffCard} reveal`} data-reveal>
            <h3 data-reveal className="reveal">Rutina pre-hecha</h3>
            <p data-reveal className="reveal">
              Son rutinas generales diseñadas para cualquier persona. No consideran
              tus objetivos, nivel o limitaciones específicas.
            </p>
            <p data-reveal className="reveal">
              Ideales si recién comienzas y quieres una guía rápida sin complicaciones.
            </p>
            <p data-reveal className="reveal">
              <strong>Sigues un plan ya estructurado, sin ajustes personalizados.</strong>
            </p>
          </article>

          <article className={`${styles.diffCard} reveal`} data-reveal>
            <h3 data-reveal className="reveal">Rutina personalizada</h3>
            <p data-reveal className="reveal">
              Diseñada exclusivamente para ti, basada en tus metas, condición física y
              disponibilidad.
            </p>
            <p data-reveal className="reveal">
              Tu entrenador adapta cada ejercicio y carga de trabajo a tu progreso.
            </p>
            <p data-reveal className="reveal">
              <strong>Perfecta si buscas resultados reales, seguros y sostenibles.</strong>
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}