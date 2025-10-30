# Frontend – Bienes Raíces

Este módulo contiene la interfaz de usuario desarrollada en **React**, diseñada para gestionar documentos valuados, registrar referenciales con imágenes, y visualizar cálculos técnicos como valor del suelo y valor por metro cuadrado entre otros.

---

## Instalación

cd bienes-raices-frontend
npm install

## Ejecución
npm run dev

La aplicación se ejecutará en http://localhost:5173 si usas Vite.

Asegúrate de que el backend esté corriendo en http://localhost:3000 o ajusta la URL base en los archivos de servicio (axios).

## Funcionalidades clave

## Rol Administrador
** Se encarga de la oprovacion o el rechazo de nuevos usuarios 
** Podra ver y validar los documentos adjuntos para los nuevos usuarios

** Si el usuario es aprovado se le notificara por E-mail y podra acceder a la plataforma deacuerdo al rol establecido.

** Si el usuario es rechazado se le notificara por E-mail y NO podra acceder a la plataforma.

## Rol Valuador
*** Registro de documentos (Certificacion de registro, Escritura publica)

*** Calculo de Area de terreno (con fórmula de Herón)

*** Visualizar registros prendientes (Aprovar, Rechazar)

*** Agregar caracteristicas del terreno (Solo aplica a registros aprovados)

*** Ingresar Comparables referenciales de los terrenos aprovados y con caracteristicas aplicadas.

## Rol Tecnico 

*** Modulo creado (a la espera de historias de usuario)



