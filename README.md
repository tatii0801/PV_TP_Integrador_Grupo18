# PV_TP_Integrador_Grupo18

## Trabajo Práctico Integrador - Programación Visual

### React - Vite - Material UI - React Router - Context API - LocalStorage - FakeStoreAPI

---

# Integrantes con sus usuarios de GitHub

Agustin Pablo Portillo
DNI: 38976086
LU: APU006548
Usuario GitHub: PortilloAgustin95

Moisés Antonio Israel Flores Navajas
DNI: 38973565
LU: 5307
Usuario GitHub: MoisesFloresNavajas

Tatiana Valeria Nieva
DNI: 43139597
LU: 3866
Usuario GitHub: tatii0801

Yesarela Febe Manuelita Flores Navajas
DNI: 41041662
LU: 6000
Usuario GitHub: YesarelaFloresNavajas

---

# Estructura del Proyecto

## src/components/

Contiene componentes reutilizables:

### layout/

* Header.jsx

### common/

* FormAltaCliente.jsx

---

## src/context/

Contiene el manejo del estado global:

* AdminContext.jsx

---

## src/views/

Contiene las vistas principales:

* Login.jsx
* ListaClientes.jsx

---

## src/css/

Contiene los estilos CSS de la aplicación.

---

## Archivos principales

* App.jsx
* main.jsx

---

# Tecnologías Utilizadas

* React
* Vite
* JavaScript
* JSX
* CSS
* Material UI (MUI)
* React Router DOM
* Context API
* LocalStorage
* Fetch API
* Node.js
* npm
* Git
* GitHub

---

# Hooks Utilizados

* useState
* useEffect
* useContext

---

# Consumo de API

Se utiliza la API pública:

https://fakestoreapi.com/users

Operaciones implementadas hasta el momento:

* GET
* POST

---

# Comandos Utilizados

### Crear proyecto

```bash
npm create vite@latest
```

### Instalar dependencias

```bash
npm install
```

### Instalar React Router

```bash
npm install react-router-dom
```

### Instalar Material UI

```bash
npm install @mui/material @emotion/react @emotion/styled
```

### Ejecutar proyecto

```bash
npm run dev
```

---

# Objetivo del Trabajo

Desarrollar un Panel de Control de Clientes utilizando React y Vite, aplicando los conceptos vistos durante la cursada mediante una aplicación SPA conectada a una API REST pública.

---

# Descripción

La aplicación permite administrar clientes consumiendo información desde FakeStoreAPI.

Durante el desarrollo del proyecto se aplican conceptos relacionados con:

* Componentes funcionales
* JSX
* Hooks
* React Router
* Context API
* Estado global
* Persistencia con LocalStorage
* Consumo de API REST
* Material UI
* Manejo de estados de carga y errores

---

# Funcionalidades Implementadas

## Gestión de Administrador

Se implementó un sistema de autenticación utilizando Context API.

El administrador puede:

* Iniciar sesión
* Seleccionar su sector
* Mantener la sesión mediante LocalStorage
* Cerrar sesión

Además, las rutas de la aplicación se encuentran protegidas mediante React Router.

---

## Estado Global

Se creó:

```plaintext
src/context/AdminContext.jsx
```

El contexto administra:

* Nombre del administrador
* Sector de la empresa

Se implementaron las funciones:

```js
iniciarSesion()
```

```js
cerrarSesion()
```

---

## Persistencia

Se utiliza:

```js
useEffect()
```

junto con:

```js
localStorage
```

Cada cambio del administrador se almacena automáticamente.

Al recargar la página (F5), la sesión permanece iniciada.

---

## Encabezado Dinámico

El componente Header muestra:

* Nombre del administrador
* Sector
* Botón Cerrar Sesión

Toda la información proviene directamente del Context API.

---

## Consumo de FakeStoreAPI

La aplicación obtiene los clientes mediante:

```http
GET https://fakestoreapi.com/users
```

Los datos se muestran en una tabla profesional desarrollada con Material UI.

Cada cliente presenta:

* ID
* Nombre completo
* Correo electrónico
* Teléfono
* Ciudad

---

## Buscador Dinámico

Se implementó un filtro en tiempo real que permite buscar clientes por:

* Apellido
* Ciudad

---

## Estados de la Aplicación

Durante el consumo de la API se controlan tres estados:

### Carga

Se muestra:

* CircularProgress

---

### Éxito

Renderizado de la tabla de clientes.

---

### Error

Se informa mediante:

* Alert de Material UI.

---

## Alta de Clientes

Se implementó un formulario que permite registrar nuevos clientes.

La aplicación realiza una petición:

```http
POST https://fakestoreapi.com/users
```

Se envían los datos estructurados hacia la API.

Cuando la operación finaliza correctamente:

* Se informa mediante un Alert.
* Se genera un ID local consecutivo para evitar duplicados visuales.
* El nuevo cliente aparece inmediatamente en la tabla.

---

# Rutas Implementadas

Actualmente la aplicación utiliza las siguientes rutas:

* /login
* /clientes

Además, se encuentran preparadas las rutas para futuras funcionalidades:

* /clientes/:id
* /clientes/nuevo

---

# Conclusión

---