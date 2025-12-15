import styles from '../Auth.module.css';

export default function NudgeView({ visible, showView }) {
  return (
    <div className={`${styles.view} ${visible ? styles.visible : ''}`}>
      <h3 className={styles.center} style={{ margin: '0 0 8px', fontWeight: 900 }}>
        YA DISTE EL PRIMER PASO, REGISTRARTE<br />¡NO PARES!
      </h3>

      <div
        style={{
          width: 140,
          height: 140,
          borderRadius: 24,
          margin: '14px auto 8px',
          background: 'rgba(255,255,255,.06)',
          display: 'grid',
          placeItems: 'center',
          border: '1px solid rgba(200,220,255,.2)',
        }}
      >
        <div
          style={{
            width: 82,
            height: 82,
            borderRadius: '50%',
            border: '6px solid rgba(255,255,255,.8)',
          }}
        ></div>
      </div>

      <p className={styles.center} style={{ opacity: .9, margin: '8px 0 10px' }}>
        ¿Estás listo/a?
      </p>

      {/* 🔥 Cambiado para ir a ProfileView */}
      <button className={styles.btn} onClick={() => showView('reg-profile')}>
        Continuar
      </button>
      <button className={`${styles.btn} ${styles.btnGhost}`} onClick={() => showView('welcome')}>
        Regresar
      </button>
    </div>
  );
}
