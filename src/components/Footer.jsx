import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.foot}>
        
        <h3 data-reveal className="reveal">BODYTRACK</h3>

        <div 
          data-reveal 
          className={`reveal ${styles.divider}`} 
          style={{ maxWidth: "100%" }}
        ></div>

        <div className={styles.row}>
          
          {/* SOBRE NOSOTROS */}
          <section className={styles.about}>
            <h4 data-reveal className="reveal">SOBRE NOSOTROS</h4>

            <ul>
              {[
                "- Nuestra Misión",
                "- Nuestra Metodología",
                "- Únete a la Comunidad",
              ].map((item, i) => (
                <li key={i} data-reveal className="reveal">
                  {item}
                </li>
              ))}
            </ul>
          </section>

          {/* REDES SOCIALES */}
          <section className={styles.social}>
            <h4 data-reveal className="reveal">REDES SOCIALES</h4>

            <div className={styles.socialList}>
              {[
                { icon: "🎵", text: "@bodytrack" },
                { icon: "f", text: "@bodytrack" },
                { icon: "◎", text: "@bodytrack" },
              ].map((item, i) => (
                <div key={i} data-reveal className={`reveal ${styles.socialItem}`}>
                  <div className={styles.icon}>{item.icon}</div>
                  <div>{item.text}</div>
                </div>
              ))}
            </div>
          </section>

        </div>
      </div>
    </footer>
  );
}
