# 🤖 ARMAQ Facebook Auto-Poster

Este bot automatiza la publicación de contenido en la página de Facebook de **ARMAQ** (Playa del Carmen). Utiliza Inteligencia Artificial para analizar imágenes de maquinaria y generar textos de venta persuasivos.

## 🚀 Funcionalidades

*   **Publicación Automática:** Se ejecuta cada hora (cron job).
*   **Inteligencia Artificial (Gemini Vision):**
    *   Selecciona una imagen al azar de una carpeta de Google Drive.
    *   Analiza la imagen para entender qué maquinaria o producto es.
    *   Genera un texto de venta persuasivo y específico para esa imagen.
*   **Enfoque Local:** Incluye siempre la dirección y teléfono de Playa del Carmen.

## 🛠️ Tecnologías

*   Node.js
*   Google Gemini AI (Modelo `gemini-2.0-flash`)
*   Facebook Graph API
*   Google Drive API

---

## 📋 Configuración Inicial (Paso a Paso)

Antes de correr el bot, necesitas obtener las credenciales.

### 1. Facebook (Meta for Developers)
1.  Crea una App tipo "Negocios" en [developers.facebook.com](https://developers.facebook.com/).
2.  En el [Explorador de la API Graph](https://developers.facebook.com/tools/explorer/), selecciona tu App.
3.  Genera un **"Page Access Token"** (Token de Página) con los permisos:
    *   `pages_manage_posts`
    *   `pages_read_engagement`
4.  Obtén el **ID de tu Página** (puedes verlo en la URL de tu página o consultando `me/accounts` en el explorador).

### 2. Google AI (Gemini)
1.  Ve a [Google AI Studio](https://aistudio.google.com/app/apikey).
2.  Crea una API Key gratuita.

### 3. Google Drive
1.  Crea una carpeta en Drive y ponla como "Pública" (Cualquiera con el enlace).
2.  Copia el ID de la carpeta (es la parte final de la URL).
3.  Usa una API Key de Google Cloud con la "Google Drive API" habilitada.

### 4. Archivo de Entorno (.env)
Crea un archivo llamado `.env` en la raíz del proyecto y pega tus datos:

```env
FACEBOOK_PAGE_ID=Tu_ID_De_Pagina
FACEBOOK_ACCESS_TOKEN=Tu_Token_Largo
GEMINI_API_KEY=Tu_Clave_Gemini
GOOGLE_DRIVE_FOLDER_ID=Tu_ID_Carpeta_Drive
GOOGLE_DRIVE_API_KEY=Tu_Clave_Drive_API
```

---

## 📦 Instalación y Uso Local

1.  **Clonar el repositorio:**
    ```bash
    git clone <URL_DEL_REPO>
    cd fb-auto-poster
    ```

2.  **Instalar dependencias:**
    ```bash
    npm install
    ```

3.  **Iniciar el bot (Modo Automático):**
    ```bash
    npm start
    ```
    *El bot se quedará corriendo y publicará cada hora.*

4.  **Prueba Manual (Publicar YA):**
    ```bash
    node src/test-run.js
    ```

---

## ☁️ Guía de Despliegue (Railway)

Para subir este bot a la nube y que funcione 24/7 sin tener tu PC encendida:

1.  **Subir a GitHub:**
    Crea un repositorio en GitHub y sube estos archivos (el `.env` no se subirá por seguridad).

2.  **Crear Proyecto en Railway:**
    *   Ve a [Railway.app](https://railway.app/).
    *   "New Project" > "Deploy from GitHub repo".
    *   Selecciona este repositorio.

3.  **Configurar Variables:**
    **IMPORTANTE:** En el panel de Railway, ve a la pestaña **Variables** y añade manualmente las mismas claves que tienes en tu `.env` local (`FACEBOOK_PAGE_ID`, `GEMINI_API_KEY`, etc.).

4.  **Listo:**
    Railway detectará el comando `npm start` y mantendrá tu bot vivo.
