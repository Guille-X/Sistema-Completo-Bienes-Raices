# Bienes Raíces – Sistema de Valuación Fiscal con criterios y normas Guatemaltecas.

Este repositorio contiene un sistema completo para la valuación fiscal de inmuebles. Permite a la institución de consultoría generar y calcular automáticamente la valuación fiscal de terrenos, con base en parámetros como ubicación,
dimensiones, servicios públicos y otros factores

## ***Funcionalidades principales***

Gestión de documentos valuados:consulta y visualización de documentos técnicos con datos estructurados.

Registro de referenciales: ingreso de comparables con cálculo automático de valor del suelo y valor por metro cuadrado.

Carga de imágenes: integración con multer para almacenar fotos referenciales en el servidor.

Consulta de referenciales por documento: visualización tabular con enlaces a fuentes y fotos.

Selección de departamento y municipio: combobox dependiente para geolocalización del inmueble. (Contiene los 22 departamentos con sus respectivos municipios, en total 340 municipios de Guatemala)

## Control de acceso por roles:

Roles como admin, evaluador, invitado, etc.

Restricción de rutas y acciones según permisos.

## Aprobación de usuarios:

Los nuevos usuarios se registran como pendientes.

Un administrador puede aprobar o rechazar solicitudes.

## Notificación por correo electrónico:

Envío automático de email al usuario cuando su solicitud es aprobada o rechazada.

Plantillas personalizadas para cada tipo de notificación.

## Autenticación segura:

Login con validación de credenciales.

Tokens de sesión o JWT (si aplica).

## Cálculo técnico de valores:

Valor del suelo = valor total − valor construcción

Valor suelo/m² = valor suelo ÷ área terreno

## Almacenamiento estructurado en MySQL:

Tablas separadas para documentos, referenciales, usuarios y roles.

## Arquitectura modular:

Separación clara entre rutas, controladores y configuración.

Fácil de escalar y mantener.

- `/frontend`: Aplicación React para la gestión de documentos valuados, referenciales y visualización de datos.
- `/backend`: API REST en Node.js + Express con conexión a MySQL, manejo de imágenes y lógica de negocio.

---

## Instalación y ejecución

### Clona el repositorio


git clone https://github.com/Guille-X/Sistema-Completo-Bienes-Raices.git
cd Sistema-Completo-Bienes-Raices

## Backend

cd backend
npm install
node app.js

Asegúrate de tener MySQL corriendo y un archivo .env con tus credenciales.

La carpeta uploads/ se usa para almacenar imágenes referenciales.

## Frontend
cd bienes-raices-frontend
npm install
npm run dev

La app se ejecuta en http://localhost:5173 (Vite) 

Asegúrate de que el backend esté corriendo en http://localhost:3000.

## Estructura del proyecto

Sistema-Completo-Bienes-Raices/
├── backend/         # API REST con Express y MySQL
├── frontend/        # Aplicación React
├── .gitignore
└── README.md

## Crea un archivo .env con:

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_clave
DB_NAME=bienes_raices
PORT=3000


## Dependencias clave
express
mysql2
multer
dotenv
cors






