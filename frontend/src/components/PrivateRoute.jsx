import React from "react";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");

  // Si no hay token, redirige al login
  if (!token || token === "undefined" || token === "null") {
    return <Navigate to="/login" replace />;
  }

  // Si sí hay token, muestra el contenido protegido
  return <>{children}</>;
}
