import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { ROLES } from "../utils/constants";
import styles from "./Header.module.css";

export default function Header() {
  const { user, logout } = useAuthStore();

  /* ======================================================
     👉 CASO 1: USUARIO VISITANTE (NO LOGUEADO)
     EXACTAMENTE el navbar original, SIN CAMBIOS
  ====================================================== */
  if (!user) {
    return (
      <nav className={styles.nav} id="nav">
        <div className={styles.navIn}>
          <a className={styles.brand} href="#inicio">
            <img src="/src/assets/logo-bodytrack.png" alt="Bodytrack logo" />
            <span className={styles.brandName}>BODYTRACK</span>
          </a>

          <div className={styles.menu}>
            <a className={styles.pill} href="#inicio">INICIO</a>
            <a className={styles.pill} href="#casos">CASOS DE ÉXITO</a>
            <a className={styles.pill} href="#entrenadores">ENTRENADORES</a>
            <a className={styles.pill} href="#planes">PLANES</a>
            <Link className={`${styles.pill} ${styles.pillAccent}`} to="/auth">
              ACCEDER
            </Link>
          </div>
        </div>
      </nav>
    );
  }

  /* ======================================================
     👉 CASO 2: USUARIO LOGUEADO (roles)
  ====================================================== */
  return (
    <nav className={styles.nav} id="nav">
      <div className={styles.navIn}>
        {/* LOGO */}
        <Link className={styles.brand} to="/dashboard">
          <img src="/src/assets/logo-bodytrack.png" alt="Bodytrack logo" />
          <span className={styles.brandName}>BODYTRACK</span>
        </Link>

        <div className={styles.menu}>

          {/* ================= CLIENTE ================= */}
          {user.rol === ROLES.CLIENTE && (
            <>
              <Link className={styles.pill} to="/perfil">MI PERFIL</Link>
              <Link className={styles.pill} to="/dashboard/foro">FORO COMUNIDAD</Link>
              <Link className={styles.pill} to="/dashboard/entrenador">ENTRENADOR</Link>

              {/* SUBMENÚ PAGOS */}
              <div className={styles.dropdown}>
                <span className={styles.pill}>PAGOS</span>
                <div className={styles.dropdownMenu}>
                  <Link to="/dashboard/pagos/pagar">Pagar</Link>
                  <Link to="/dashboard/pagos/historial">Historial de Compras</Link>
                </div>
              </div>

              <Link className={styles.pill} to="/dashboard/logros">LOGROS Y OBJETIVOS</Link>
              <Link className={styles.pill} to="/dashboard/entrenamiento">ENTRENAMIENTO</Link>
            </>
          )}

          {/* ================= ENTRENADOR ================= */}
          {user.rol === ROLES.ENTRENADOR && (
            <>
              <Link className={styles.pill} to="/perfil">MI PERFIL</Link>
              <Link className={styles.pill} to="/dashboard/foro">FORO COMUNIDAD</Link>
              <Link className={styles.pill} to="/dashboard/entrenar">ENTRENAR</Link>
              <Link className={styles.pill} to="/dashboard/mis-clientes">MIS CLIENTES</Link>
            </>
          )}

          {/* ================= ADMIN ================= */}
          {user.rol === ROLES.ADMIN && (
            <>
              <Link className={styles.pill} to="/perfil">MI PERFIL</Link>
              <Link className={styles.pill} to="/dashboard/entrenadores">ENTRENADORES</Link>
              <Link className={styles.pill} to="/dashboard/pagos">PAGOS</Link>
              <Link className={`${styles.pill} ${styles.pillAccent}`} to="/admin">
                ADMINISTRAR
              </Link>
            </>
          )}

          {/* ================= SALIR ================= */}
          <button
            onClick={logout}
            className={`${styles.pill} ${styles.pillDanger}`}
          >
            SALIR
          </button>
        </div>
      </div>
    </nav>
  );
}
