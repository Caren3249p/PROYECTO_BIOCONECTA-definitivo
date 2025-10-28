const API_URL = "http://localhost:3000/auth/register";

// Modo demo: registro simulado sin backend
export async function register(data) {
  const users = JSON.parse(localStorage.getItem("demo_users") || "[]");
  if (users.find(u => u.email === data.email)) {
    return { ok: false, message: "El correo ya está registrado (demo)" };
  }
  users.push({ ...data });
  localStorage.setItem("demo_users", JSON.stringify(users));
  return { ok: true };
}
