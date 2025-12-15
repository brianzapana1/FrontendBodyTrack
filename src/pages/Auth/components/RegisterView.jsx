import { useState } from 'react';
import styles from '../Auth.module.css';
import { useAuthStore } from '../../../store/authStore';

export default function RegisterView({ visible, showView, toast }) {
  const [showPass, setShowPass] = useState(false);
  const [showPass2, setShowPass2] = useState(false);
  const [globalMsg, setGlobalMsg] = useState("");

  const { verificarEmail, setPreRegistro, isLoading } = useAuthStore();

  const validateEmail = (email) => /^\S+@\S+\.\S+$/.test(email.trim());
  const validatePasswords = (p1, p2) => p1 === p2 && p1.length >= 6;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const email = form.remail.value.trim();
    const pass = form.rpass.value;
    const pass2 = form.rpass2.value;

    // Reset mensajes
    setGlobalMsg("");
    document.getElementById('errEmail').textContent = '';
    document.getElementById('errPass').textContent = '';
    document.getElementById('errPass2').textContent = '';

    // Validación local
    if (!validateEmail(email)) {
      document.getElementById('errEmail').textContent = 'Correo inválido';
      return;
    }

    if (!validatePasswords(pass, pass2)) {
      if (pass.length < 6)
        document.getElementById('errPass').textContent = 'Mínimo 6 caracteres';
      if (pass !== pass2)
        document.getElementById('errPass2').textContent = 'Las contraseñas no coinciden';
      return;
    }

    // Verificación backend
    const exists = await verificarEmail(email);

    if (exists) {
      setGlobalMsg("Este correo ya se encuentra registrado. Por favor inicia sesión.");
      document.getElementById('errEmail').textContent = 'El correo ya está registrado';
      return;
    }

    // Guardar temporal (preRegistro)
    setPreRegistro({ email, password: pass });

    toast('Continuemos con tu registro');

    // 🔥 Redirigir primero a NudgeView
    showView('nudge');
  };

  return (
    <form
      className={`${styles.view} ${visible ? styles.visible : ''}`}
      onSubmit={handleSubmit}
      noValidate
    >
      {/* MENSAJE GLOBAL */}
      {globalMsg && (
        <p
          className={styles.center}
          style={{ marginBottom: '12px', color: 'var(--danger)', fontWeight: 600 }}
        >
          {globalMsg}
        </p>
      )}

      <h3 className={styles.center} style={{ margin: '0 0 8px', fontWeight: 900 }}>
        CREAR UNA NUEVA<br />CUENTA
      </h3>

      <label className={styles.field}>
        <div className={styles.label}>Correo electrónico</div>
        <input className={styles.input} type="email" name="remail" placeholder="tucorreo@ejemplo.com" required />
      </label>
      <div id="errEmail" className={styles.errMsg}></div>

      <label className={styles.field}>
        <div className={styles.label}>Contraseña</div>
        <input
          className={styles.input}
          type={showPass ? 'text' : 'password'}
          name="rpass"
          placeholder="••••••••"
          minLength="6"
          required
        />
        <span className={styles.eye} onClick={() => setShowPass(!showPass)}></span>
      </label>
      <div id="errPass" className={styles.errMsg}></div>

      <label className={styles.field}>
        <div className={styles.label}>Repetir contraseña</div>
        <input
          className={styles.input}
          type={showPass2 ? 'text' : 'password'}
          name="rpass2"
          placeholder="••••••••"
          minLength="6"
          required
        />
        <span className={styles.eye} onClick={() => setShowPass2(!showPass2)}></span>
      </label>
      <div id="errPass2" className={styles.errMsg}></div>

      <button className={`${styles.btn} ${styles.btnOk}`} type="submit" disabled={isLoading}>
        {isLoading ? 'Verificando...' : 'Continuar'}
      </button>

      <p className={styles.center}>
        <span className={styles.link} onClick={() => showView('welcome')}>
          Regresar
        </span>
      </p>
    </form>
  );
}
