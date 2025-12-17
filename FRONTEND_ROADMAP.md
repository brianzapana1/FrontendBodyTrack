# 🎨 BodyTrack Frontend - Roadmap de Desarrollo

Este documento proporciona una guía completa para desarrollar el frontend de BodyTrack basándose en el backend existente.

---

## 📊 Análisis del Backend

### Tecnologías Backend
- **Framework**: Node.js + Express
- **ORM**: Prisma
- **Base de datos**: PostgreSQL
- **Autenticación**: JWT (Bearer token)
- **Upload de archivos**: Multer (imágenes hasta 5MB)
- **API**: RESTful
- **URL base**: `http://localhost:4000`

### Sistema de Roles y Permisos

#### 3 Roles de Usuario:
1. **CLIENTE** - Usuario final del gimnasio
   - Puede ver su perfil y progreso
   - Accede a su rutina asignada
   - Participa en el foro
   - Gestiona su suscripción

2. **ENTRENADOR** - Personal trainer
   - Gestiona clientes asignados
   - Crea y administra rutinas
   - Crea ejercicios
   - Ve estadísticas de clientes
   - Acceso completo al foro

3. **ADMIN** - Administrador del sistema
   - Acceso completo a todos los recursos
   - Gestión de usuarios
   - Estadísticas del sistema
   - Verificación de suscripciones

### Modelos de Datos Principales

```typescript
// Usuario (autenticación)
interface Usuario {
  id: string
  email: string
  password: string // hash
  rol: 'CLIENTE' | 'ENTRENADOR' | 'ADMIN'
  activo: boolean
  createdAt: Date
  updatedAt: Date
  cliente?: Cliente
  entrenador?: Entrenador
}

// Perfil de Cliente
interface Cliente {
  id: string
  usuarioId: string
  dni: string
  nombres: string
  apellidos: string
  telefono?: string
  fechaNacimiento?: Date
  genero?: 'M' | 'F' | 'Otro'
  direccion?: string
  plan: 'BASICO' | 'PREMIUM' | 'PRO'
  fechaRegistro: Date
}

// Perfil de Entrenador
interface Entrenador {
  id: string
  usuarioId: string
  nombres: string
  apellidos: string
  especialidad?: string
  certificaciones?: string
  telefono?: string
  bio?: string
  fechaRegistro: Date
}

// Registro de Progreso
interface RegistroProgreso {
  id: string
  clienteId: string
  fecha: Date
  peso?: number
  porcentajeGrasa?: number
  medidaPecho?: number
  medidaCintura?: number
  medidaCadera?: number
  medidaBrazo?: number
  medidaPierna?: number
  fotos: string[] // URLs o paths
  notas?: string
}

// Ejercicio
interface Ejercicio {
  id: string
  nombre: string
  descripcion?: string
  grupoMuscular: string // "Pecho", "Espalda", "Piernas", etc.
  equipamiento?: string // "Mancuernas", "Barra", "Máquina", etc.
  videoUrl?: string
  imagenUrl?: string
  createdAt: Date
}

// Rutina
interface Rutina {
  id: string
  entrenadorId: string
  nombre: string
  descripcion?: string
  objetivo?: string // "Hipertrofia", "Pérdida de peso", "Fuerza"
  duracionSemanas?: number
  createdAt: Date
  ejercicios: RutinaEjercicio[]
}

// Ejercicio dentro de Rutina
interface RutinaEjercicio {
  id: string
  rutinaId: string
  ejercicioId: string
  orden: number
  dia: number // 1-7 (Lunes-Domingo) o 0 para cualquier día
  series: number
  repeticiones: string // "12", "10-12", "al fallo"
  descansoSeg?: number
  notas?: string
  ejercicio: Ejercicio
}

// Asignación de Rutina a Cliente
interface AsignacionRutina {
  id: string
  clienteId: string
  rutinaId: string
  entrenadorId: string
  fechaInicio: Date
  fechaFin?: Date
  activa: boolean
  rutina: Rutina
}

// Post del Foro
interface ForoPost {
  id: string
  usuarioId: string
  titulo: string
  contenido: string
  createdAt: Date
  updatedAt: Date
  usuario: Usuario
  comentarios: ForoComentario[]
}

// Comentario del Foro
interface ForoComentario {
  id: string
  postId: string
  usuarioId: string
  contenido: string
  createdAt: Date
  usuario: Usuario
}

// Suscripción
interface Suscripcion {
  id: string
  clienteId: string
  plan: 'FREE' | 'PREMIUM' // FREE = BASICO (default), PREMIUM = paid tier
  estado: 'ACTIVA' | 'CANCELADA' | 'EXPIRADA'
  fechaInicio: Date
  fechaFin: Date
  monto: number
  metodoPago?: string
}

// 🎯 SUBSCRIPTION STRATEGY
// 
// FREE TIER (Default on registration):
// - View-only exercise catalog
// - Access to 3-5 generic/pre-made routines
// - Limited progress tracking (last 3 months only)
// - Forum access (read-only or limited)
// - No trainer assignment
// - No personalized routines
//
// PREMIUM TIER (Paid monthly subscription):
// - Everything in FREE
// - 1 dedicated trainer assignment
// - Personalized routines from trainer
// - Unlimited progress tracking (full history)
// - Trainer feedback & communication
// - Full forum access
// - Priority support
```

---

## 🔐 API Endpoints Completa

### Autenticación (`/api/auth`)

| Método | Endpoint | Descripción | Auth | Rol |
|--------|----------|-------------|------|-----|
| POST | `/registro/cliente` | Registrar nuevo cliente | ❌ | - |
| POST | `/registro/entrenador` | Registrar nuevo entrenador | ❌ | - |
| POST | `/login` | Iniciar sesión | ❌ | - |
| GET | `/perfil` | Obtener perfil del usuario autenticado | ✅ | Todos |
| POST | `/cambiar-password` | Cambiar contraseña | ✅ | Todos |

**Ejemplo de Registro Cliente:**
```json
POST /api/auth/registro/cliente
{
  "email": "cliente@ejemplo.com",
  "password": "123456",
  "dni": "12345678",
  "nombres": "Juan",
  "apellidos": "Pérez",
  "telefono": "70123456"
}

Response: {
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "usuario": { ... }
}
```

**Ejemplo de Login:**
```json
POST /api/auth/login
{
  "email": "cliente@ejemplo.com",
  "password": "123456"
}

Response: {
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "usuario": { ... }
}
```

### Clientes (`/api/clientes`)

| Método | Endpoint | Descripción | Auth | Rol |
|--------|----------|-------------|------|-----|
| GET | `/` | Listar todos los clientes | ✅ | ENTRENADOR, ADMIN |
| GET | `/:id` | Ver detalle de un cliente | ✅ | Todos |
| PUT | `/:id` | Actualizar perfil de cliente | ✅ | Todos |
| DELETE | `/:id` | Eliminar cliente | ✅ | ADMIN |

### Entrenadores (`/api/entrenadores`)

| Método | Endpoint | Descripción | Auth | Rol |
|--------|----------|-------------|------|-----|
| GET | `/` | Listar todos los entrenadores | ✅ | Todos |
| GET | `/:id` | Ver detalle de un entrenador | ✅ | Todos |
| PUT | `/:id` | Actualizar perfil de entrenador | ✅ | ENTRENADOR, ADMIN |
| GET | `/:id/clientes` | Obtener clientes asignados | ✅ | ENTRENADOR, ADMIN |
| GET | `/:id/estadisticas` | Ver estadísticas del entrenador | ✅ | Todos |

### Progreso (`/api/progreso`)

| Método | Endpoint | Descripción | Auth | Rol |
|--------|----------|-------------|------|-----|
| GET | `/cliente/:clienteId` | Historial de progreso de un cliente | ✅ | Todos |
| GET | `/cliente/:clienteId/estadisticas` | Estadísticas de progreso | ✅ | Todos |
| GET | `/:id` | Ver registro específico | ✅ | Todos |
| POST | `/` | Crear registro de progreso (con fotos) | ✅ | Todos |
| PUT | `/:id` | Actualizar registro | ✅ | Todos |
| DELETE | `/:id` | Eliminar registro | ✅ | Todos |

**Nota:** El endpoint POST y PUT acepta `multipart/form-data` con hasta 5 imágenes en el campo `fotos`.

### Ejercicios (`/api/ejercicios`)

| Método | Endpoint | Descripción | Auth | Rol |
|--------|----------|-------------|------|-----|
| GET | `/` | Listar ejercicios (con filtros) | ✅ | Todos |
| GET | `/grupos-musculares` | Obtener grupos musculares disponibles | ✅ | Todos |
| GET | `/:id` | Ver detalle de ejercicio | ✅ | Todos |
| POST | `/` | Crear nuevo ejercicio | ✅ | ENTRENADOR, ADMIN |
| PUT | `/:id` | Actualizar ejercicio | ✅ | ENTRENADOR, ADMIN |
| DELETE | `/:id` | Eliminar ejercicio | ✅ | ENTRENADOR, ADMIN |

**Filtros disponibles en GET:**
- `grupoMuscular` - Filtrar por grupo muscular
- `equipamiento` - Filtrar por equipamiento

### Rutinas (`/api/rutinas`)

| Método | Endpoint | Descripción | Auth | Rol |
|--------|----------|-------------|------|-----|
| GET | `/` | Listar rutinas | ✅ | Todos |
| GET | `/mi-rutina` | Obtener rutina activa del cliente | ✅ | CLIENTE |
| GET | `/:id` | Ver detalle de rutina | ✅ | Todos |
| POST | `/` | Crear nueva rutina | ✅ | ENTRENADOR, ADMIN |
| PUT | `/:id` | Actualizar rutina | ✅ | ENTRENADOR, ADMIN |
| DELETE | `/:id` | Eliminar rutina | ✅ | ENTRENADOR, ADMIN |
| POST | `/:id/ejercicios` | Agregar ejercicio a rutina | ✅ | ENTRENADOR, ADMIN |
| PUT | `/ejercicios/:ejercicioId` | Actualizar ejercicio en rutina | ✅ | ENTRENADOR, ADMIN |
| DELETE | `/ejercicios/:ejercicioId` | Quitar ejercicio de rutina | ✅ | ENTRENADOR, ADMIN |
| POST | `/:id/asignar` | Asignar rutina a cliente | ✅ | ENTRENADOR, ADMIN |
| DELETE | `/asignaciones/:id` | Desactivar asignación | ✅ | ENTRENADOR, ADMIN |

### Foro (`/api/foro`)

| Método | Endpoint | Descripción | Auth | Rol |
|--------|----------|-------------|------|-----|
| GET | `/posts` | Listar posts del foro | ✅ | Todos |
| GET | `/posts/:id` | Ver post con comentarios | ✅ | Todos |
| POST | `/posts` | Crear post | ✅ | Todos |
| PUT | `/posts/:id` | Actualizar post (solo autor/admin) | ✅ | Todos |
| DELETE | `/posts/:id` | Eliminar post (solo autor/admin) | ✅ | Todos |
| POST | `/posts/:id/comentarios` | Comentar en un post | ✅ | Todos |
| PUT | `/comentarios/:id` | Actualizar comentario (solo autor/admin) | ✅ | Todos |
| DELETE | `/comentarios/:id` | Eliminar comentario (solo autor/admin) | ✅ | Todos |

### Suscripciones (`/api/suscripciones`)

| Método | Endpoint | Descripción | Auth | Rol |
|--------|----------|-------------|------|-----|
| GET | `/cliente/:clienteId` | Historial de suscripciones | ✅ | Todos |
| GET | `/cliente/:clienteId/activa` | Obtener suscripción activa | ✅ | Todos |
| GET | `/estadisticas` | Estadísticas de ingresos | ✅ | ADMIN |
| GET | `/:id` | Ver detalle de suscripción | ✅ | Todos |
| POST | `/` | Crear suscripción | ✅ | Todos |
| POST | `/:id/cancelar` | Cancelar suscripción | ✅ | Todos |
| POST | `/verificar-expiradas` | Verificar y actualizar expiradas | ✅ | ADMIN |

---

## 🏗️ Arquitectura Frontend Recomendada

### Stack Tecnológico Sugerido

**Opción 1: React + Vite (Recomendado)**
```
- React 18+
- Vite (build tool)
- React Router v6 (navegación)
- TanStack Query (React Query) - manejo de estado del servidor
- Zustand o Context API - estado global
- Axios - peticiones HTTP
- React Hook Form + Zod - formularios y validación
- Tailwind CSS + shadcn/ui - UI components
- date-fns - manejo de fechas
- recharts - gráficos de progreso
```

**Opción 2: Next.js 14+ (App Router)**
```
- Next.js 14+ (SSR/SSG capabilities)
- Next Auth (si se necesita SSR auth)
- TanStack Query
- Zustand
- React Hook Form + Zod
- Tailwind CSS + shadcn/ui
- date-fns
- recharts
```

### Estructura de Carpetas Propuesta

```
frontend/
├── src/
│   ├── api/                    # Cliente API y configuración
│   │   ├── axios.js           # Instancia configurada de Axios
│   │   └── endpoints/         # Endpoints organizados por módulo
│   │       ├── auth.js
│   │       ├── clientes.js
│   │       ├── entrenadores.js
│   │       ├── progreso.js
│   │       ├── ejercicios.js
│   │       ├── rutinas.js
│   │       ├── foro.js
│   │       └── suscripciones.js
│   ├── components/            # Componentes reutilizables
│   │   ├── ui/               # Componentes base (buttons, inputs, etc)
│   │   ├── layout/           # Layout components (Navbar, Sidebar, Footer)
│   │   ├── auth/             # Componentes de autenticación
│   │   ├── clientes/         # Componentes específicos de clientes
│   │   ├── entrenadores/     # Componentes de entrenadores
│   │   ├── progreso/         # Componentes de progreso
│   │   ├── ejercicios/       # Componentes de ejercicios
│   │   ├── rutinas/          # Componentes de rutinas
│   │   ├── foro/             # Componentes del foro
│   │   └── suscripciones/    # Componentes de suscripciones
│   ├── hooks/                # Custom React hooks
│   │   ├── useAuth.js
│   │   ├── useClientes.js
│   │   ├── useProgreso.js
│   │   └── ...
│   ├── pages/                # Páginas principales (si usas React Router)
│   │   ├── auth/
│   │   │   ├── Login.jsx
│   │   │   ├── RegisterCliente.jsx
│   │   │   └── RegisterEntrenador.jsx
│   │   ├── dashboard/
│   │   │   ├── DashboardCliente.jsx
│   │   │   ├── DashboardEntrenador.jsx
│   │   │   └── DashboardAdmin.jsx
│   │   ├── perfil/
│   │   ├── progreso/
│   │   ├── rutinas/
│   │   ├── ejercicios/
│   │   ├── foro/
│   │   └── suscripciones/
│   ├── store/                # Estado global (Zustand)
│   │   ├── authStore.js
│   │   └── uiStore.js
│   ├── utils/                # Utilidades y helpers
│   │   ├── constants.js
│   │   ├── validators.js
│   │   └── formatters.js
│   ├── routes/               # Configuración de rutas
│   │   ├── index.jsx
│   │   ├── ProtectedRoute.jsx
│   │   └── RoleRoute.jsx
│   ├── types/                # TypeScript types (si usas TS)
│   │   └── index.ts
│   ├── App.jsx
│   └── main.jsx
├── public/
├── package.json
└── vite.config.js (o next.config.js)
```

---

## 📝 Roadmap de Desarrollo por Fases

### **FASE 1: Setup y Autenticación (Semana 1)**

#### Tareas:
1. **Configurar proyecto**
   - Crear proyecto con Vite/Next.js
   - Instalar dependencias
   - Configurar Tailwind CSS
   - Configurar variables de entorno (`.env`)

2. **API Client Setup**
   - Configurar Axios con interceptores
   - Agregar manejo de token JWT
   - Crear funciones base para endpoints de auth

3. **Sistema de Autenticación**
   - Crear store de autenticación (Zustand/Context)
   - Implementar login/registro
   - Sistema de protección de rutas
   - Refresh token (si aplica)
   - Persistencia de sesión (localStorage)

4. **Páginas de Auth**
   - Login page
   - Registro cliente
   - Registro entrenador
   - Recuperar contraseña (si backend lo soporta)

5. **Layout Base**
   - Navbar con usuario logueado
   - Sidebar de navegación
   - Footer
   - Loading states
   - Error boundaries

#### Entregables:
- ✅ Usuario puede registrarse como cliente o entrenador
- ✅ Usuario puede hacer login
- ✅ Token se guarda y se envía en peticiones
- ✅ Rutas protegidas funcionando
- ✅ Layout base responsive

---

### **FASE 2: Dashboard y Perfiles (Semana 2)**

#### Tareas:
1. **Dashboard por Rol**
   - Dashboard Cliente: resumen de progreso, rutina activa, próximas sesiones
   - Dashboard Entrenador: clientes asignados, estadísticas
   - Dashboard Admin: estadísticas del sistema

2. **Perfiles**
   - Ver perfil del usuario
   - Editar perfil
   - Cambiar contraseña
   - Upload de foto de perfil (si aplica)

3. **API Hooks**
   - `useAuth()` - manejo de autenticación
   - `useClientes()` - CRUD de clientes
   - `useEntrenadores()` - CRUD de entrenadores

#### Entregables:
- ✅ Dashboards diferenciados por rol
- ✅ Usuario puede ver y editar su perfil
- ✅ Sistema de navegación funcional

---

### **FASE 3: Gestión de Progreso (Semana 3)**

#### Tareas:
1. **Registro de Progreso**
   - Formulario para crear registro de progreso
   - Upload de fotos (hasta 5)
   - Campos: peso, % grasa, medidas corporales, notas

2. **Historial de Progreso**
   - Lista de registros con filtros
   - Ver detalle de registro
   - Editar/eliminar registros

3. **Visualización de Datos**
   - Gráficas de evolución (peso, % grasa)
   - Comparación de fotos (antes/después)
   - Exportar datos (PDF/CSV)

4. **API Hooks**
   - `useProgreso()` - CRUD de progreso
   - `useProgresoStats()` - estadísticas

#### Entregables:
- ✅ Cliente puede registrar su progreso con fotos
- ✅ Visualización de evolución con gráficas
- ✅ Historial completo de progreso

---

### **FASE 4: Ejercicios y Catálogo (Semana 4)**

#### Tareas:
1. **Catálogo de Ejercicios**
   - Lista de ejercicios con filtros (grupo muscular, equipamiento)
   - Buscador
   - Cards con imagen/video preview
   - Vista detalle de ejercicio

2. **CRUD de Ejercicios (Entrenador/Admin)**
   - Formulario crear ejercicio
   - Editar ejercicio
   - Eliminar ejercicio
   - Upload de video/imagen

3. **API Hooks**
   - `useEjercicios()` - CRUD de ejercicios
   - `useGruposMusculares()` - obtener grupos musculares

#### Entregables:
- ✅ Catálogo de ejercicios funcional con filtros
- ✅ Entrenadores pueden crear/editar ejercicios
- ✅ Vista detalle con video e instrucciones

---

### **FASE 5: Rutinas (Semana 5-6)**

#### Tareas:
1. **Listado de Rutinas**
   - Ver rutinas disponibles
   - Filtrar por objetivo, duración
   - Vista detalle de rutina

2. **Crear/Editar Rutina (Entrenador)**
   - Formulario crear rutina
   - Agregar ejercicios a la rutina
   - Configurar día, series, reps, descanso
   - Reordenar ejercicios (drag & drop)

3. **Asignar Rutinas**
   - Asignar rutina a cliente
   - Ver clientes con rutina asignada
   - Desactivar asignación

4. **Mi Rutina (Cliente)**
   - Ver rutina activa
   - Desglose por día de la semana
   - Marcar ejercicios como completados (frontend only)
   - Ver videos de ejercicios

5. **API Hooks**
   - `useRutinas()` - CRUD de rutinas
   - `useMiRutina()` - rutina del cliente
   - `useAsignaciones()` - asignaciones de rutinas

#### Entregables:
- ✅ Entrenador puede crear y editar rutinas
- ✅ Entrenador puede asignar rutinas a clientes
- ✅ Cliente puede ver su rutina semanal
- ✅ Interfaz intuitiva con drag & drop

---

### **FASE 6: Subscriptions & Access Control (Semana 7-8)** 🆕

> **Business Model Implementation**: FREE tier (default) vs PREMIUM tier (paid)

#### 📋 Subscription Strategy:

**FREE Tier (Default on registration):**
- ✅ View-only exercise catalog
- ✅ Access to 3-5 generic/pre-made routines (templates)
- ✅ Limited progress tracking (last 3 months only)
- ✅ Forum access (read-only or limited posting)
- ❌ No trainer assignment
- ❌ No personalized routines

**PREMIUM Tier (Paid monthly subscription):**
- ✅ Everything in FREE
- ✅ 1 dedicated trainer assignment
- ✅ Personalized routines created by trainer
- ✅ Unlimited progress tracking (full history)
- ✅ Trainer feedback & communication
- ✅ Full forum access
- ✅ Priority support

#### Tareas:

**6.1 Backend Updates:**
1. Update Prisma schema:
   - Change `plan` enum to `'FREE' | 'PREMIUM'` (remove BASICO/PRO)
   - Add `esGenerica: boolean` to Rutina model
   - Add `limiteFechaProgreso` to Cliente model (optional)

2. Seed generic routines:
   - Create 3-5 pre-made routines marked as `esGenerica: true`
   - Beginner, Intermediate, Advanced templates
   - Assign to categories (Hipertrofia, Pérdida de peso, Fuerza)

3. Update middleware:
   - `requirePremium()` - Check if user has active PREMIUM subscription
   - `checkRutinaAccess()` - FREE users can only see generic routines

**6.2 Frontend - Subscription Pages:**
1. **Planes de Suscripción** (`/planes`)
   - Show FREE vs PREMIUM comparison
   - Feature checklist for each tier
   - "Upgrade to Premium" CTA
   - Pricing display

2. **Payment Flow** (`/checkout`)
   - Payment form (Stripe/MercadoPago integration or simulated)
   - Confirmation page
   - Success/error handling

3. **Mi Suscripción** (`/mi-suscripcion`)
   - Current plan display
   - Subscription status (active/expired)
   - Upgrade/downgrade options
   - Cancel subscription
   - Payment history

**6.3 Frontend - Access Control:**
1. **Rutinas Access Logic:**
   - FREE users: Show only generic routines in `/rutinas`
   - FREE users: In `/mi-rutina` show upgrade message if no generic routine assigned
   - PREMIUM users: Show all routines (generic + personalized)
   - Add "🔒 Premium Feature" badges

2. **Progress Tracking Limits:**
   - FREE: Filter progress data to last 3 months
   - PREMIUM: Show full history
   - Add upgrade prompt in progress page for FREE users

3. **Trainer Assignment:**
   - Only PREMIUM users can be assigned to trainers
   - Trainer selection flow after subscription upgrade
   - Trainer can only create personalized routines for PREMIUM clients

**6.4 Admin Tools:**
1. **Subscription Management:**
   - View all subscriptions
   - Filter by status (active/expired/cancelled)
   - Manually activate/deactivate
   - Revenue statistics

2. **Generic Routines Management:**
   - Mark routines as generic
   - Assign difficulty levels
   - Preview as client would see

#### API Endpoints to Implement/Update:
```javascript
// Subscriptions
GET    /api/suscripciones/planes          // Get available plans (FREE/PREMIUM)
GET    /api/suscripciones/mi-suscripcion  // Get current user subscription
POST   /api/suscripciones/contratar       // Create new subscription (upgrade)
POST   /api/suscripciones/cancelar        // Cancel subscription
GET    /api/suscripciones/historial       // Payment history

// Rutinas with access control
GET    /api/rutinas?esGenerica=true       // Get only generic routines (FREE users)
GET    /api/rutinas/genericas             // Dedicated endpoint for generic routines

// Admin
GET    /api/admin/suscripciones           // All subscriptions
GET    /api/admin/revenue                 // Revenue stats
```

#### Components to Create:
```javascript
// Subscription components
- <PlanesComparison />          // FREE vs PREMIUM table
- <UpgradePrompt />             // CTA to upgrade
- <SuscripcionCard />           // Current subscription info
- <PaymentForm />               // Payment checkout
- <PremiumBadge />              // 🔒 indicator

// Access control
- <RequirePremium />            // Wrapper component
- <FeatureLockedMessage />      // Upgrade prompt for locked features
```

#### Entregables:
- ✅ Subscription system fully implemented
- ✅ FREE users have limited but functional experience
- ✅ PREMIUM users get full personalized training
- ✅ Payment flow working (simulated or real)
- ✅ Access control enforced on both frontend & backend
- ✅ Generic routines catalog available for FREE users
- ✅ Progress tracking date limits for FREE tier

---

### **FASE 7: Foro Comunitario (Semana 9)**

#### Tareas:
1. **Feed de Posts**
   - Lista de posts del foro
   - Infinite scroll o paginación
   - Preview de contenido
   - Filter by user tier (FREE users limited posts?)

2. **Crear/Editar Post**
   - Formulario crear post
   - Editor de texto enriquecido (opcional)
   - Editar/eliminar propio post
   - Admin puede eliminar cualquier post
   - FREE users: Limited to 5 posts per month (optional restriction)

3. **Comentarios**
   - Ver comentarios de un post
   - Agregar comentario
   - Editar/eliminar propio comentario
   - Respuestas anidadas (opcional)

4. **API Hooks**
   - `useForoPosts()` - CRUD de posts
   - `useForoComentarios()` - CRUD de comentarios

#### Entregables:
- ✅ Feed de posts funcional
- ✅ Usuarios pueden crear posts y comentarios
- ✅ Sistema de permisos (editar/eliminar)
- ✅ Subscription-based limits (if applicable)

---

### **FASE 8: Panel de Entrenadores (Semana 10)**

### **FASE 8: Panel de Entrenadores (Semana 10)**

#### Tareas:
1. **Gestión de Clientes**
   - Lista de clientes asignados (only PREMIUM clients)
   - Ver progreso de cada cliente
   - Ver rutina asignada
   - Asignar nueva rutina (personalized, not generic)

2. **Estadísticas del Entrenador**
   - Total de clientes PREMIUM
   - Rutinas personalizadas creadas
   - Clientes activos vs inactivos

3. **Comunicación (opcional)**
   - Chat con clientes (si backend lo soporta)
   - Notificaciones de nuevos registros de progreso

4. **Client Assignment Flow:**
   - PREMIUM clients can select/request a trainer
   - Trainer accepts/rejects client requests
   - Once assigned, trainer can create personalized routines

#### Entregables:
- ✅ Entrenador puede gestionar clientes PREMIUM
- ✅ Vista de estadísticas funcional
- ✅ Routine assignment flow working

---

### **FASE 9: Panel de Admin (Semana 11)**

### **FASE 9: Panel de Admin (Semana 11)**

#### Tareas:
1. **Gestión de Usuarios**
   - Listar todos los usuarios
   - Activar/desactivar usuarios
   - Eliminar usuarios
   - Cambiar roles

2. **Estadísticas del Sistema**
   - Total de usuarios por rol
   - FREE vs PREMIUM user split
   - Suscripciones activas
   - Ingresos mensuales
   - Posts del foro
   - Conversion rate (FREE → PREMIUM)

3. **Verificación de Suscripciones**
   - Botón para verificar suscripciones expiradas
   - Notificaciones de expiración
   - Auto-downgrade PREMIUM → FREE on expiration

4. **Generic Routines Management:**
   - Create/edit/delete generic routines
   - Mark routines as generic
   - Preview as FREE user would see

#### Entregables:
- ✅ Admin puede gestionar usuarios
- ✅ Dashboard de admin con métricas clave
- ✅ Subscription analytics visible
- ✅ Generic routines management

---

### **FASE 10: Optimizaciones y Pulido (Semana 12)**

#### Tareas:
1. **Performance**
   - Lazy loading de páginas
   - Optimización de imágenes
   - Caché de peticiones (React Query)
   - Virtual scrolling en listas largas

2. **UX/UI**
   - Animaciones y transiciones
   - Feedback visual (toasts, loading states)
   - Modo oscuro (opcional)
   - Mejoras de accesibilidad

3. **Testing**
   - Unit tests (componentes críticos)
   - Integration tests (flujos principales)
   - E2E tests con Playwright/Cypress

4. **Deployment**
   - Build para producción
   - Deploy en Vercel/Netlify
   - CI/CD pipeline

#### Entregables:
- ✅ Aplicación optimizada y performante
- ✅ Tests cubriendo funcionalidades clave
- ✅ Deploy en producción

---

## 🛠️ Código de Ejemplo

### 1. Configuración de Axios

```javascript
// src/api/axios.js
import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000',
  headers: {
    'Content-Type': 'application/json'
  }
})

// Interceptor para agregar token a todas las peticiones
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Interceptor para manejar errores globales
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expirado o inválido
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default api
```

### 2. Auth Store (Zustand)

```javascript
// src/store/authStore.js
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import api from '../api/axios'

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      login: async (email, password) => {
        const { data } = await api.post('/api/auth/login', { email, password })
        localStorage.setItem('token', data.token)
        set({ user: data.usuario, token: data.token, isAuthenticated: true })
        return data
      },

      register: async (tipo, userData) => {
        const endpoint = tipo === 'cliente' 
          ? '/api/auth/registro/cliente' 
          : '/api/auth/registro/entrenador'
        const { data } = await api.post(endpoint, userData)
        localStorage.setItem('token', data.token)
        set({ user: data.usuario, token: data.token, isAuthenticated: true })
        return data
      },

      logout: () => {
        localStorage.removeItem('token')
        set({ user: null, token: null, isAuthenticated: false })
      },

      updateUser: (userData) => {
        set((state) => ({ user: { ...state.user, ...userData } }))
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ 
        user: state.user, 
        token: state.token, 
        isAuthenticated: state.isAuthenticated 
      })
    }
  )
)
```

### 3. Custom Hook para Progreso

```javascript
// src/hooks/useProgreso.js
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import api from '../api/axios'

export const useProgreso = (clienteId) => {
  const queryClient = useQueryClient()

  // Obtener historial de progreso
  const { data: progreso, isLoading } = useQuery({
    queryKey: ['progreso', clienteId],
    queryFn: async () => {
      const { data } = await api.get(`/api/progreso/cliente/${clienteId}`)
      return data
    },
    enabled: !!clienteId
  })

  // Crear registro de progreso
  const createProgreso = useMutation({
    mutationFn: async (formData) => {
      const { data } = await api.post('/api/progreso', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['progreso', clienteId])
    }
  })

  // Eliminar registro
  const deleteProgreso = useMutation({
    mutationFn: async (id) => {
      await api.delete(`/api/progreso/${id}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['progreso', clienteId])
    }
  })

  return {
    progreso,
    isLoading,
    createProgreso: createProgreso.mutate,
    deleteProgreso: deleteProgreso.mutate
  }
}
```

### 4. Componente de Rutina Diaria (Cliente)

```jsx
// src/components/rutinas/RutinaDiaria.jsx
import { useMiRutina } from '@/hooks/useRutinas'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

const DIAS = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']

export default function RutinaDiaria() {
  const { rutina, isLoading } = useMiRutina()
  const diaActual = new Date().getDay()

  if (isLoading) return <div>Cargando...</div>
  if (!rutina) return <div>No tienes una rutina asignada</div>

  const ejerciciosHoy = rutina.ejercicios.filter(ej => ej.dia === diaActual)

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Rutina de Hoy - {DIAS[diaActual]}</h2>
      
      {ejerciciosHoy.length === 0 ? (
        <p>Hoy es día de descanso 😌</p>
      ) : (
        ejerciciosHoy
          .sort((a, b) => a.orden - b.orden)
          .map((ej) => (
            <Card key={ej.id}>
              <CardHeader>
                <CardTitle>{ej.ejercicio.nombre}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="font-semibold">Series:</span> {ej.series}
                  </div>
                  <div>
                    <span className="font-semibold">Repeticiones:</span> {ej.repeticiones}
                  </div>
                  {ej.descansoSeg && (
                    <div>
                      <span className="font-semibold">Descanso:</span> {ej.descansoSeg}s
                    </div>
                  )}
                </div>
                {ej.notas && <p className="mt-2 text-sm text-gray-600">{ej.notas}</p>}
              </CardContent>
            </Card>
          ))
      )}
    </div>
  )
}
```

### 5. Protected Route Component

```jsx
// src/routes/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'

export default function ProtectedRoute({ children, roles = [] }) {
  const { isAuthenticated, user } = useAuthStore()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (roles.length > 0 && !roles.includes(user?.rol)) {
    return <Navigate to="/unauthorized" replace />
  }

  return children
}
```

---

## 🎯 Métricas de Éxito

### Por Rol:

**Cliente:**
- ✅ Puede registrarse e iniciar sesión
- ✅ Puede ver y editar su perfil
- ✅ Puede registrar su progreso con fotos
- ✅ Puede ver gráficas de evolución
- ✅ Puede ver su rutina asignada día a día
- ✅ Puede participar en el foro
- ✅ Puede gestionar su suscripción

**Entrenador:**
- ✅ Puede crear y gestionar rutinas
- ✅ Puede agregar ejercicios al catálogo
- ✅ Puede asignar rutinas a clientes
- ✅ Puede ver el progreso de sus clientes
- ✅ Puede ver estadísticas de sus clientes

**Admin:**
- ✅ Puede gestionar usuarios del sistema
- ✅ Puede ver estadísticas globales
- ✅ Puede verificar suscripciones expiradas
- ✅ Tiene acceso completo a todos los módulos

---

## 📚 Recursos Útiles

### Documentación:
- [React Docs](https://react.dev)
- [TanStack Query](https://tanstack.com/query/latest)
- [React Router](https://reactrouter.com)
- [Tailwind CSS](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com)

### Herramientas:
- [Postman](https://www.postman.com) - Probar endpoints
- [Figma](https://www.figma.com) - Diseño UI/UX
- [React DevTools](https://react.dev/learn/react-developer-tools)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse) - Performance audit

### Inspiración de UI:
- [dribbble.com/tags/fitness-app](https://dribbble.com/tags/fitness-app)
- [mobbin.com](https://mobbin.com) - Patrones de UI mobile

---

## ⚠️ Consideraciones Importantes

1. **Manejo de Errores**: Implementar manejo robusto de errores en todas las peticiones API.

2. **Loading States**: Todos los componentes deben tener estados de carga claros.

3. **Validación de Formularios**: Validar en el frontend antes de enviar al backend.

4. **Responsive Design**: La aplicación debe funcionar en móviles, tablets y desktop.

5. **Accesibilidad**: Seguir buenas prácticas de a11y (semántica HTML, ARIA labels, keyboard navigation).

6. **Seguridad**: 
   - Nunca exponer el JWT en logs
   - Sanitizar inputs del usuario
   - Validar permisos en el frontend (además del backend)

7. **Performance**:
   - Lazy load de imágenes
   - Code splitting por rutas
   - Memoization de componentes pesados

8. **SEO** (si aplica con Next.js):
   - Meta tags apropiados
   - Sitemap
   - Open Graph tags

---

## 🚀 Comandos de Inicio Rápido

```bash
# Crear proyecto con Vite + React
npm create vite@latest bodytrack-frontend -- --template react
cd bodytrack-frontend

# Instalar dependencias base
npm install react-router-dom @tanstack/react-query axios zustand
npm install react-hook-form zod @hookform/resolvers
npm install date-fns recharts

# Instalar Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Instalar shadcn/ui (componentes)
npx shadcn-ui@latest init

# Iniciar desarrollo
npm run dev
```

---

## 📞 Contacto y Soporte

Si tienes dudas sobre el backend o necesitas aclaraciones sobre algún endpoint:

1. Revisa la documentación del backend en `/README.md`
2. Prueba los endpoints con Postman/Insomnia
3. Revisa los controladores en `src/controllers/` para ver la lógica
4. Contacta al equipo de backend

---

**¡Buena suerte con el desarrollo del frontend! 💪🎨**
