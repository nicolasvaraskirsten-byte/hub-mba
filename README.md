# HUB Innovación y Emprendimiento – MBA UC

Sitio tipo mini comunidad para el HUB: landing marketing, perfiles de participantes y expertos, agendamiento de sesiones, feed de eventos/recursos y panel de administración.

## Stack

- **Next.js 14+** (App Router) con TypeScript
- **Tailwind CSS** + **shadcn/ui** + **lucide-react**
- **Framer Motion** (animaciones sutiles)
- **NextAuth** (Google OAuth) + roles: admin / experto / participante
- **Supabase** (Postgres) + supabase-js
- **Resend** (emails, opcional)

## Requisitos

- Node 18+
- Cuenta Supabase
- Cuenta Google Cloud (OAuth)
- Opcional: Resend para emails

## Variables de entorno

Crea un archivo `.env.local` en la raíz con:

```env
# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=genera-un-secreto-largo-y-aleatorio

# Google OAuth (Google Cloud Console)
GOOGLE_CLIENT_ID=tu-client-id
GOOGLE_CLIENT_SECRET=tu-client-secret

# Supabase (Dashboard > Project Settings > API)
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...   # Solo en servidor; no exponer en cliente

# Opcional: emails con Resend
RESEND_API_KEY=re_...
EMAIL_FROM=Hub MBA UC <noreply@tudominio.com>

# Feature flag: directorio de participantes (true/false)
NEXT_PUBLIC_PARTICIPANTS=false
```

## Setup Supabase

1. Crea un proyecto en [Supabase](https://supabase.com).
2. En **SQL Editor**, ejecuta el contenido de:
   - `supabase/migrations/001_initial_schema.sql`
3. Luego ejecuta el seed (opcional, para datos de desarrollo):
   - `supabase/seed.sql`

**Nota:** El schema usa RLS con `auth.uid()`. Esta app usa **NextAuth**, no Supabase Auth. Por eso las operaciones desde el servidor usan `SUPABASE_SERVICE_ROLE_KEY`, que bypasea RLS. No uses la anon key desde el servidor para escribir datos de usuarios/bookings.

**Build:** La landing (`/`) usa `dynamic = "force-dynamic"` para no depender de Supabase en el build. El resto de páginas que usan datos devuelven listas vacías si las variables de Supabase no están configuradas (para que el build termine). En runtime, configura todas las variables para que la app funcione con datos reales.

## Comandos

```bash
# Instalar dependencias
npm install

# Desarrollo
npm run dev

# Build
npm run build

# Producción
npm start

# Lint
npm run lint
```

## Cómo seedear datos de desarrollo

1. Configura Supabase y las variables de entorno.
2. Ejecuta en el **SQL Editor** de Supabase (en este orden):
   - `supabase/migrations/001_initial_schema.sql`
   - `supabase/seed.sql`

El seed crea:

- 1 admin (`admin@mba.uc.cl`)
- 8 expertos (Retail, Minería, Salud, Fintech, Energía, Agro, Logística, Tecnología)
- 20 participantes
- 3 eventos y 3 recursos de ejemplo

Para probar como admin en desarrollo, crea en Supabase un usuario con ese email (o actualiza el usuario que se cree al hacer login con `admin@mba.uc.cl`) y asígnale `role = 'admin'` en la tabla `users`.

## Estructura relevante

```
src/
  app/
    (marketing)/          # Landing pública
      layout.tsx
      page.tsx
    (app)/                # Rutas con Header/Footer
      explorar/
      expertos/
      expertos/[id]/
      perfil/
      agenda/
      admin/
    auth/signin/
    api/
      auth/[...nextauth]/
      profile/
      bookings/
      admin/
  components/
    layout/               # Header, Footer, CTAStrip
    experts/              # ExpertCard
    participants/
    ui/                   # shadcn
  lib/
    auth.ts               # NextAuth config
    auth-utils.ts
    supabase/             # client, server (service role)
    db/types.ts
    data/                 # experts, events, profile, bookings, admin
    email.ts
    calendar.ts
supabase/
  migrations/001_initial_schema.sql
  seed.sql
```

## Roles y permisos

- **Participante:** perfil, ver expertos, solicitar/agendar, ver participantes (si opt-in y flag activo).
- **Experto:** perfil, (futuro) conectar calendario, aceptar/rechazar solicitudes.
- **Admin:** todo lo anterior + aprobar perfiles, crear eventos/recursos, métricas.

## Feature flag

- `NEXT_PUBLIC_PARTICIPANTS=true|false`: muestra u oculta la pestaña "Participantes" en Explorar.

## Agendamiento (MVP)

1. El participante elige slot (lista de próximos 14 días) y envía solicitud.
2. Se crea un booking con estado `requested`.
3. Si el experto tiene calendario conectado (futuro), al aceptar se crea evento y Meet.
4. Si no: el experto acepta y se puede enviar email con horario/link manual (Resend si hay API key).

---

© MBA UC – HUB Innovación y Emprendimiento
