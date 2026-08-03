# Activar la recepción de postulaciones

1. Abre la Google Sheet **Postulaciones — Billetera vehicular**.
2. En el menú, entra a **Extensiones → Apps Script**.
3. Reemplaza el contenido de `Código.gs` por el contenido del archivo `Code.gs` de esta carpeta.
4. Presiona **Implementar → Nueva implementación**.
5. Selecciona **Aplicación web**.
6. Configura **Ejecutar como: Yo** y **Quién tiene acceso: Cualquier persona**.
7. Autoriza los permisos solicitados y copia la URL que termina en `/exec`.
8. Envía esa URL a Codex en este chat. Codex la guardará como variable privada del sitio, activará el formulario, probará un registro y eliminará la fila de prueba.

La planilla permanece privada. “Cualquier persona” se aplica solo al endpoint que recibe datos; no permite abrir ni leer la planilla.
