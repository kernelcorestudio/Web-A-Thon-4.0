# NIRVAN '26 — Backend API & Integration Architecture

This document specifies the data models, API endpoints, registration schema, database integration, and webhook workflows for NIRVAN '26.

---

## 🛰️ 1. Registration Data Model & Payload

### Endpoint: `POST /api/register`
Accepts registration submissions from [`components/RegisterModal.tsx`](file:///d:/Web-A-Thon-4.0/components/RegisterModal.tsx).

#### Request Body (JSON)
```json
{
  "registrationType": "team", // "solo" | "team"
  "event": "hackathon",       // "hackathon" | "ctf" | "esports" | "treasure_hunt" | "workshop"
  "teamName": "CyberKnights",
  "teamLeader": {
    "name": "Alex Mercer",
    "email": "alex.mercer@gehu.ac.in",
    "phone": "+91 9876543210",
    "college": "Graphic Era Hill University",
    "year": "3rd Year",
    "rollNo": "GEHU2024CS001"
  },
  "members": [
    {
      "name": "Sarah Connor",
      "email": "sarah.c@gehu.ac.in",
      "phone": "+91 9876543211",
      "college": "Graphic Era Hill University"
    },
    {
      "name": "John Doe",
      "email": "john.doe@gehu.ac.in",
      "phone": "+91 9876543212",
      "college": "Graphic Era Hill University"
    }
  ],
  "experienceLevel": "Advanced",
  "githubUrl": "https://github.com/alexmercer",
  "dietaryPreferences": "Vegetarian",
  "timestamp": "2026-08-26T00:15:00.000Z"
}
```

#### Success Response (`201 Created`)
```json
{
  "success": true,
  "ticketId": "NIRVAN26-HACK-8821",
  "qrPayload": "https://nirvan26.gehu.ac.in/verify/NIRVAN26-HACK-8821",
  "message": "Team registration confirmed for NIRVAN '26 Hackathon."
}
```

---

## 🗄️ 2. Database Schema (PostgreSQL / Supabase)

### Table: `registrations`
```sql
CREATE TABLE registrations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ticket_id VARCHAR(64) UNIQUE NOT NULL,
    event_type VARCHAR(50) NOT NULL,
    registration_type VARCHAR(20) NOT NULL,
    team_name VARCHAR(100),
    leader_name VARCHAR(100) NOT NULL,
    leader_email VARCHAR(255) NOT NULL,
    leader_phone VARCHAR(20) NOT NULL,
    college VARCHAR(255) NOT NULL,
    members JSONB DEFAULT '[]'::jsonb,
    is_verified BOOLEAN DEFAULT FALSE,
    checked_in BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_registrations_ticket_id ON registrations(ticket_id);
CREATE INDEX idx_registrations_leader_email ON registrations(leader_email);
```

---

## 📧 3. Automated Notification Pipeline

1. **Submission Received**: Client posts payload to `/api/register`.
2. **Database Insertion**: Record stored with unique UUID & cryptographic ticket hash.
3. **Email Trigger (Resend / SendGrid)**:
   - Automated confirmation email sent to team leader and members.
   - Embeds SVG ticket pass, QR validation code, venue directions, and schedule PDF.
4. **Discord Webhook**: Sends real-time registration ping to organizers' Discord channel.
