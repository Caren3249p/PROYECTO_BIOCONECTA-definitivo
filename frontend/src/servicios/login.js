// 📁 src/servicios/login.js
const API_URL = "http://localhost:3000/auth/login";

/**
 * 🔐 Inicia sesión contra el backend de Bioconecta
 * @param {string} email - Correo electrónico del usuario
 * @param {string} password - Contraseña del usuario
 * @returns {Promise<object>} Datos del usuario autenticado
 */
// Modo demo: login simulado sin backend
export async function login(email, password) {
  // Buscar usuario en localStorage
  const users = JSON.parse(localStorage.getItem("demo_users") || "[]");
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) throw new Error("Credenciales inválidas (demo)");
  // Simular token
  const token = btoa(email + ":demo");
  localStorage.setItem("token", token);
  localStorage.setItem("nombre", user.userName || "Demo");
  localStorage.setItem("rol", user.rol || "Estudiante");
  return { ok: true, access_token: token, user };
}
