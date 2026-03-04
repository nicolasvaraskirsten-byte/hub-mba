-- Imagen del evento (URL pública, ej. Supabase Storage)
ALTER TABLE events
ADD COLUMN IF NOT EXISTS image_url TEXT;

COMMENT ON COLUMN events.image_url IS 'URL pública de la imagen del evento (ej. https://...supabase.co/storage/v1/object/public/bucket/path.jpg)';
