-- ============================================================
-- NIRVAN '26 — Supabase SQL Migration
-- Run this in: Supabase Dashboard → SQL Editor → New Query
-- ============================================================

-- ── Registrations table ──────────────────────────────────────
CREATE TABLE IF NOT EXISTS registrations (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name       TEXT NOT NULL,
  college    TEXT NOT NULL,
  track      TEXT NOT NULL,
  role       TEXT NOT NULL,
  pass_id    TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- One registration per user
CREATE UNIQUE INDEX IF NOT EXISTS idx_registrations_user_id ON registrations(user_id);

-- Row Level Security
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;

-- Users can only read their own registration
CREATE POLICY "Users can read own registration"
  ON registrations FOR SELECT
  USING (auth.uid() = user_id);

-- Service role (server) can insert registrations
CREATE POLICY "Service role can insert registrations"
  ON registrations FOR INSERT
  WITH CHECK (true);

-- ── Done ─────────────────────────────────────────────────────
-- Table created with RLS. Service role key (used in API routes)
-- can write; users can only read their own row.
