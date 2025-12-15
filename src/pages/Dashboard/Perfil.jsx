import { useAuthStore } from "../../store/authStore";

export default function Perfil() {
  const { user, logout } = useAuthStore();

  if (!user) return null;

  return (
    <section style={{ padding: "40px" }}>
      <h2>Mi Perfil</h2>

      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Rol:</strong> {user.rol}</p>

      <button onClick={logout}>Cerrar sesión</button>
    </section>
  );
}
