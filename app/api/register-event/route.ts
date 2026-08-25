import { NextRequest, NextResponse } from 'next/server';
import { createClient, createAdminClient } from '@/lib/supabase-server';
import { sendPassEmail } from '@/lib/email';

export async function POST(req: NextRequest) {
  try {
    const supabase = createClient();

    // ── Auth guard ──────────────────────────────────────────────────────────
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: 'You must be signed in to register for the event.' },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { name, college, track, role } = body;

    if (!name || !college || !track || !role) {
      return NextResponse.json(
        { error: 'All fields are required.' },
        { status: 400 }
      );
    }

    // ── Use admin client to bypass RLS for inserts ─────────────────────────
    const adminSupabase = createAdminClient();

    // ── Check for duplicate registration ────────────────────────────────────
    const { data: existing } = await adminSupabase
      .from('registrations')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (existing) {
      return NextResponse.json(
        {
          error: "You've already registered for NIRVAN '26.",
          passId: existing.pass_id,
          name: existing.name,
          college: existing.college,
          track: existing.track,
          role: existing.role,
        },
        { status: 409 }
      );
    }

    // ── Generate pass ID ────────────────────────────────────────────────────
    const trackShort = track.slice(0, 3).toUpperCase();
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    const passId = `#NIRVAN26-${randomCode}-${trackShort}`;

    // ── Save registration ───────────────────────────────────────────────────
    const { data: registration, error: insertError } = await adminSupabase
      .from('registrations')
      .insert({
        user_id: user.id,
        name: name.trim(),
        college: college.trim(),
        track,
        role,
        pass_id: passId,
      })
      .select()
      .single();

    if (insertError || !registration) {
      console.error('[register-event] Insert error:', insertError);
      return NextResponse.json(
        { error: 'Failed to save registration. Please try again.' },
        { status: 500 }
      );
    }

    // ── Send confirmation email (non-blocking) ──────────────────────────────
    const emailAddress = user.email!;
    sendPassEmail({
      to: emailAddress,
      name: registration.name,
      college: registration.college,
      track: registration.track,
      role: registration.role,
      passId: registration.pass_id,
    }).catch((err) => {
      console.error('[register-event] Email failed:', err);
    });

    return NextResponse.json(
      {
        message: "Registration successful! Check your email for your pass.",
        passId: registration.pass_id,
        name: registration.name,
        college: registration.college,
        track: registration.track,
        role: registration.role,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error('[register-event] Error:', err);
    return NextResponse.json(
      { error: 'Internal server error. Please try again.' },
      { status: 500 }
    );
  }
}
