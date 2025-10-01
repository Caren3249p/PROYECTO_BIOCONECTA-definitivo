# Procedimiento de despliegue local

## 1. Permisos de acceso (Windows)
- Haz clic derecho en la carpeta del proyecto.
- Ve a "Propiedades" > "Seguridad".
- Edita los permisos para cada usuario:
  - Solo el usuario administrador puede modificar archivos.
  - Otros usuarios solo pueden leer.
- Documenta los roles y accesos en este archivo.

## 2. Despliegue manual
- Para actualizar el frontend/backend:
  1. Copia los archivos modificados a la carpeta de producción:
     - Ejemplo: `robocopy frontend\src C:\ruta\produccion\frontend\src /E`
     - Ejemplo: `robocopy backend-biotecnologia\src C:\ruta\produccion\backend-biotecnologia\src /E`
  2. Reinicia el servidor si es necesario (por ejemplo, cierra y vuelve a ejecutar `npm run start:dev`).

## 3. Reemplazo de archivos
- Para reemplazar archivos, copia el nuevo archivo sobre el existente en la carpeta de producción.
- Verifica que la aplicación funcione correctamente tras el reemplazo.

## 4. Roles y accesos
- Administrador: acceso total (lectura/escritura).
- Usuario: solo lectura.

---
Este procedimiento te permite simular despliegue y control de acceso sin instalar software adicional.
