import { useEffect, useRef } from "react";
import styles from "./Cases.module.css";

/**
 * Cases: carousel of case images.
 * - Uses refs for prev/next buttons (no global selectors)
 * - Observes the root and reveals internal children with stagger (uses global .reveal/.show)
 */

export default function Cases() {
  const rootRef = useRef(null);
  const cardsRef = useRef(null);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  useEffect(() => {
    const rail = cardsRef.current;
    if (!rail) return;
    const step = 220;

    const scrollPrev = () => rail.scrollBy({ left: -step, behavior: "smooth" });
    const scrollNext = () => rail.scrollBy({ left: step, behavior: "smooth" });

    const prevBtn = prevRef.current;
    const nextBtn = nextRef.current;
    prevBtn?.addEventListener("click", scrollPrev);
    nextBtn?.addEventListener("click", scrollNext);

    return () => {
      prevBtn?.removeEventListener("click", scrollPrev);
      nextBtn?.removeEventListener("click", scrollNext);
    };
  }, []);

  // ← Eliminamos el useEffect de animación local → ahora usamos tu sistema global

  const renderCard = (src, alt) => (
    <div className={`${styles.cardPh} reveal`} data-reveal>
      <img
        alt={alt}
        src={src}
        onError={(e) => (e.target.parentElement.textContent = "FOTO")}
      />
    </div>
  );

  return (
    <section
      id="casos"
      className={styles.cases}
      ref={rootRef}
      aria-label="Galería de transformaciones"
    >
      <div className={styles.section}>
        <h2 data-reveal className="reveal">
          ¡EL SIGUIENTE CAMBIO PUEDE SER EL TUYO!
        </h2>
        <div className={`${styles.divider} reveal`} data-reveal></div>

        <div className={styles.rail} aria-hidden="false">
          <button
            ref={prevRef}
            className={`${styles.arrow} reveal`}
            aria-label="anterior"
            data-reveal
          >
            ‹
          </button>

          <div className={styles.cards} ref={cardsRef} aria-live="polite">
            {renderCard("/src/assets/placeholder1.jpg", "caso 1")}
            {renderCard("/src/assets/placeholder2.jpg", "caso 2")}
            {renderCard("/src/assets/placeholder3.jpg", "caso 3")}
            {renderCard("/src/assets/placeholder4.jpg", "caso 4")}
            {renderCard("/src/assets/placeholder5.jpg", "caso 5")}
          </div>

          <button
            ref={nextRef}
            className={`${styles.arrow} reveal`}
            aria-label="siguiente"
            data-reveal
          >
            ›
          </button>
        </div>

        <div className={`${styles.divider} reveal`} data-reveal style={{ marginTop: "26px" }}></div>

        <div className={`${styles.ctaSmall} reveal`} data-reveal>
          <a className={styles.btn} href="#planes">
            COMIENZA HOY TU CAMBIO
          </a>
        </div>
      </div>
    </section>
  );
}