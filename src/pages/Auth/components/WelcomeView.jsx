import styles from '../Auth.module.css';

export default function WelcomeView({ visible, showView }) {
  return (
    <div className={`${styles.view} ${visible ? styles.visible : ''}`}>
      <button className={styles.btn} onClick={() => showView('login')}>
        Ingresar con email
      </button>
      <button className={`${styles.btn} ${styles.btnGhost}`} onClick={() => showView('forgot')}>
        Olvidé mi contraseña
      </button>
      <button
        className={`${styles.btn} ${styles.btnGhost}`}
        onClick={() => {
          if (document.referrer && document.referrer !== location.href) {
            window.history.back();
          } else {
            window.location.href = '/';
          }
        }}
      >
        Regresar
      </button>
      <p className={`${styles.center} ${styles.small} ${styles.mt12}`}>
        Al continuar aceptas nuestros Términos y Política de Privacidad.
      </p>
    </div>
  );
}