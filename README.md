# Tienda Online Full Stack

Proyecto de comercio electrónico completo con React, Node.js, Express y MySQL.

## 🚀 Cómo instalar y ejecutar este proyecto desde cero

Si has descargado este código de GitHub en una nueva computadora, sigue estos pasos:

### 1. Requisitos Previos
- Tener instalado **Node.js** (versión 14 o superior).
- Tener instalado **MySQL** (XAMPP recomendado en Windows).
- Tener instalado **Git**.

### 2. Descargar el código
Abre tu terminal y ejecuta:
```bash
git clone https://github.com/leien12/tienda-online.git
cd tienda-online
```

### 3. Instalar Dependencias
Este proyecto tiene dos partes (Frontend y Backend), debes instalar las librerías en AMBAS.

**Para el Frontend (React):**
```bash
# Estando en la carpeta raíz 'tienda-online'
npm install
```

**Para el Backend (Servidor):**
```bash
# Entra a la carpeta del servidor
cd server
npm install
# Vuelve a la raíz
cd ..
```

### 4. Configurar la Base de Datos
1. Asegúrate de que MySQL esté corriendo (si usas XAMPP, inicia "MySQL" en el panel).
2. Importa el archivo de base de datos incluido:
   - Puedes usar **phpMyAdmin** (http://localhost/phpmyadmin), crear una base llamada `tienda_online` e importar el archivo `database.sql` que está en la carpeta raíz.
   - O por terminal: `mysql -u root -p < database.sql`

### 5. Iniciar la Aplicación
Necesitas dos terminales abiertas al mismo tiempo:

**Terminal 1 (Backend/Servidor):**
```bash
cd server
npm start
```
*Debe decir: "Servidor corriendo en el puerto 3001"*

**Terminal 2 (Frontend/React):**
```bash
# En la carpeta raíz
npm start
```
*Esto abrirá automáticamente la tienda en http://localhost:3000*

## 🔑 Credenciales de Prueba

**Admin (Panel de Control):**
- Email: `admin@tienda.com`
- Password: `admin123`
- Ruta: `/admin/dashboard`

**Usuario:**
- Email: `juan@email.com`
- Password: `user123`

---
Desarrollado con ❤️ usando React y Node.js
