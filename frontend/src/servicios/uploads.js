const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000";

export async function uploadFile(file, proyectoId) {
  const token = localStorage.getItem("token");
  const form = new FormData();
  form.append("file", file);

  const headers = {};
  if (proyectoId) headers["x-proyecto-id"] = proyectoId;

  const res = await fetch(`${API_BASE}/uploads`, {
    method: "POST",
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : undefined,
    },
    body: form,
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`Upload failed: ${res.status} ${txt}`);
  }

  return res.json();
}

export async function listDocumentos(proyectoId) {
  const token = localStorage.getItem("token");
  const url = new URL(`${API_BASE}/documentos`, window.location.origin);
  if (proyectoId) url.searchParams.set("proyectoId", proyectoId);

  const res = await fetch(url.toString(), {
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined,
    },
  });

  if (!res.ok) throw new Error(`List documentos failed: ${res.status}`);
  return res.json();
}
