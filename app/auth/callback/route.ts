import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase-server';

// This route handles the OAuth callback from Supabase (Google sign-in redirect)
export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const origin = requestUrl.origin;

  if (code) {
    const supabase = createClient();
    await supabase.auth.exchangeCodeForSession(code);
  }

  // Redirect back to home page after successful auth
  return NextResponse.redirect(`${origin}/`);
}
