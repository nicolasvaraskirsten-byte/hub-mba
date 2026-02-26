-- Campo opcional para enlazar Calendly por experto
ALTER TABLE experts
ADD COLUMN IF NOT EXISTS calendly_url TEXT;

COMMENT ON COLUMN experts.calendly_url IS 'URL de Calendly para agendar sesión con este experto (ej. https://calendly.com/...)';
