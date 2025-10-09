const API_URL = "http://localhost:3000/auth/register";

export async function register(data) {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    console.log("📩 Respuesta del backend:", result);

    if (!response.ok) throw new Error(result.message || "Error al registrar");

    return result;
  } catch (error) {
    console.error("❌ Error al conectar con el backend:", error);
    throw error;
  }
}
