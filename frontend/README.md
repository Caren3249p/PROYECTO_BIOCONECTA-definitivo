# Bioconecta Frontend (React + Tailwind)

## Requisitos
- Node.js 18+ (recomendado)
- npm o pnpm

## Instalación
```bash
npm install
npm run dev
```
Abre el navegador en la URL que te muestre Vite.

## Estructura
- `src/components/Navbar.jsx` — barra superior según el diseño.
- `src/pages/*` — Login, Register, Dashboard, Perfil, Proyectos.
- Tailwind ya está configurado en `tailwind.config.js` y `src/styles.css`.

## Conexión al backend
- En `Login.jsx` (función `onSubmit`) integra tu llamada al backend.
- Para rutas protegidas, puedes agregar un contexto de auth y un `PrivateRoute`.
