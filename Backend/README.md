
#  Backend – Bienes Raíces

Este módulo contiene la API REST desarrollada en **Node.js + Express**, conectada a **MySQL**, con soporte para carga de imágenes y documentos PDF mediante `multer`.


## Instalación

cd backend
npm install

## Ejecución

node app.js

## Variables de entorno

Crea un archivo .env con tus credenciales:

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_clave
DB_NAME=bienes_raices
PORT=3000

## Carga de imágenes

Las imágenes se almacenan en /uploads
Se acceden desde: http://localhost:3000/uploads/nombre.jpg O .pdf

## Dependencias clave

express
mysql2
multer
dotenv
cors

## Autenticación segura

Login con validación de credenciales.
Tokens de sesión o JWT (si aplica).

## Arquitectura modular

Separación clara entre rutas, controladores y configuración.
Fácil de escalar y mantener.





