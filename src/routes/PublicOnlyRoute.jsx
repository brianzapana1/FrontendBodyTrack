import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

export default function PublicOnlyRoute({ children }) {
  const { isAuthenticated } = useAuthStore();

  if (isAuthenticated) {
    return <Navigate to="/perfil" replace />;
  }

  return children;
}
