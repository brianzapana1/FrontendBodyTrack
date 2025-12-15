import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home/Home";
import Auth from "./pages/Auth/Auth";
import Pago from "./pages/Pago/Pago";
import Premium from "./pages/Premium/Premium";
import Perfil from "./pages/Dashboard/Perfil";

import ProtectedRoute from "./routes/ProtectedRoute";
import PublicOnlyRoute from "./routes/PublicOnlyRoute";

export default function App() {
  return (
    <Router>
      <Routes>

        {/* 🌍 VISITANTE */}
        <Route
          path="/"
          element={
            <PublicOnlyRoute>
              <Layout><Home /></Layout>
            </PublicOnlyRoute>
          }
        />

        <Route
          path="/auth"
          element={
            <PublicOnlyRoute>
              <Auth />
            </PublicOnlyRoute>
          }
        />

        {/* 🔐 PRIVADO */}
        <Route
          path="/perfil"
          element={
            <ProtectedRoute>
              <Layout><Perfil /></Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/pago"
          element={
            <ProtectedRoute>
              <Pago />
            </ProtectedRoute>
          }
        />

        <Route
          path="/premium"
          element={
            <ProtectedRoute>
              <Premium />
            </ProtectedRoute>
          }
        />

      </Routes>
    </Router>
  );
}
