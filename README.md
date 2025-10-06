# Sistema de Gestión de Empleados - Rebuhr Challenge

## 📋 Descripción

Sistema web desarrollado con Next.js 14 para la gestión de empleados, incluyendo autenticación, CRUD completo, validaciones, tests unitarios, optimizaciones de rendimiento y manejo avanzado de cache para producción en Vercel.

🌐 **Demo en vivo**: [https://fabricio-alberto-rebu.vercel.app/](https://fabricio-alberto-rebu.vercel.app/)

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
```

### Credenciales de acceso
- **Email**: `admin@rebuhr.com`
- **Contraseña**: `password123`

### Demo en vivo
🌐 **[https://fabricio-alberto-rebu.vercel.app/](https://fabricio-alberto-rebu.vercel.app/)**

## 🏗️ Decisiones Técnicas Importantes

### 1. **Arquitectura Next.js 14 con App Router**
- **Decisión**: Usar App Router en lugar de Pages Router
- **Razón**: Mejor rendimiento, mejor SEO, componentes Server/Client más claros, y futuro de Next.js
- **Beneficios**: ISR nativo, mejor caching, layouts anidados

### 2. **Evolución del Sistema de Datos**
- **Inicio**: Archivo JSON (`employees.json`) que se modificaba directamente simulando una base de datos
- **Problema**: Vercel y la mayoría de plataformas de hosting no permiten modificar archivos directamente en producción
- **Solución**: Migración a variable en memoria (`employeesCache`) en `src/utils/database.ts`
- **Implementación**: 
  - Variable `employeesCache` que persiste durante la sesión del servidor
  - Operaciones CRUD asíncronas que modifican la variable en memoria
  - Datos iniciales cargados desde `employeesMock` al iniciar la aplicación
  - Simulación de delay de API para realismo

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

### 6. **Renderizado Dinámico (No ISR/SSG)**
- **Decisión**: Usar renderizado dinámico en lugar de ISR/SSG
- **Razón**: Los datos en memoria son inherentemente dinámicos y no compatibles con generación estática

### 7. **Server Actions para mutaciones**
- **Decisión**: Usar Server Actions en lugar de API routes para mutaciones
- **Razón**: Menos boilerplate, mejor integración con Next.js

### 8. **Manejo de Cache para Producción en Vercel**
- **Decisión**: Implementar sistema de cache específico para resolver problemas de generación estática
- **Razón**: Las páginas estáticas en Vercel se generan en build time, causando inconsistencias con datos dinámicos
- **Implementación**: 
  - Uso de `apiRebu` para consistencia entre páginas

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
- [x] Diseño responsive con Tailwind CSS v4
- [x] Estados de loading con skeletons
- [x] Manejo de errores con páginas 404 personalizadas
- [x] Notificaciones toast con contexto
- [x] Confirmaciones de eliminación con diálogos
- [x] Navegación intuitiva con breadcrumbs
- [x] Componentes accesibles con Radix UI

### 🚀 **Optimizaciones**
- [x] Auto-guardado de borradores en localStorage
- [x] Recuperación de borradores al recargar
- [x] Caching inteligente con `unstable_cache`
- [x] Renderizado dinámico para datos en tiempo real
- [x] Optimización específica para Vercel

### 🛠️ **Desarrollo**
- [x] TypeScript configurado con tipos estrictos
- [x] ESLint configurado con reglas de Next.js
- [x] Estructura de carpetas organizada y escalable
- [x] Componentes reutilizables y modulares
- [x] Hooks personalizados para lógica compartida
- [x] Tests unitarios con Jest
- [x] Configuración de PostCSS para Tailwind

## ⏱️ Tiempo Aproximado Invertido

### **Desarrollo Total: 18 horas**
- **Desarrollo inicial**: 15 horas
- **Optimizaciones y solución de problemas de Vercel**: 3 horas

## 🤖 Uso de AI (Claude/Cursor)

### **Cómo se utilizó:**
- **Resolución de errores** y debugging
- **Optimizaciones** de rendimiento
- **Solución de problemas específicos de Vercel**
- **Implementación de sistemas de cache**

### **Para qué se utilizó:**
- Generación de código TypeScript/React
- Resolución de problemas de configuración
- Optimización de rendimiento y cache
- Mejoras de UX/UI
- Implementación de mejores prácticas de Next.js
- Solución de problemas de generación estática en producción

## 🔮 Mejoras con Más Tiempo

- [ ] **Optimistic Updates**: Actualización inmediata de UI antes de confirmación del servidor
- [ ] **Tests de integración**: Tests end-to-end con Playwright
- [ ] **Mejor manejo de errores**: Error boundaries y fallbacks más robustos
- [ ] **Loading states más granulares**: Skeleton components específicos por sección
- [ ] **Mejor diseño responsive**: Optimización para tablets y móviles
- [ ] **Sistema de cache más avanzado**: Implementación con Redis o similar
- [ ] **SSG (Static Site Generation)**: Actualmente la información se maneja directamente de una variable en memoria, lo cual presenta desafíos para la generación estática. El SSG se intentó implementar pero siempre quedaba fallando algo debido a:
  - Inconsistencias entre datos estáticos y dinámicos
  - Problemas de cache con `generateStaticParams`
  - Dependencia de datos en tiempo real
  - **Solución ideal**: Con un backend externo y endpoints estables sería mucho más sencillo y factible implementar SSG correctamente