import { useState } from 'react';
import styles from '../Auth.module.css';

export default function PhysicalView({ visible, showView, toast }) {
  const [canFinish, setCanFinish] = useState(false);

  const check = () => {
    const form = document.getElementById('physical-form');
    if (!form) return;
    const ok = form.gender.value &&
               form.birth.value &&
               Number(form.height.value) >= 80 &&
               Number(form.weight.value) >= 30;
    setCanFinish(ok);
  };

  return (
    <form
      id="physical-form"
      className={`${styles.view} ${visible ? styles.visible : ''}`}
      onSubmit={(e) => {
        e.preventDefault();
        toast('Perfil completado');
        showView('welcome');
      }}
      onInput={check}
      noValidate
    >
      <h3 className={styles.center} style={{ margin: '0 0 12px', fontWeight: 900 }}>
        PERFIL FÍSICO
      </h3>

      <div className={styles.grid}>
        <label className={styles.field}>
          <div className={styles.label}>Género</div>
          <select className={styles.input} name="gender" required>
            <option value="" selected disabled>Selecciona…</option>
            <option>Femenino</option>
            <option>Masculino</option>
            <option>Otro / Prefiero no decir</option>
          </select>
        </label>

        <label className={styles.field}>
          <div className={styles.label}>Fecha de nacimiento</div>
          <input className={styles.input} type="date" name="birth" required />
        </label>

        <label className={styles.field}>
          <div className={styles.label}>Altura (cm)</div>
          <input
            className={styles.input}
            type="number"
            name="height"
            min="80"
            max="250"
            placeholder="Ej. 170"
            required
          />
        </label>

        <label className={styles.field}>
          <div className={styles.label}>Peso (kg)</div>
          <input
            className={styles.input}
            type="number"
            name="weight"
            min="30"
            max="300"
            step="0.1"
            placeholder="Ej. 65.0"
            required
          />
        </label>
      </div>

      <div className={`${styles.grid} ${styles.grid2}`}>
        <button className={`${styles.btn} ${styles.btnGhost}`} type="button" onClick={() => showView('welcome')}>
          Regresar
        </button>
        <button
          className={`${styles.btn} ${styles.btnOk} ${!canFinish ? styles.btnDisabled : ''}`}
          type="submit"
          disabled={!canFinish}
        >
          Continuar
        </button>
      </div>
    </form>
  );
}