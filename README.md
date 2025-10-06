# Sistema de Gestión de Empleados - Rebuhr Challenge

## 📋 Descripción

Sistema web desarrollado con Next.js 14 para la gestión de empleados, incluyendo autenticación, CRUD completo, validaciones, tests unitarios y optimizaciones de rendimiento.

## 🚀 Instalación y Ejecución

### Prerrequisitos
- Node.js 18+ 
- npm o yarn

### Pasos de instalación

```bash
# Clonar el repositorio
git clone <repository-url>
cd FabricioAlberto-ChallengeDux

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# Construir para producción
npm run build

# Ejecutar en producción
npm start
```

### Scripts disponibles

```bash
npm run dev          # Desarrollo
npm run build        # Construcción
npm run start        # Producción
npm run lint         # Linting
npm test            # Tests unitarios
npm run test:watch  # Tests en modo watch
npm run test:coverage # Tests con cobertura
```

### Credenciales de acceso
- **Email**: `admin@rebuhr.com`
- **Contraseña**: `password123`

## 🏗️ Decisiones Técnicas Importantes

### 1. **Arquitectura Next.js 14 con App Router**
- **Decisión**: Usar App Router en lugar de Pages Router
- **Razón**: Mejor rendimiento, mejor SEO, componentes Server/Client más claros, y futuro de Next.js
- **Beneficios**: ISR nativo, mejor caching, layouts anidados

### 2. **Base de datos JSON simulada**
- **Decisión**: Usar archivo JSON (`employees.json`) con funciones de base de datos
- **Razón**: Simplicidad para el challenge, fácil de entender y modificar
- **Implementación**: `src/utils/database.ts` con operaciones CRUD asíncronas

### 3. **Autenticación con Middleware**
- **Decisión**: Implementar autenticación con Next.js Middleware y cookies
- **Razón**: Protección a nivel de servidor, mejor seguridad que localStorage
- **Flujo**: Middleware → Cookie validation → Route protection

### 4. **Validación con Zod + React Hook Form**
- **Decisión**: Combinar Zod para validación de esquemas y RHF para manejo de formularios
- **Razón**: Type safety, validación robusta, mejor DX
- **Beneficios**: Validación tanto cliente como servidor, mensajes de error consistentes

### 5. **Styling con Tailwind CSS v4 + Radix UI**
- **Decisión**: Tailwind para utilidades + Radix para componentes complejos
- **Razón**: Rapidez de desarrollo, componentes accesibles, diseño consistente
- **Beneficios**: Menos CSS custom, componentes accesibles por defecto

### 6. **ISR (Incremental Static Regeneration)**
- **Decisión**: Implementar ISR para páginas de empleados individuales
- **Razón**: Mejor rendimiento, SEO optimizado, actualizaciones automáticas
- **Implementación**: `generateStaticParams` + `revalidatePath` en Server Actions

### 7. **Server Actions para mutaciones**
- **Decisión**: Usar Server Actions en lugar de API routes para mutaciones
- **Razón**: Menos boilerplate, mejor integración con Next.js


## ✨ Features Implementadas

### 🔐 **Autenticación y Autorización**
- [x] Login con credenciales hardcodeadas
- [x] Middleware de protección de rutas
- [x] Gestión de cookies de sesión
- [x] Logout con limpieza de estado
- [x] Redirección automática basada en autenticación

### 👥 **Gestión de Empleados**
- [x] Listado paginado de empleados
- [x] Creación de nuevos empleados
- [x] Edición de empleados existentes
- [x] Eliminación de empleados
- [x] Vista detallada de empleado individual
- [x] Validaciones completas de formularios

### 🔍 **Filtros y Búsqueda**
- [x] Búsqueda por nombre completo
- [x] Filtro por sector/departamento
- [x] Filtro por país
- [x] Ordenamiento por columnas
- [x] Paginación con navegación

### 📱 **UX/UI**
- [] Diseño responsive
- [x] Estados de loading
- [x] Manejo de errores
- [x] Notificaciones toast
- [x] Confirmaciones de eliminación
- [x] Navegación intuitiva

### 🚀 **Optimizaciones**
- [x] ISR para páginas de empleados
- [x] Auto-guardado de borradores en localStorage
- [x] Recuperación de borradores al recargar
- [x] Revalidación automática tras mutaciones
- [x] Caching inteligente

### 🛠️ **Desarrollo**
- [x] TypeScript configurado
- [x] ESLint configurado
- [x] Estructura de carpetas organizada
- [x] Componentes reutilizables
- [x] Hooks personalizados

## ⏱️ Tiempo Aproximado Invertido

### **Desarrollo Total: 15 horas**


## 🤖 Uso de AI (Claude/Cursor)

### **Cómo se utilizó:**
- **Resolución de errores**
- **Optimizaciones**

### **Para qué se utilizó:**
- Generación de código TypeScript/React
- Resolución de problemas de configuración
- Optimización de rendimiento
- Mejoras de UX/UI

## 🔮 Mejoras con Más Tiempo

- [ ] **Optimistic Updates**: Actualización inmediata de UI antes de confirmación del servidor
- [ ] **Tests de integración**: Tests end-to-end con Playwright
- [ ] **Mejor manejo de errores**: Error boundaries y fallbacks
- [ ] **Loading states más granulares**: Skeleton components específicos
- [ ] **Mejor diseño responsive**

## 📁 Estructura del Proyecto

```
src/
├── app/                    # App Router de Next.js
│   ├── api/               # API routes
│   ├── employees/         # Páginas de empleados
│   ├── login/             # Página de login
│   └── actions.ts         # Server Actions
├── components/            # Componentes React
│   ├── auth/             # Componentes de autenticación
│   ├── common/           # Componentes reutilizables
│   ├── home/             # Componentes de la tabla
│   └── newEmployee/      # Componentes de formularios
├── hooks/                # Hooks personalizados
├── layouts/              # Layouts de la aplicación
├── schemas/              # Esquemas de validación Zod
├── service/              # Servicios de API
├── types/                # Tipos TypeScript
├── utils/                # Utilidades y helpers
└── data/                 # Datos JSON simulados
```

## 🚀 Despliegue

### **Vercel (Recomendado)**
```bash
npm run build
# Conectar con Vercel y desplegar
```

### **Docker**
```bash
docker build -t empleados-app .
docker run -p 3000:3000 empleados-app
```

---
