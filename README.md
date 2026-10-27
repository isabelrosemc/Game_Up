# LEVEL-UP GAMER — Tienda Online Frontend (Evaluación Parcial N° 2)

Bienvenido/a al repositorio oficial del proyecto **Level-Up Gamer**, una aplicación web de comercio electrónico moderna, rápida e interactiva desarrollada con **React**, **Vite** y **Bootstrap**.

Este proyecto corresponde a la **Evaluación Parcial N° 2** de la asignatura **Desarrollo Fullstack II (DSY1104)** de Duoc UC.

---

## 1. ¿De qué trata este proyecto?

**Level-Up Gamer** es una plataforma de tienda online pensada para la comunidad gamer y de tecnología. Permite explorar productos, filtrar por categorías, gestionar un carrito de compras y administrar inventario y usuarios.

### Objetivos de la Evaluación 2 cumplidos:
* **Migración a React:** Transformación de la maqueta base inicial (HTML/CSS/JS) a una arquitectura modular basada en componentes reutilizables de React.
* **Manejo de Estado y Propiedades (State & Props):** Gestión reactiva de datos locales mediante hooks (`useState`, `useEffect`, contextos) para el carrito de compras, catálogo de productos y sesión de usuarios.
* **Diseño Responsivo con Bootstrap:** Adaptabilidad visual completa para computadores, tablets y teléfonos celulares.
* **Persistencia Simulada (Mock Data & LocalStorage):** Almacenamiento local seguro en el navegador para simular una base de datos antes de la conexión con backend (Evaluación 3).
* **Reglas de Negocio Implementadas:**
  * Registro y control para usuarios mayores de 18 años.
  * Descuento vitalicio del 20% para usuarios registrados con correo institucional Duoc UC (`@duoc.cl` o `@duocuc.cl`).
  * Gestión de roles: Administrador, Vendedor y Cliente.
* **Pruebas Unitarias Automatizadas:** Batería de pruebas que verifican el renderizado de componentes, eventos de usuario y cálculos de precios/descuentos.

---

##  2. Programas que necesitas tener instalados (Requisitos previos)

Si no tienes experiencia previa instalando software de desarrollo, no te preocupes. Sigue estos 3 pasos antes de abrir el proyecto:

### Paso 1: Instalar Node.js (El motor que ejecuta JavaScript)
1. Entra a la página oficial: [https://nodejs.org/](https://nodejs.org/)
2. Descarga la versión recomendada que dice **LTS** (ejemplo: versión 18 o superior).
3. Abre el archivo descargado y sigue el instalador presionando **Next** (Siguiente) a todo hasta finalizar.

### Paso 2: Instalar Git (Para descargar y gestionar el código)
1. Entra a [https://git-scm.com/](https://git-scm.com/)
2. Haz clic en **Download for Windows** (o tu sistema operativo).
3. Instálalo manteniendo todas las opciones por defecto que sugiere el instalador.

### Paso 3: Instalar Visual Studio Code (Tu editor de texto)
1. Entra a [https://code.visualstudio.com/](https://code.visualstudio.com/)
2. Descarga e instala la versión para tu sistema.

---

## 3. Guía paso a paso para ejecutar el proyecto en tu computador

Sigue estas instrucciones al pie de la letra para ver la tienda funcionando en tu pantalla:

### 1. Clonar el repositorio a tu equipo
1. Abre el programa **Git Bash** o la consola **Símbolo del sistema (CMD)** en tu computador.
2. Elige una carpeta donde quieras guardar el proyecto (por ejemplo, tu Escritorio) escribiendo:
   ```bash
   cd Desktop
   ```
3. Descarga el código del repositorio ejecutando el siguiente comando:
   ```bash
   git clone https://github.com/isabelrosemc/Game_Up.git
   ```
### 2. Abrir el proyecto en Visual Studio Code
1. Entra a la carpeta del proyecto recién descargada:
   ```bash
   cd game_up
   ```
2. Ábrela directamente en Visual Studio Code con el comando:
   ```bash
   code .
   ```
   *(También puedes abrir Visual Studio Code manualmente, ir al menú superior **File > Open Folder...** y seleccionar la carpeta del proyecto).*

### 3. Abrir la Terminal integrada en Visual Studio Code
1. En el menú superior de Visual Studio Code, haz clic en **Terminal** y luego en **New Terminal** (Nueva Terminal).
2. Verás una ventana negra o azul en la parte inferior de la pantalla lista para recibir comandos.

### 4. Instalar las dependencias (`npm install`)
Para que React y las librerías funcionen, el proyecto necesita descargar sus módulos necesarios:
1. En la terminal escribe:
   ```bash
   npm install
   ```
2. Presiona la tecla **Enter** y espera entre 1 y 3 minutos hasta que termine el proceso. Aparecerá una carpeta nueva llamada `node_modules`.

### 5. Iniciar el servidor local con Vite
1. En la misma terminal, ejecuta:
   ```bash
   npm run dev
   ```
2. Verás un mensaje en pantalla similar a este:
   ```text
     VITE v5.x.x  ready in 320 ms

     ➜  Local:   http://localhost:5173/
     ➜  Network: use --host to expose
     ➜  press h + enter to show help
   ```
3. El proyecto se ha levantado exitosamente en el puerto local **5173**.
4. Mantén presionada la tecla **Ctrl** (Control) y haz clic sobre el enlace `http://localhost:5173/` en la terminal, o abre tu navegador web favorito (Chrome, Edge, Firefox) y escribe en la barra de direcciones:
   ```text
   http://localhost:5173
   ```
5. ¡Listo! Ya puedes ver e interactuar con la tienda **Level-Up Gamer**.

> **Nota para detener el servidor:** Si deseas apagar la aplicación, regresa a la terminal de Visual Studio Code y presiona la combinación de teclas **Ctrl + C**.

---

## 4. ¿Cómo ejecutar las pruebas unitarias (Testing)?

La Evaluación Parcial N° 2 exige validar la calidad del código mediante pruebas automatizadas que revisan el comportamiento de los componentes y la lógica de negocio.

Para ejecutar la batería de pruebas:
1. Abre una terminal en Visual Studio Code.
2. Ejecuta:
   ```bash
   npm test
   ```
3. La consola ejecutará las pruebas unitarias y te mostrará un resumen con los tests aprobados en color verde.

---

## 5. Usuarios y Datos de Prueba Iniciales (Mock Data)

La aplicación precarga automáticamente datos en el almacenamiento local (`localStorage`) para que puedas probar todas las funciones sin necesidad de registrarte desde cero:

* **Cuenta Administrador:**
  * **Correo:** `camila.reyes@duoc.cl`
  * **Rol:** Administrador (Acceso al panel de gestión de productos y stock crítico).
  * **Beneficio:** Aplica automáticamente el **20% de descuento institucional Duoc UC** en el carrito.
* **Cuenta Cliente:**
  * **Correo:** `matias.lopez@gmail.com`
  * **Rol:** Cliente regular.

---

## 6. Estructura general de las carpetas

* **`public/`**: Imágenes de productos, banners institucionales y recursos multimedia estáticos.
* **`src/components/`**: Elementos visuales reutilizables (Barras de navegación, tarjetas de productos, modales, alertas y botones).
* **`src/pages/`**: Vistas completas de la aplicación (Inicio/Catálogo, Detalle de Producto, Carrito de Compras, Registro, Login y Administración).
* **`src/context/` o `src/utils/`**: Lógica de almacenamiento (`localStorage`), cálculo de descuentos, autenticación y simulación de base de datos (`mock data`).
* **`src/test/`**: Archivos de pruebas unitarias y configuración del entorno de testeo.
* **`package.json`**: Lista de dependencias, scripts de ejecución (`dev`, `build`, `test`) y metadatos del proyecto.
* **`vite.config.js`**: Archivo de configuración rápida del empaquetador Vite.

---

* **Asignatura:** Desarrollo Fullstack II (DSY1104) — Duoc UC
* **Evaluación:** Evaluación Parcial N° 2 (30% de la ponderación semestral)
