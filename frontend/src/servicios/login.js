// 📁 src/servicios/login.js
const API_URL = "http://localhost:3000/auth/login";

/**
 * 🔐 Inicia sesión contra el backend de Bioconecta
 * @param {string} email - Correo electrónico del usuario
 * @param {string} password - Contraseña del usuario
 * @returns {Promise<object>} Datos del usuario autenticado
 */
export async function login(email, password) {
  try {
    console.log("🚀 Enviando solicitud de login...");

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    // 📦 Intenta convertir la respuesta a JSON, incluso si no es exitosa
    let data;
    try {
      data = await response.json();
    } catch {
      throw new Error("❌ El servidor no respondió correctamente (no es JSON).");
    }

    // ⚠️ Verifica errores del servidor o autenticación
    if (!response.ok || !data.ok) {
      console.warn("⚠️ Fallo en autenticación:", data);
      throw new Error(data.message || "Credenciales incorrectas. Inténtalo de nuevo.");
    }

    // ✅ Guarda el token y datos del usuario
    const { access_token, user } = data;
    localStorage.setItem("token", access_token);
    localStorage.setItem("nombre", user?.userName || "Usuario");
    localStorage.setItem("rol", user?.rol || "Estudiante");

    console.log("✅ Inicio de sesión exitoso para:", user?.email || "desconocido");

    return data;
  } catch (error) {
    console.error("💥 Error al iniciar sesión:", error.message);
    throw new Error(
      "No se pudo conectar con el servidor. Revisa tu conexión o intenta más tarde."
    );
  }
}
