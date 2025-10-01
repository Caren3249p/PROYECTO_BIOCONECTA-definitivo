import { useEffect, useState } from "react";
import ProyectoTareas from "../components/ProyectoTareas";


export default function Proyectos() {
  // Modelo de proyecto: { id, nombre, descripcion, fechaInicio, fechaFin }
  const [proyectos, setProyectos] = useState([]);
  // Estado para tareas por proyecto: { [proyectoId]: [tareas] }
  const [tareasPorProyecto, setTareasPorProyecto] = useState({});
  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    fechaInicio: "",
    fechaFin: "",
  });
  const [mensaje, setMensaje] = useState("");
  const [editId, setEditId] = useState(null);

  // Cargar proyectos desde localStorage al iniciar
  useEffect(() => {
    const stored = localStorage.getItem("proyectos");
    if (stored) {
      setProyectos(JSON.parse(stored));
    }
    const tareasStored = localStorage.getItem("tareasPorProyecto");
    if (tareasStored) {
      setTareasPorProyecto(JSON.parse(tareasStored));
    }
  }, []);

  // Guardar proyectos en localStorage cada vez que cambian
  useEffect(() => {
    localStorage.setItem("proyectos", JSON.stringify(proyectos));
  }, [proyectos]);

  useEffect(() => {
    localStorage.setItem("tareasPorProyecto", JSON.stringify(tareasPorProyecto));
  }, [tareasPorProyecto]);

  const onChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setMensaje("");
    if (!form.nombre) {
      setMensaje("El nombre es obligatorio");
      return;
    }
    if (editId !== null) {
      // Editar proyecto existente
      setProyectos((prev) =>
        prev.map((p) =>
          p.id === editId ? { ...p, ...form } : p
        )
      );
      setMensaje("Proyecto actualizado");
    } else {
      // Crear nuevo proyecto
      const nuevo = {
        ...form,
        id: Date.now(),
      };
      setProyectos((prev) => [...prev, nuevo]);
      setMensaje("Proyecto creado exitosamente");
    }
    setForm({ nombre: "", descripcion: "", fechaInicio: "", fechaFin: "" });
    setEditId(null);
  };

  const onEdit = (id) => {
    const proyecto = proyectos.find((p) => p.id === id);
    if (proyecto) {
      setForm({
        nombre: proyecto.nombre,
        descripcion: proyecto.descripcion,
        fechaInicio: proyecto.fechaInicio,
        fechaFin: proyecto.fechaFin,
      });
      setEditId(id);
      setMensaje("");
    }
  };

  const onDelete = (id) => {
    setProyectos((prev) => prev.filter((p) => p.id !== id));
    setMensaje("Proyecto eliminado");
    if (editId === id) {
      setForm({ nombre: "", descripcion: "", fechaInicio: "", fechaFin: "" });
      setEditId(null);
    }
  };

  return (
    <main className="flex-1 flex items-start justify-center py-10">
      <section className="card w-full max-w-5xl">
        <h1 className="text-xl font-bold mb-6">PROYECTOS</h1>
        <div className="border-b-4 border-teal-600 w-32 mb-6"></div>
        <form onSubmit={onSubmit} className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="label" htmlFor="nombre">Nombre del Proyecto</label>
            <input id="nombre" type="text" className="input mb-3" required value={form.nombre} onChange={onChange} />
            <label className="label" htmlFor="descripcion">Descripción</label>
            <input id="descripcion" type="text" className="input mb-3" value={form.descripcion} onChange={onChange} />
          </div>
          <div>
            <label className="label" htmlFor="fechaInicio">Fecha de Inicio</label>
            <input id="fechaInicio" type="date" className="input mb-3" value={form.fechaInicio} onChange={onChange} />
            <label className="label" htmlFor="fechaFin">Fecha de Fin</label>
            <input id="fechaFin" type="date" className="input mb-3" value={form.fechaFin} onChange={onChange} />
            <button type="submit" className="btn btn-primary mt-6">{editId !== null ? "Actualizar Proyecto" : "Crear Proyecto"}</button>
            {mensaje && <p className="mt-4 text-red-600">{mensaje}</p>}
          </div>
        </form>
        <ul className="space-y-3">
          {proyectos.map((p) => (
            <li key={p.id} className="bg-gray-100 rounded-lg px-4 py-3 text-gray-700 flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <div>
                  <strong>{p.nombre}</strong> {p.fechaInicio ? `• ${p.fechaInicio}` : ""}
                  <div className="text-sm text-gray-500">{p.descripcion}</div>
                </div>
                <div className="flex gap-2">
                  <button className="btn btn-sm btn-secondary" onClick={() => onEdit(p.id)}>Editar</button>
                  <button className="btn btn-sm btn-danger" onClick={() => onDelete(p.id)}>Eliminar</button>
                </div>
              </div>
              {/* Tareas del proyecto */}
              <ProyectoTareas
                tareas={Array.isArray(tareasPorProyecto[p.id]) ? tareasPorProyecto[p.id] : []}
                setTareas={(tareasActualizadas) => {
                  const tareasArray = Array.isArray(tareasActualizadas) ? tareasActualizadas : [];
                  setTareasPorProyecto((prev) => {
                    const nuevo = { ...prev, [p.id]: tareasArray };
                    localStorage.setItem("tareasPorProyecto", JSON.stringify(nuevo));
                    return { ...nuevo };
                  });
                }}
              />
            </li>
          ))}
        </ul>
        {proyectos.length === 0 && <p className="text-center text-gray-400 mt-10">No hay proyectos</p>}
      </section>
    </main>
  );
}
