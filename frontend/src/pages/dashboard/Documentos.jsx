import React, { useState, useEffect } from "react";
import { uploadFile, listDocumentos } from "../../servicios/uploads";

export default function Documentos() {
  const [proyectoId, setProyectoId] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [documentos, setDocumentos] = useState([]);

  useEffect(() => {
    if (!proyectoId) return;
    fetchList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [proyectoId]);

  async function fetchList() {
    try {
      setError(null);
      const res = await listDocumentos(proyectoId);
      setDocumentos(res.data || res);
    } catch (err) {
      setError(err.message || String(err));
    }
  }

  async function handleUpload(e) {
    e.preventDefault();
    if (!file) return setError("Selecciona un archivo");
    try {
      setLoading(true);
      setError(null);
      const result = await uploadFile(file, proyectoId);
      // si la API devuelve el documento, agregamos a la lista
      if (result && result.data) setDocumentos(prev => [result.data, ...prev]);
      else if (result && result.id) setDocumentos(prev => [result, ...prev]);
    } catch (err) {
      setError(err.message || String(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Documentos</h1>

      <form onSubmit={handleUpload} className="mb-4">
        <div className="mb-2">
          <label className="block text-sm">Proyecto ID (para pruebas)</label>
          <input
            value={proyectoId}
            onChange={e => setProyectoId(e.target.value)}
            className="border p-2 w-full"
            placeholder="Ingrese proyectoId"
          />
        </div>

        <div className="mb-2">
          <input type="file" onChange={e => setFile(e.target.files[0])} />
        </div>

        <div>
          <button
            disabled={loading}
            className="bg-blue-600 text-white px-3 py-1 rounded"
          >
            {loading ? "Subiendo..." : "Subir archivo"}
          </button>
        </div>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </form>

      <section>
        <h2 className="font-semibold mb-2">Archivos</h2>
        {documentos.length === 0 && <p>No hay documentos cargados.</p>}
        <ul>
          {documentos.map(doc => (
            <li key={doc.id || doc._id} className="mb-2">
              <a
                href={doc.url}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 underline"
              >
                {doc.nombre || doc.fileName || doc.url}
              </a>
              <div className="text-sm text-gray-600">Proyecto: {doc.proyecto?.id || doc.proyectoId || proyectoId || 'N/A'}</div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
