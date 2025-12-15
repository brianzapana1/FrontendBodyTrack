import { useState } from "react";
import { useAuthStore } from "../../../store/authStore";
import styles from "../Auth.module.css";
import { useNavigate } from "react-router-dom";


export default function LoginView({ visible, showView, toast }) {
  const { login, isLoading, error } = useAuthStore();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(formData.email, formData.password);

      toast("Sesión iniciada correctamente");
      showView("welcome");
      // 🔐 REDIRECCIÓN REAL
      navigate("/perfil", { replace: true });
    } catch (err) {
      console.error("Error al iniciar sesión:", err);
      toast("Credenciales incorrectas");
    }
  };

  return (
    <form
      className={`${styles.view} ${visible ? styles.visible : ""}`}
      onSubmit={handleSubmit}
      noValidate
    >
      {/* 🔴 Mostrar error si viene del backend */}
      {error && (
        <div className={styles.errorBox}>
          {error}
        </div>
      )}

      <div className={styles.grid}>
        <label className={styles.field}>
          <div className={styles.label}>Correo electrónico</div>
          <input
            className={styles.input}
            type="email"
            name="email"
            placeholder="tucorreo@ejemplo.com"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>

        <label className={styles.field}>
          <div className={styles.label}>Contraseña</div>
          <input
            className={styles.input}
            type="password"
            name="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            minLength="6"
            required
          />
        </label>
      </div>

      <div className={`${styles.sep} ${styles.mt12}`}><span>o</span></div>

      <button className={styles.btn} type="submit" disabled={isLoading}>
        {isLoading ? "Ingresando..." : "Ingresar"}
      </button>

      <p className={styles.center}>
        <span className={styles.link} onClick={() => showView("welcome")}>
          Volver
        </span>
      </p>
    </form>
  );
}
