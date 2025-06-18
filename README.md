# Plataforma de Streaming

Una plataforma de streaming moderna construida con React.js, TypeScript, NestJS y PostgreSQL.

##  Características

- Autenticación con Firebase (email, Google, Facebook, Apple)
- Reproducción de video adaptativa (HLS/MPEG-DASH)
- Sistema de suscripciones con Stripe
- Almacenamiento de archivos en FireBase
- Panel de administración
- Soporte para subtítulos y audio multilingüe
- Sistema de recomendaciones

## 🛠 Tecnologías

### Frontend

- React.js
- TypeScript
- Video.js
- TailwindCSS
- Firebase Auth
- Stripe Elements

### Backend

- NestJS
- PostgreSQL
- TypeORM
- AWS SDK
- Stripe API
- Firebase Admin SDK

## 📦 Instalación

### Requisitos previos

- Node.js (v16 o superior)
- PostgreSQL
- Cuenta de FireBase
- Cuenta de Stripe
- Proyecto de Firebase

### Configuración del entorno

1. Clonar el repositorio:

```bash
git clone https://github.com/tu-usuario/streaming-platform.git
cd streaming-platform
```

2. Instalar dependencias del frontend:

```bash
npm install
```

3. Instalar dependencias del backend:

```bash
cd backend
npm install
```

4. Configurar variables de entorno:

Frontend (.env)

Backend (.env)




## 🔒 Seguridad

- Autenticación JWT
- Encriptación de contraseñas con bcrypt
- Protección contra CSRF
- Validación de datos
- Sanitización de entradas
- Cumplimiento GDPR

##  Escalabilidad

- Arquitectura en microservicios
- Caché distribuido
- Balanceo de carga
- CDN para contenido estático
- Base de datos replicada


