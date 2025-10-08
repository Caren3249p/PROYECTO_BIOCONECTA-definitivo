export async function login(email, password) {
  try {
    const res = await fetch("http://localhost:3000/usuarios/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      return { ok: false, message: data.message || "Credenciales incorrectas" };
    }

    return { ok: true, access_token: data.access_token, user: data.user };
  } catch (err) {
    console.error("❌ Error en login:", err);
    return { ok: false, message: "Error de conexión con el servidor" };
  }
}
export default login;
