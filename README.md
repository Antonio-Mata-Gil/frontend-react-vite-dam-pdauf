# PDAUF React Project

Proyecto React construido con **Vite**, un bundler moderno y ultra-rápido optimizado para desarrollo y producción.

## 📋 Descripción

Este es un proyecto base de React con Vite que proporciona una estructura recomendada para desarrollar aplicaciones web escalables y mantenibles.

---

## 🏗️ Estructura del Proyecto

```
pdauf_react_project/
├── src/                          # Código fuente principal
│   ├── components/              # Componentes reutilizables
│   │   ├── common/              # Componentes comunes (Header, Footer, etc.)
│   │   ├── layout/              # Componentes de layout
│   │   └── features/            # Componentes específicos de features
│   ├── pages/                   # Componentes de páginas/vistas
│   ├── hooks/                   # Hooks personalizados
│   ├── services/                # Servicios (API calls, funciones auxiliares)
│   ├── context/                 # Context API para estado global
│   ├── styles/                  # Estilos globales y variables CSS
│   ├── utils/                   # Funciones utilitarias
│   ├── assets/                  # Imágenes, iconos, fuentes
│   ├── App.jsx                  # Componente principal
│   ├── main.jsx                 # Punto de entrada de la aplicación
│   └── index.css                # Estilos globales
├── public/                       # Archivos estáticos públicos
├── index.html                    # Archivo HTML principal
├── vite.config.js               # Configuración de Vite
├── package.json                 # Dependencias y scripts
├── eslint.config.js             # Configuración de ESLint
├── .gitignore                   # Archivos ignorados por Git
└── README.md                    # Este archivo
```

---

## 📁 Directorios Importantes

### `/src` - Código Fuente
Contiene toda la lógica de la aplicación. Aquí es donde pasarás la mayor parte del tiempo desarrollando.

### `/src/components`
**Componentes reutilizables organizados por categoría:**
- **common/**: Botones, tarjetas, modales, etc.
- **layout/**: Sidebar, Navbar, Footer
- **features/**: Componentes específicos de funcionalidades

### `/src/pages`
Componentes que representan páginas completas o vistas principales de la aplicación.

### `/src/hooks`
Hooks personalizados que encapsulan lógica reutilizable (ej: useFetch, useLocalStorage).

### `/src/services`
Funciones para llamadas a APIs, autenticación, y otras operaciones de servicios.

### `/src/context`
Archivos relacionados con Context API para gestionar estado global de la aplicación.

### `/src/styles`
Estilos globales, variables CSS, y archivos de temas.

### `/src/utils`
Funciones auxiliares y utilidades generales (validaciones, formateo, etc.).

### `/src/assets`
Recursos estáticos: imágenes, iconos, fuentes personalizadas.

### `/public`
Archivos públicos que se sirven directamente sin pasar por el bundler.

---

## 🚀 Guía de Inicio Rápido

### Instalación
```bash
npm install
```

### Desarrollo
```bash
npm run dev
```
La aplicación estará disponible en `http://localhost:5173`

### Build para Producción
```bash
npm run build
```
Los archivos compilados estarán en la carpeta `dist/`

### Preview
```bash
npm run preview
```

### Linting
```bash
npm run lint
```

---

## 📦 Scripts Disponibles

| Script | Descripción |
|--------|-------------|
| `npm run dev` | Inicia servidor de desarrollo con HMR |
| `npm run build` | Compila para producción |
| `npm run preview` | Visualiza el build de producción |
| `npm run lint` | Ejecuta ESLint para validar código |

---

## 🛠️ Stack Tecnológico

- **React 19**: Librería de UI
- **Vite**: Bundler y herramienta de build
- **ESLint**: Linter para código JavaScript

---

## 📝 Convenciones de Código

### Nombres de Componentes
- Componentes en **PascalCase**: `MyComponent.jsx`
- Archivos de utilidades en **camelCase**: `myUtility.js`

### Estructura de Componentes
```jsx
export function MyComponent() {
  return (
    <div>
      {/* Contenido */}
    </div>
  );
}
```

### Organización de Imports
```jsx
// 1. React y librerías externas
import React from 'react';

// 2. Componentes locales
import Header from './components/Header';

// 3. Hooks personalizados
import useCustomHook from './hooks/useCustomHook';

// 4. Estilos
import './styles/component.css';
```

---

## 🔗 Recursos Útiles

- [Documentación de React](https://react.dev)
- [Documentación de Vite](https://vitejs.dev)
- [Guía de ESLint](https://eslint.org)

---

## 📌 Notas Importantes

- Los cambios en `src/` se reflejan automáticamente en desarrollo gracias a HMR
- Los estilos CSS pueden ser importados directamente en componentes
- Para variables de entorno, crear archivo `.env` y usarlas con `import.meta.env`

---

## 📄 Licencia

Este proyecto es de uso educativo.
