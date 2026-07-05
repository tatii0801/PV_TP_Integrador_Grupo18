# PV_TP_Integrador_Grupo18

## Trabajo Práctico Integrador - Programación Visual

Aplicación Web desarrollada con **React + Vite** para la administración de clientes, aplicando los conceptos trabajados durante la cursada de Programación Visual.

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

# Tecnologías Utilizadas

- React
- Vite
- JavaScript
- React Router DOM
- Material UI
- Context API
- LocalStorage
- Fetch API
- FakeStoreAPI
- CSS
- Git
- GitHub

---

# Hooks Utilizados

- useState
- useEffect
- useContext
- useMemo

---

# Estructura del Proyecto

```
src/
│
├── components/
│   ├── common/
│   │   └── FormularioAltaCliente.jsx
│   │
│   └── layout/
│       ├── Header.jsx
│       ├── Nav.jsx
│       └── Footer.jsx
│
├── context/
│   └── AdminContext.jsx
│
├── views/
│   ├── Login.jsx
│   ├── Dashboard.jsx
│   ├── ListaClientes.jsx
│   └── DetalleCliente.jsx
│
├── css/
│   └── style.css
│
├── App.jsx
└── main.jsx
```

---

# Objetivo

Desarrollar una aplicación SPA para la gestión de clientes consumiendo una API REST, aplicando los contenidos vistos durante la cursada:

- Componentes
- JSX
- Hooks
- React Router
- Context API
- LocalStorage
- Material UI
- Consumo de APIs
- Manejo de estados
- Diseño Responsive

---

# Funcionalidades Implementadas

## Inicio de Sesión

Se desarrolló un sistema de autenticación utilizando Context API.

Permite:

- Iniciar sesión
- Seleccionar sector
- Mantener la sesión mediante LocalStorage
- Cerrar sesión

---

## Protección de Rutas

Se implementaron rutas protegidas utilizando React Router.

Las vistas sólo pueden visualizarse si existe un administrador autenticado.

---

## Dashboard

Se desarrolló un panel de estadísticas que muestra:

- Total de clientes
- Total de ciudades
- Total de correos electrónicos
- Total de teléfonos

Además incorpora gráficos desarrollados con Recharts:

- Gráfico de barras
- Gráfico circular
- Gráfico de líneas
- Gráfico de áreas

---

## Gestión de Clientes

La aplicación permite visualizar la lista completa de clientes obtenidos desde FakeStoreAPI.

Cada tarjeta muestra:

- Nombre
- Email
- Teléfono
- Ciudad

También permite acceder a la ficha completa del cliente.

---

## Buscador

Se implementó un buscador dinámico utilizando useMemo.

Permite buscar clientes por:

- Apellido
- Ciudad

El filtrado se realiza en tiempo real.

---

## Alta de Clientes

Se desarrolló un formulario completo para registrar nuevos clientes.

Incluye validaciones para:

- Nombre
- Apellido
- Correo electrónico
- Teléfono
- Ciudad

También verifica que no existan clientes con:

- Correo repetido
- Teléfono repetido

Si el registro es correcto:

- Realiza un POST a FakeStoreAPI.
- Genera un ID local consecutivo.
- Guarda el cliente en LocalStorage.
- Actualiza automáticamente la lista de clientes.

---

## Detalle del Cliente

Cada cliente posee una vista individual que muestra:

- Datos personales
- Información de contacto
- Dirección completa
- Usuario
- Contraseña

---

## Eliminación de Clientes

Los administradores del sector **Gerencia** pueden eliminar clientes.

Al eliminar:

- Se realiza un DELETE a FakeStoreAPI.
- Se registra el ID en LocalStorage.
- El cliente deja de visualizarse en la aplicación.

---

## Estado Global

Se implementó Context API para administrar:

- Nombre del administrador
- Sector
- Inicio de sesión
- Cierre de sesión

---

## Persistencia

Se utiliza LocalStorage para almacenar:

- Administrador autenticado
- Clientes creados
- Clientes eliminados
- Último ID generado

La sesión permanece activa incluso al recargar la página.

---

## Navegación

La aplicación cuenta con:

- Header dinámico
- Barra de navegación
- Footer
- Cambio de título según la vista activa

---

## Modo Oscuro

Se implementó un sistema de cambio de tema.

Permite alternar entre:

- Tema Claro
- Tema Oscuro

El cambio afecta a:

- Header
- Cards
- Formularios
- Tablas
- Footer
- Componentes Material UI

---

# Consumo de API

API utilizada:

https://fakestoreapi.com/users

Operaciones implementadas:

- GET
- POST
- DELETE

---

# Rutas

- /login
- /dashboard
- /clientes
- /clientes/:id

---

# Comandos

## Crear proyecto

```bash
npm create vite@latest
```

## Instalar dependencias

```bash
npm install
```

## React Router

```bash
npm install react-router-dom
```

## Material UI

```bash
npm install @mui/material @emotion/react @emotion/styled
```

## Recharts

```bash
npm install recharts
```

## Ejecutar proyecto

```bash
npm run dev
```

---

# Características del Proyecto

- SPA desarrollada con React.
- Arquitectura basada en componentes.
- Navegación mediante React Router.
- Gestión de estado global con Context API.
- Persistencia utilizando LocalStorage.
- Consumo de API REST mediante Fetch.
- Validaciones completas de formularios.
- Diseño responsive.
- Interfaz desarrollada con Material UI.
- Dashboard con gráficos estadísticos.
- Modo oscuro.
- Gestión de clientes mediante operaciones CRUD parciales.

---

# Conclusión

Este proyecto permitió integrar los principales contenidos desarrollados durante la materia Programación Visual mediante la construcción de una aplicación web completa utilizando React, Vite, React Router, Context API, Material UI y consumo de APIs REST. Durante el desarrollo se aplicaron conceptos de componentes, manejo de estado, persistencia de datos, navegación, validaciones, diseño responsive y trabajo colaborativo con Git y GitHub.