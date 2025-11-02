-- Create registrations table in Supabase
-- Run this SQL in your Supabase SQL Editor

CREATE TABLE IF NOT EXISTS registrations (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    os TEXT,
    timestamp TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    
    -- Add unique constraint to prevent duplicate registrations
    CONSTRAINT unique_email_phone UNIQUE (email, phone)
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_registrations_email ON registrations(email);
CREATE INDEX IF NOT EXISTS idx_registrations_timestamp ON registrations(timestamp DESC);

-- Enable Row Level Security (RLS) - Optional, adjust as needed
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all operations (adjust based on your security needs)
-- For public read/write (adjust if you need more security):
CREATE POLICY "Allow public insert" ON registrations
    FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Allow public select" ON registrations
    FOR SELECT
    USING (true);

CREATE POLICY "Allow public update" ON registrations
    FOR UPDATE
    USING (true);

-- Or if you want to restrict to authenticated users only:
-- DROP POLICY IF EXISTS "Allow public insert" ON registrations;
-- DROP POLICY IF EXISTS "Allow public select" ON registrations;
-- DROP POLICY IF EXISTS "Allow public update" ON registrations;

-- CREATE POLICY "Allow authenticated insert" ON registrations
--     FOR INSERT
--     TO authenticated
--     WITH CHECK (true);

