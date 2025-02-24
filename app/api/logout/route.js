// app/api/logout/route.js
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
  const cookieStore = await cookies();
  cookieStore.delete('auth_token');

  return NextResponse.json({ success: 'Signed out successfully.' }, { status: 200 });
}
