import { useEffect, useRef } from "react";
import styles from "./Hero.module.css";

/**
 * Hero component
 * - Generates "stars" (dots) programmatically and assigns module class names to them
 * - Reveals inner children individually with stagger when the hero enters viewport
 */

export default function Hero() {
  const starsRef = useRef(null);
  const rootRef = useRef(null);

  useEffect(() => {
    const stars = starsRef.current;
    if (!stars) return;
    const N = 26;
    for (let i = 0; i < N; i++) {
      const d = document.createElement("span");
      d.className = styles.dot;
      const size = Math.random() * 2.2 + 1.2;
      d.style.width = d.style.height = size + "px";
      d.style.left = Math.random() * 100 + "%";
      d.style.top = Math.random() * 100 + "%";
      d.style.animationDuration = Math.random() * 12 + 10 + "s";
      d.style.animationDelay = -Math.random() * 10 + "s";
      stars.appendChild(d);
    }
    // cleanup on unmount
    return () => {
      if (!stars) return;
      while (stars.firstChild) stars.removeChild(stars.firstChild);
    };
  }, []);

  // reveal internal children with stagger
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const els = root.querySelectorAll("[data-animate]");
    const obs = new IntersectionObserver(
      (entries, o) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          els.forEach((el, i) => {
            setTimeout(() => el.classList.add("show"), i * 80);
          });
          o.disconnect();
        });
      },
      { threshold: 0.12 }
    );
    obs.observe(root);
    return () => obs.disconnect();
  }, []);

  return (
    <header
      id="inicio"
      className={styles.hero}
      role="banner"
      aria-label="Bienvenida"
      ref={rootRef}
    >
      <div className={styles.stars} ref={starsRef} aria-hidden="true"></div>

      <div className={styles.hero__content}>
        <h1 data-animate>
          TU POTENCIAL NO TIENE LÍMITES.
          <br /> DESBLOQUÉALO CON NOSOTROS.
        </h1>

        <p data-animate>¡Regístrate y comienza tu transformación hoy!</p>

        <a className={styles.btn} href="/auth" data-animate>
          ACCEDER
        </a>
      </div>
    </header>
  );
}
