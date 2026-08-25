# NIRVAN '26 — Backend, Authentication & Database Documentation

## 1. Overview & Architecture

NIRVAN '26 is backed by a hybrid modern serverless architecture powered by **Supabase (PostgreSQL & Auth)**, **Next.js 14 App Router API Routes**, and **Nodemailer (Gmail SMTP)**.

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                              CLIENT / FRONTEND                                  │
│                                                                                 │
│  ┌────────────────────────┐  ┌────────────────────────┐  ┌────────────────────┐ │
│  │     AuthModal.tsx      │  │   RegisterModal.tsx    │  │   Navbar / Hero    │ │
│  │ (Google + Email Auth)  │  │(Hacker Pass Generator) │  │  (Event UI & SFX)  │ │
│  └───────────┬────────────┘  └───────────┬────────────┘  └────────────────────┘ │
│              │                           │                                      │
└──────────────┼───────────────────────────┼──────────────────────────────────────┘
               │                           │
               │ Supabase Auth SDK         │ fetch('/api/register-event')
               ▼                           ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                               BACKEND SERVICES                                  │
│                                                                                 │
│  ┌─────────────────────────────────────┐  ┌──────────────────────────────────┐  │
│  │          Supabase Cloud             │  │       Next.js API Routes         │  │
│  │                                     │  │                                  │  │
│  │  • Supabase Auth (GoTrue)           │  │  • /api/register-event           │  │
│  │    - Google OAuth 2.0 Provider      │  │    (Protected endpoint)          │  │
│  │    - Email / Password Provider      │  │                                  │  │
│  │  • PostgreSQL DB (Row-Level Sec)    │  │  • /auth/callback                │  │
│  │    - `registrations` Table          │  │    (OAuth Code Exchange)         │  │
│  └─────────────────────────────────────┘  └──────────────────┬───────────────┘  │
│                                                              │                  │
│                                                              ▼                  │
│                                           ┌──────────────────────────────────┐  │
│                                           │         Nodemailer Engine        │  │
│                                           │  • Gmail SMTP Relay (Secure)     │  │
│                                           │  • Cyber Holographic HTML Pass   │  │
│                                           └──────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Authentication System (Supabase Auth)

Authentication is handled on both client and server using `@supabase/ssr` and `@supabase/supabase-js`.

### A. Authentication Methods
1. **Google OAuth 2.0**:
   - Initiated from [`components/AuthModal.tsx`](file:///d:/Web-A-Thon-4.0/components/AuthModal.tsx) via `supabase.auth.signInWithOAuth({ provider: 'google', ... })`.
   - Redirects to Google consent screen and returns to `/auth/callback` to exchange code for session cookies.
2. **Email & Password**:
   - **Sign Up**: Creates a new user in `auth.users` with metadata (e.g. `full_name`).
   - **Sign In**: Validates credentials against Supabase GoTrue engine.

### B. Client & Server Utilities
- **Browser Client** ([`lib/supabase-client.ts`](file:///d:/Web-A-Thon-4.0/lib/supabase-client.ts)):
  ```typescript
  import { createBrowserClient } from '@supabase/ssr';
  export function createClient() {
    return createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
  }
  ```
- **Server Clients** ([`lib/supabase-server.ts`](file:///d:/Web-A-Thon-4.0/lib/supabase-server.ts)):
  - `createClient()`: Reads session cookies directly from Next.js request headers (respects Row-Level Security).
  - `createAdminClient()`: Uses the `SUPABASE_SERVICE_ROLE_KEY` for administrative mutations (bypassing RLS when validating and writing pass records).

---

## 3. Database Schema & Row Level Security (RLS)

The database schema is written in PostgreSQL and managed in Supabase.

### Schema Definition ([`supabase/migration.sql`](file:///d:/Web-A-Thon-4.0/supabase/migration.sql))

```sql
-- ── Event Registrations Table ─────────────────────────────────
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

-- Unique constraint ensuring 1 pass per authenticated user
CREATE UNIQUE INDEX IF NOT EXISTS idx_registrations_user_id ON registrations(user_id);

-- Enable Row Level Security (RLS)
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view only their own registration pass
CREATE POLICY "Users can read own registration"
  ON registrations FOR SELECT
  USING (auth.uid() = user_id);

-- Policy: Server (service role) can insert registrations
CREATE POLICY "Service role can insert registrations"
  ON registrations FOR INSERT
  WITH CHECK (true);
```

---

## 4. API Endpoints

### `POST /api/register-event`
- **File**: [`app/api/register-event/route.ts`](file:///d:/Web-A-Thon-4.0/app/api/register-event/route.ts)
- **Access**: Authenticated Users Only (`401 Unauthorized` if session is absent).
- **Payload**:
  ```json
  {
    "name": "Alex Sharma",
    "college": "GEHU Campus, Dehradun",
    "track": "AI & Autonomous Agents",
    "role": "Developer"
  }
  ```
- **Behavior**:
  1. Validates input fields and extracts user email from verified session.
  2. Checks for existing registration (`409 Conflict` if user already holds a pass).
  3. Generates unique pass serial ID (e.g. `#NIRVAN26-4921-AI`).
  4. Inserts registration row into Supabase `registrations` table.
  5. Dispatches custom branded holographic pass email via Nodemailer asynchronously.
  6. Returns `201 Created` with the pass metadata.

### `GET /auth/callback`
- **File**: [`app/auth/callback/route.ts`](file:///d:/Web-A-Thon-4.0/app/auth/callback/route.ts)
- **Access**: Public
- **Behavior**:
  Exchanges OAuth authorization code (`?code=...`) for a secure HTTP-only Supabase session cookie, then redirects to `/`.

---

## 5. Automated Email System (`lib/email.ts`)

- **File**: [`lib/email.ts`](file:///d:/Web-A-Thon-4.0/lib/email.ts)
- **Transport**: Gmail SMTP (`smtp.gmail.com:465` with App Password authentication).
- **Template Features**:
  - Full holographic cyber design matching the NIRVAN '26 dark palette (`#05070f`, cyan `#00f0ff`, purple `#8b5cf6`).
  - Dynamic track-specific accent coloring.
  - Holographic ticket summary with attendee name, college, role, track, and generated Pass ID.
  - Event venue details table (GEHU Campus, 48hr hackathon, ₹5L+ prizes).
  - Direct call-to-action button linking back to the site.

---

## 6. Environment Variables Reference

Located in [`.env.local`](file:///d:/Web-A-Thon-4.0/.env.local) (Git ignored):

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase Project URL (`https://vgalkeqcrbdhfdwopufs.supabase.co`) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public Anon Client Key (Safe for browser client) |
| `SUPABASE_SERVICE_ROLE_KEY` | Admin Service Role Key (Server-side API routes only) |
| `SUPABASE_SECRET_KEY` | Supabase API Secret Key |
| `GOOGLE_CLIENT_ID` | Google Cloud OAuth 2.0 Client ID |
| `GOOGLE_CLIENT_SECRET` | Google Cloud OAuth 2.0 Client Secret |
| `EMAIL_USER` | Gmail sender address (`kernelcorestudio2026@gmail.com`) |
| `EMAIL_PASS` | 16-character Gmail App Password |
| `SERP_API_KEY` | SerpAPI integration key |

---

## 7. Console Configuration Step-by-Step

### 1. Supabase SQL Editor
1. Log in to [Supabase Console](https://supabase.com/dashboard/project/vgalkeqcrbdhfdwopufs).
2. Go to **SQL Editor** → **New query**.
3. Paste the contents of [`supabase/migration.sql`](file:///d:/Web-A-Thon-4.0/supabase/migration.sql) and click **Run**.

### 2. Supabase Google Provider
1. Go to **Authentication** → **Providers** → **Google**.
2. Toggle Google **ON**.
3. Paste:
   - **Client ID**: `YOUR_GOOGLE_CLIENT_ID_HERE`
   - **Client Secret**: `YOUR_GOOGLE_CLIENT_SECRET_HERE`
4. Click **Save**.

### 3. Google Cloud Console Redirect URI
1. In [Google Cloud Console](https://console.cloud.google.com/apis/credentials), click on your OAuth 2.0 Client ID.
2. Under **Authorized redirect URIs**, add:
   - `https://vgalkeqcrbdhfdwopufs.supabase.co/auth/v1/callback`
   - `http://localhost:3000/auth/callback`
3. Click **Save**.
