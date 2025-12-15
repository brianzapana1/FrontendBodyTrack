import { useEffect, useState } from 'react';
import styles from '../Auth.module.css';
import { useAuthStore } from '../../../store/authStore';

export default function ProfileView({ visible, showView, toast }) {
  const { preRegistro, registroCliente, isLoading, error } = useAuthStore();
  const [canContinue, setCanContinue] = useState(false);
  const [genero, setGenero] = useState(""); // estado controlado para el select

  // Función que revisa si todos los campos están completos
  const check = () => {
    const form = document.getElementById('profile-form');
    if (!form) return;

    const ok =
      form.fname.value.trim() &&
      form.lname.value.trim() &&
      form.uname.value.trim().length >= 3 &&
      form.dni.value.trim() &&
      form.telefono.value.trim() &&
      form.fechaNacimiento.value &&
      genero;

    setCanContinue(ok);
  };

  // Maneja el submit y registro del cliente
  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;

    const user = {
      email: preRegistro.email,
      password: preRegistro.password,
      dni: form.dni.value.trim(),
      nombres: form.fname.value.trim(),
      apellidos: form.lname.value.trim(),
      username: form.uname.value.trim(),
      telefono: form.telefono.value.trim(),
      fechaNacimiento: form.fechaNacimiento.value,
      genero: genero,
    };

    await registroCliente(user);

    toast && toast('¡Registro completado! Inicia sesión ahora.');
    showView('login'); // al finalizar registro, vamos a LoginView
  };

  return (
    <form
      id="profile-form"
      className={`${styles.view} ${visible ? styles.visible : ''}`}
      onSubmit={handleSubmit}
      onInput={check}
      noValidate
    >
      <h3 className={styles.center} style={{ margin: '0 0 2px', fontWeight: 900 }}>
        ¡BIENVENID@ A BODYTRACK!
      </h3>
      <p className={`${styles.center} ${styles.small}`} style={{ margin: '0 0 12px' }}>
        Completa tu perfil para terminar con el registro.
      </p>

      {error && <div className={styles.errMsg}>{error}</div>}

      <div className={styles.grid}>
        <label className={styles.field}>
          <div className={styles.label}>Nombre</div>
          <input className={styles.input} type="text" name="fname" required />
        </label>

        <label className={styles.field}>
          <div className={styles.label}>Apellido</div>
          <input className={styles.input} type="text" name="lname" required />
        </label>

        <label className={styles.field}>
          <div className={styles.label}>Nombre de usuario</div>
          <input className={styles.input} type="text" name="uname" minLength="3" required />
        </label>

        <label className={styles.field}>
          <div className={styles.label}>DNI / CI</div>
          <input className={styles.input} type="text" name="dni" required />
        </label>

        <label className={styles.field}>
          <div className={styles.label}>Teléfono</div>
          <input className={styles.input} type="tel" name="telefono" required />
        </label>

        <label className={styles.field}>
          <div className={styles.label}>Fecha de nacimiento</div>
          <input className={styles.input} type="date" name="fechaNacimiento" required />
        </label>

        <label className={styles.field}>
          <div className={styles.label}>Género</div>
          <select
            className={styles.input}
            name="genero"
            value={genero}
            onChange={(e) => setGenero(e.target.value)}
            required
          >
            <option value="">Seleccionar...</option>
            <option value="M">Masculino</option>
            <option value="F">Femenino</option>
            <option value="Otro">Otro</option>
          </select>
        </label>
      </div>

      <div className={`${styles.grid} ${styles.grid2}`}>
        <button
          className={`${styles.btn} ${styles.btnGhost}`}
          type="button"
          onClick={() => showView('welcome')}
        >
          Regresar
        </button>

        <button
          className={`${styles.btn} ${styles.btnOk} ${!canContinue ? styles.btnDisabled : ''}`}
          type="submit"
          disabled={!canContinue || isLoading}
        >
          {isLoading ? 'Registrando...' : 'Finalizar registro'}
        </button>
      </div>
    </form>
  );
}
