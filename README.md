# Storydots Challenge Frotend

- [Intro](#intro)
- [Librerias](#libreries)
- [Quick Start](#quick-start)
- [Deploy](#deploy)
- [Mejoras](#mejoras)
- [¿Necesitas ayuda?](#necesitas-ayuda)

---

## Intro

Bienvenido a la documentacion del challenge de StoryDots - Fronted.
Se trata de una app fullstack con React.js y NodeJS para realizar las
operaciones CRUD de productos con algunos extras como añadir una autenticación y unos endpoint de brands.
- [Ir al backend](https://github.com/agustinmme/Storydots-backend)

## Libreries

Las librerias utilizadas para el desarrollo de esta api fueron:
- Chakra-ui.
- Axios.
- Formik.
- Yup.
- React-router.
- React-Icons.
- Vite

## Quick Start

- Primero configurar Variables de entorno.
- Crear archivo .env en directorio raíz con las siguientes datos.

```
VITE_URL_APINODE=[TU-URL]
```
- Ejecutar el comando **npm run dev**.

\* La app se ejecutara en el puerto 4000 EL front y 3000 el backend.

## Deploy 

Esta api esta inicialmente esta deployada en AWS en una instancia EC2 ubuntu pero por falta de certificado no es posible utilizar el backend con Vercel. 
Por este motivo se paso a utilizar Heroku como host backend y Vercel como front.
[PAGINA FINAL](https://storydots-frontend-challenges.vercel.app/)

## Mejoras?

- Agregrar redux o context.
- Agregar roles de usuarios o eliminar seccion de registro.
- Agregar Localstorage.
- Agregar Cypress o Jest/React-testing-librery.
- Cambiar algunos console.logs por Alertas.
- Investigar patrones, organización y estructuras de directorio react/node.

\* Algunos de estos puntos no se aplicaron por falta de tiempo.

## Backend 

[Ir al backend](https://github.com/agustinmme/Storydots-backend)

## ¿Necesitas ayuda? 

Para cualquier pregunta, envíe un correo electrónico a agustinmansilla240@gmail.com y te ayudare :)
