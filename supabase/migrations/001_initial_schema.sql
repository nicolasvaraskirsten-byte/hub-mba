-- HUB Innovación y Emprendimiento MBA UC - Schema inicial
-- Ejecutar en Supabase SQL Editor o via CLI

-- Enum para roles (NextAuth guarda en session; aquí reflejamos en users)
-- Enum para estado de booking
CREATE TYPE booking_status AS ENUM (
  'requested',
  'accepted',
  'rejected',
  'cancelled',
  'completed'
);

-- Enum para tipo de favorito
CREATE TYPE favorite_type AS ENUM ('expert', 'participant');

-- Users: sincronizado con NextAuth; role lo podemos guardar en profiles o en tabla users
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT,
  email TEXT UNIQUE NOT NULL,
  role TEXT NOT NULL DEFAULT 'participant' CHECK (role IN ('admin', 'expert', 'participant')),
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Profiles: perfil extendido (participantes y expertos)
CREATE TABLE IF NOT EXISTS profiles (
  user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  headline TEXT,
  bio TEXT,
  linkedin_url TEXT,
  company TEXT,
  industry TEXT,
  location TEXT,
  interests TEXT[] DEFAULT '{}',
  goals TEXT[] DEFAULT '{}',
  public BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Experts: datos específicos de expertos
CREATE TABLE IF NOT EXISTS experts (
  user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  expertise TEXT[] DEFAULT '{}',
  years_experience INT,
  industries TEXT[] DEFAULT '{}',
  languages TEXT[] DEFAULT '{}',
  featured BOOLEAN DEFAULT false,
  calendar_connected BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Bookings: solicitudes y sesiones
CREATE TABLE IF NOT EXISTS bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  requester_user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  expert_user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  status booking_status NOT NULL DEFAULT 'requested',
  start_at TIMESTAMPTZ NOT NULL,
  end_at TIMESTAMPTZ NOT NULL,
  notes TEXT,
  meet_link TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  CONSTRAINT no_self_booking CHECK (requester_user_id != expert_user_id)
);

CREATE INDEX idx_bookings_requester ON bookings(requester_user_id);
CREATE INDEX idx_bookings_expert ON bookings(expert_user_id);
CREATE INDEX idx_bookings_status ON bookings(status);

-- Events
CREATE TABLE IF NOT EXISTS events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  start_at TIMESTAMPTZ NOT NULL,
  end_at TIMESTAMPTZ,
  location TEXT,
  link TEXT,
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Resources
CREATE TABLE IF NOT EXISTS resources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  url TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Favorites
CREATE TABLE IF NOT EXISTS favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  target_user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type favorite_type NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, target_user_id)
);

CREATE INDEX idx_favorites_user ON favorites(user_id);

-- RLS (opcional para producción; para dev podemos desactivar)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE experts ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;

-- Políticas básicas: permitir lectura anónima de eventos y recursos; resto con auth
CREATE POLICY "events_read" ON events FOR SELECT USING (true);
CREATE POLICY "resources_read" ON resources FOR SELECT USING (true);

CREATE POLICY "users_read" ON users FOR SELECT USING (true);
CREATE POLICY "profiles_read_public" ON profiles FOR SELECT USING (public = true OR auth.uid() = user_id);
CREATE POLICY "profiles_write" ON profiles FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "experts_read" ON experts FOR SELECT USING (true);
CREATE POLICY "experts_write" ON experts FOR ALL USING (
  auth.uid() = user_id OR
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
);

CREATE POLICY "bookings_select" ON bookings FOR SELECT USING (
  auth.uid() = requester_user_id OR auth.uid() = expert_user_id OR
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "bookings_insert" ON bookings FOR INSERT WITH CHECK (auth.uid() = requester_user_id);
CREATE POLICY "bookings_update" ON bookings FOR UPDATE USING (
  auth.uid() = expert_user_id OR auth.uid() = requester_user_id OR
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
);

CREATE POLICY "favorites_own" ON favorites FOR ALL USING (auth.uid() = user_id);

-- Nota: en desarrollo con service_role key las RLS pueden omitirse si usas service role.
-- Para anon key desde el cliente necesitas que auth.uid() sea el user id de tu app.
-- Si usas NextAuth y no Supabase Auth, puedes usar service_role en server y mapear session a user_id.
