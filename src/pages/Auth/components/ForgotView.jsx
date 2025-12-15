import styles from '../Auth.module.css';

export default function ForgotView({ visible, showView, toast }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    toast('Enlace enviado al correo');
    showView('welcome');
  };

  return (
    <form
      className={`${styles.view} ${visible ? styles.visible : ''}`}
      onSubmit={handleSubmit}
      noValidate
    >
      <label className={styles.field}>
        <div className={styles.label}>Correo asociado a tu cuenta</div>
        <input
          className={styles.input}
          type="email"
          name="femail"
          placeholder="tucorreo@ejemplo.com"
          required
        />
      </label>

      <button className={`${styles.btn} ${styles.mt12}`} type="submit">
        Enviar enlace de recuperación
      </button>

      <p className={styles.center}>
        <span className={styles.link} onClick={() => showView('welcome')}>
          Volver
        </span>
      </p>
    </form>
  );
}