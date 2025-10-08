// ✅ frontend/src/servicios/register.js
export async function register(userData) {
  try {
    const payload = {
      userName: userData.userName || 'Usuario',
      userLastname: userData.userLastname || '',
      email: userData.email,
      password: userData.password,
      userRole_iduserRole: userData.userRole_iduserRole || 1,
      userStatus_iduserStatus: userData.userStatus_iduserStatus || 1,
      company_idcompany: userData.company_idcompany || 1,
    };

    const response = await fetch("http://localhost:3000/usuarios/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      return { ok: false, message: data.message || "Error al registrar usuario" };
    }

    return { ok: true, message: "Registro exitoso", user: data.user || data };
  } catch (error) {
    console.error("❌ Error en register:", error);
    return { ok: false, message: "Error de conexión con el servidor" };
  }
}

export default register;
