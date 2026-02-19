-- Seed para desarrollo: 8 expertos, 20 participantes, eventos y recursos
-- Ejecutar después de 001_initial_schema.sql
-- Los IDs son UUIDs; en producción NextAuth creará users con su propio id (ej. email provider sub). Aquí usamos UUIDs genéricos.

-- Limpiar (opcional, cuidado en prod)
-- TRUNCATE users, profiles, experts, bookings, events, resources, favorites CASCADE;

-- 1) Admin
INSERT INTO users (id, name, email, role, avatar_url) VALUES
  ('30000000-0000-4000-8000-000000000001', 'Admin Hub', 'admin@mba.uc.cl', 'admin', null)
ON CONFLICT (email) DO NOTHING;

-- 2) Expertos (8)
INSERT INTO users (id, name, email, role, avatar_url) VALUES
  ('10000000-0000-4000-8000-000000000001', 'María González', 'maria.gonzalez@example.com', 'expert', null),
  ('10000000-0000-4000-8000-000000000002', 'Carlos Rojas', 'carlos.rojas@example.com', 'expert', null),
  ('10000000-0000-4000-8000-000000000003', 'Ana Martínez', 'ana.martinez@example.com', 'expert', null),
  ('10000000-0000-4000-8000-000000000004', 'Pedro Sánchez', 'pedro.sanchez@example.com', 'expert', null),
  ('10000000-0000-4000-8000-000000000005', 'Laura Fernández', 'laura.fernandez@example.com', 'expert', null),
  ('10000000-0000-4000-8000-000000000006', 'Roberto Díaz', 'roberto.diaz@example.com', 'expert', null),
  ('10000000-0000-4000-8000-000000000007', 'Claudia López', 'claudia.lopez@example.com', 'expert', null),
  ('10000000-0000-4000-8000-000000000008', 'Andrés Muñoz', 'andres.munoz@example.com', 'expert', null)
ON CONFLICT (email) DO NOTHING;

INSERT INTO profiles (user_id, headline, bio, linkedin_url, company, industry, location, interests, goals, public) VALUES
  ('10000000-0000-4000-8000-000000000001', 'Directora de Innovación en Retail', 'Más de 15 años en retail y transformación digital. Ex Cencosud.', 'https://linkedin.com/in/mariagonzalez', 'Cencosud', 'Retail', 'Santiago', ARRAY['Retail', 'Innovación', 'Digital'], ARRAY['mentoría'], true),
  ('10000000-0000-4000-8000-000000000002', 'Líder en Minería y Sustentabilidad', 'Experto en operaciones mineras y ESG. COO en minera mediana.', 'https://linkedin.com/in/carlosrojas', 'Minera Los Pelambres', 'Minería', 'Antofagasta', ARRAY['Minería', 'ESG', 'Operaciones'], ARRAY['mentoría', 'inversión'], true),
  ('10000000-0000-4000-8000-000000000003', 'Emprendedora en Salud Digital', 'Fundadora de startup de telemedicina. 10+ años en salud.', 'https://linkedin.com/in/anamartinez', 'SaludTech SpA', 'Salud', 'Santiago', ARRAY['Salud', 'Healthtech', 'Scale-up'], ARRAY['mentoría', 'cofounder'], true),
  ('10000000-0000-4000-8000-000000000004', 'CFO y Fintech', 'Ex banco. Hoy asesoro startups fintech en regulación y crecimiento.', 'https://linkedin.com/in/pedrosanchez', 'Independiente', 'Fintech', 'Santiago', ARRAY['Fintech', 'Regulación', 'Finanzas'], ARRAY['mentoría', 'inversión'], true),
  ('10000000-0000-4000-8000-000000000005', 'Energía Renovable y Transición', 'Ingeniera. Líder en proyectos ERNC y hidrógeno verde.', 'https://linkedin.com/in/laurafernandez', 'Enap', 'Energía', 'Santiago', ARRAY['Energía', 'ERNC', 'H2'], ARRAY['mentoría'], true),
  ('10000000-0000-4000-8000-000000000006', 'Agro y Foodtech', 'Director comercial en agroexportación. Conocimiento en mercados Asia.', 'https://linkedin.com/in/robertodiaz', 'Agrícola San José', 'Agro', 'Talca', ARRAY['Agro', 'Exportación', 'Foodtech'], ARRAY['mentoría', 'clientes'], true),
  ('10000000-0000-4000-8000-000000000007', 'Logística y Supply Chain', 'COO en empresa de logística. Especialista en última milla.', 'https://linkedin.com/in/claudialopez', 'Chilexpress', 'Logística', 'Santiago', ARRAY['Logística', 'Supply Chain', 'Última milla'], ARRAY['mentoría'], true),
  ('10000000-0000-4000-8000-000000000008', 'CTO y Deep Tech', 'Ex Google. Fundador de SaaS B2B. Mentor en aceleradoras.', 'https://linkedin.com/in/andresmunoz', 'TechVentures', 'Tecnología', 'Santiago', ARRAY['Tecnología', 'SaaS', 'Product'], ARRAY['mentoría', 'cofounder', 'inversión'], true)
ON CONFLICT (user_id) DO UPDATE SET headline = EXCLUDED.headline, bio = EXCLUDED.bio, company = EXCLUDED.company, industry = EXCLUDED.industry, public = EXCLUDED.public;

INSERT INTO experts (user_id, expertise, years_experience, industries, languages, featured, calendar_connected) VALUES
  ('10000000-0000-4000-8000-000000000001', ARRAY['Estrategia retail', 'Transformación digital', 'Innovación'], 15, ARRAY['Retail'], ARRAY['Español', 'Inglés'], true, true),
  ('10000000-0000-4000-8000-000000000002', ARRAY['Operaciones mineras', 'ESG', 'Liderazgo'], 18, ARRAY['Minería'], ARRAY['Español', 'Inglés'], true, false),
  ('10000000-0000-4000-8000-000000000003', ARRAY['Healthtech', 'Scale-up', 'Fundraising'], 10, ARRAY['Salud', 'Tecnología'], ARRAY['Español', 'Inglés'], true, true),
  ('10000000-0000-4000-8000-000000000004', ARRAY['Finanzas', 'Regulación financiera', 'Fintech'], 20, ARRAY['Fintech', 'Banca'], ARRAY['Español', 'Inglés'], true, true),
  ('10000000-0000-4000-8000-000000000005', ARRAY['ERNC', 'Hidrógeno verde', 'Proyectos'], 12, ARRAY['Energía'], ARRAY['Español', 'Inglés'], false, false),
  ('10000000-0000-4000-8000-000000000006', ARRAY['Agroexportación', 'Comercial', 'Asia'], 14, ARRAY['Agro'], ARRAY['Español', 'Chino'], false, true),
  ('10000000-0000-4000-8000-000000000007', ARRAY['Supply chain', 'Logística', 'Última milla'], 11, ARRAY['Logística'], ARRAY['Español'], false, false),
  ('10000000-0000-4000-8000-000000000008', ARRAY['Product', 'SaaS', 'Tecnología'], 16, ARRAY['Tecnología'], ARRAY['Español', 'Inglés'], true, true)
ON CONFLICT (user_id) DO UPDATE SET expertise = EXCLUDED.expertise, years_experience = EXCLUDED.years_experience, industries = EXCLUDED.industries, featured = EXCLUDED.featured;

-- 3) Participantes (20)
INSERT INTO users (id, name, email, role, avatar_url) VALUES
  ('20000000-0000-4000-8000-000000000001', 'Jorge Silva', 'jorge.silva@example.com', 'participant', null),
  ('20000000-0000-4000-8000-000000000002', 'Carmen Vega', 'carmen.vega@example.com', 'participant', null),
  ('20000000-0000-4000-8000-000000000003', 'Felipe Torres', 'felipe.torres@example.com', 'participant', null),
  ('20000000-0000-4000-8000-000000000004', 'Isabel Reyes', 'isabel.reyes@example.com', 'participant', null),
  ('20000000-0000-4000-8000-000000000005', 'Ricardo Morales', 'ricardo.morales@example.com', 'participant', null),
  ('20000000-0000-4000-8000-000000000006', 'Patricia Soto', 'patricia.soto@example.com', 'participant', null),
  ('20000000-0000-4000-8000-000000000007', 'Luis Hernández', 'luis.hernandez@example.com', 'participant', null),
  ('20000000-0000-4000-8000-000000000008', 'Daniela Castro', 'daniela.castro@example.com', 'participant', null),
  ('20000000-0000-4000-8000-000000000009', 'Miguel Flores', 'miguel.flores@example.com', 'participant', null),
  ('20000000-0000-4000-8000-000000000010', 'Andrea Ruiz', 'andrea.ruiz@example.com', 'participant', null),
  ('20000000-0000-4000-8000-000000000011', 'Francisco Ortiz', 'francisco.ortiz@example.com', 'participant', null),
  ('20000000-0000-4000-8000-000000000012', 'Valentina Navarro', 'valentina.navarro@example.com', 'participant', null),
  ('20000000-0000-4000-8000-000000000013', 'Sergio Jiménez', 'sergio.jimenez@example.com', 'participant', null),
  ('20000000-0000-4000-8000-000000000014', 'Natalia Vargas', 'natalia.vargas@example.com', 'participant', null),
  ('20000000-0000-4000-8000-000000000015', 'Martín Guerrero', 'martin.guerrero@example.com', 'participant', null),
  ('20000000-0000-4000-8000-000000000016', 'Elena Paredes', 'elena.paredes@example.com', 'participant', null),
  ('20000000-0000-4000-8000-000000000017', 'Diego Campos', 'diego.campos@example.com', 'participant', null),
  ('20000000-0000-4000-8000-000000000018', 'Carolina Sandoval', 'carolina.sandoval@example.com', 'participant', null),
  ('20000000-0000-4000-8000-000000000019', 'Pablo Figueroa', 'pablo.figueroa@example.com', 'participant', null),
  ('20000000-0000-4000-8000-000000000020', 'Camila Ríos', 'camila.rios@example.com', 'participant', null)
ON CONFLICT (email) DO NOTHING;

INSERT INTO profiles (user_id, headline, bio, company, industry, location, interests, goals, public) VALUES
  ('20000000-0000-4000-8000-000000000001', 'Gerente Comercial', 'MBA UC 2023. Buscando escalar negocio en retail.', 'RetailCo', 'Retail', 'Santiago', ARRAY['Retail', 'Ventas'], ARRAY['mentoría', 'clientes'], true),
  ('20000000-0000-4000-8000-000000000002', 'Jefa de Proyectos', 'Transición hacia emprendimiento en salud.', 'Clínica Alemana', 'Salud', 'Santiago', ARRAY['Salud', 'Digital'], ARRAY['cofounder', 'mentoría'], true),
  ('20000000-0000-4000-8000-000000000003', 'Ingeniero Senior', 'Interés en energías renovables y H2.', 'Enel', 'Energía', 'Santiago', ARRAY['Energía', 'ERNC'], ARRAY['mentoría', 'inversión'], true),
  ('20000000-0000-4000-8000-000000000004', 'Founder', 'Early-stage fintech. Busco mentor y posibles inversores.', 'PayFlow SpA', 'Fintech', 'Santiago', ARRAY['Fintech', 'Startups'], ARRAY['inversión', 'mentoría'], true),
  ('20000000-0000-4000-8000-000000000005', 'Consultor', 'Ex minería. Explorando agrotech.', null, 'Agro', 'La Serena', ARRAY['Agro', 'Minería'], ARRAY['cofounder', 'mentoría'], true),
  ('20000000-0000-4000-8000-000000000006', 'Product Manager', 'Tech. Busco cofounder técnico.', 'Software SA', 'Tecnología', 'Santiago', ARRAY['Product', 'SaaS'], ARRAY['cofounder'], true),
  ('20000000-0000-4000-8000-000000000007', 'Supply Chain Manager', 'Logística y operaciones. Ideas en last-mile.', 'DHL', 'Logística', 'Santiago', ARRAY['Logística'], ARRAY['mentoría', 'clientes'], true),
  ('20000000-0000-4000-8000-000000000008', 'Abogada', 'Regulación y compliance. Interés en fintech.', 'Estudio Legal', 'Fintech', 'Santiago', ARRAY['Regulación'], ARRAY['mentoría'], true),
  ('20000000-0000-4000-8000-000000000009', 'CFO', 'Finanzas corporativas. Mentoría para emprendedores.', 'Multinacional', 'Tecnología', 'Santiago', ARRAY['Finanzas'], ARRAY['mentoría'], false),
  ('20000000-0000-4000-8000-000000000010', 'Marketing Lead', 'Retail y e-commerce.', 'Falabella', 'Retail', 'Santiago', ARRAY['Marketing', 'Retail'], ARRAY['clientes', 'mentoría'], true),
  ('20000000-0000-4000-8000-000000000011', 'Minería', 'Operaciones. Sustentabilidad.', 'Codelco', 'Minería', 'Calama', ARRAY['Minería', 'ESG'], ARRAY['mentoría'], true),
  ('20000000-0000-4000-8000-000000000012', 'Emprendedora', 'Foodtech en etapa idea.', null, 'Agro', 'Valparaíso', ARRAY['Foodtech', 'Agro'], ARRAY['cofounder', 'mentoría'], true),
  ('20000000-0000-4000-8000-000000000013', 'IT Manager', 'Digitalización en retail.', 'Paris', 'Retail', 'Santiago', ARRAY['IT', 'Retail'], ARRAY['mentoría'], true),
  ('20000000-0000-4000-8000-000000000014', 'Doctora', 'Telemedicina. Busco socio comercial.', 'Consultorio', 'Salud', 'Santiago', ARRAY['Salud', 'Telemedicina'], ARRAY['cofounder'], true),
  ('20000000-0000-4000-8000-000000000015', 'Ventas B2B', 'Tecnología y minería.', 'SAP', 'Tecnología', 'Santiago', ARRAY['Ventas', 'Tech'], ARRAY['clientes'], true),
  ('20000000-0000-4000-8000-000000000016', 'HR Manager', 'Talento en startups.', 'Startup', 'Tecnología', 'Santiago', ARRAY['HR', 'Startups'], ARRAY['mentoría'], false),
  ('20000000-0000-4000-8000-000000000017', 'Ingeniero', 'Energía solar. Proyectos.', 'Acciona', 'Energía', 'Santiago', ARRAY['Solar', 'ERNC'], ARRAY['mentoría', 'inversión'], true),
  ('20000000-0000-4000-8000-000000000018', 'Comercial Agro', 'Exportación frutícola.', 'Exportadora', 'Agro', 'Curicó', ARRAY['Agro', 'Exportación'], ARRAY['mentoría', 'clientes'], true),
  ('20000000-0000-4000-8000-000000000019', 'Founder', 'Logtech. Seed stage.', 'LogTech SpA', 'Logística', 'Santiago', ARRAY['Logística', 'Tech'], ARRAY['inversión', 'mentoría'], true),
  ('20000000-0000-4000-8000-000000000020', 'Designer', 'UX. Busco equipo para producto.', null, 'Tecnología', 'Santiago', ARRAY['UX', 'Product'], ARRAY['cofounder'], true)
ON CONFLICT (user_id) DO UPDATE SET headline = EXCLUDED.headline, goals = EXCLUDED.goals, public = EXCLUDED.public;

-- 4) Eventos
INSERT INTO events (title, description, start_at, end_at, location, link, tags) VALUES
  ('Desayuno de Innovación', 'Networking y charla con expertos del Hub.', now() + interval '7 days', now() + interval '7 days' + interval '2 hours', 'Campus MBA UC', 'https://meet.google.com/xxx', ARRAY['Networking', 'Innovación']),
  ('Workshop: Pitch para inversores', 'Cómo preparar tu pitch en 10 minutos.', now() + interval '14 days', now() + interval '14 days' + interval '3 hours', 'Online', 'https://meet.google.com/yyy', ARRAY['Pitch', 'Inversión']),
  ('Mentoría grupal: Retail', 'Sesión con María González sobre tendencias retail.', now() + interval '21 days', now() + interval '21 days' + interval '1 hour', 'Online', null, ARRAY['Retail', 'Mentoría'])
RETURNING id;

-- 5) Recursos
INSERT INTO resources (title, description, url, tags) VALUES
  ('Guía de pitch deck', 'Plantilla y mejores prácticas para tu deck.', 'https://example.com/pitch-deck', ARRAY['Pitch', 'Inversión']),
  ('Mapa de fondos Chile', 'Listado de fondos y criterios de inversión.', 'https://example.com/fondos', ARRAY['Inversión', 'Fintech']),
  ('Framework de innovación', 'Metodología para proyectos de innovación corporativa.', 'https://example.com/framework', ARRAY['Innovación', 'Corporativo'])
RETURNING id;
