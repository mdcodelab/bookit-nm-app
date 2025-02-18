import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

// Funcție pentru a verifica și decoda token-ul JWT
async function verifyToken(token) {
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    return await jwtVerify(token, secret);
  } catch (error) {
    return null;
  }
}

// Middleware-ul propriu-zis
export async function middleware(req) {
  const token = req.cookies.get("token")?.value;

  // Dacă nu există token, redirecționează la login
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Verifică validitatea token-ului
  const verified = await verifyToken(token);
  if (!verified) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next(); // Permite accesul la ruta protejată
}

// Aplică middleware-ul doar pe rutele care încep cu `/dashboard` sau `/profile`
export const config = {
  matcher: ["/bookings", "/rooms/add", "/rooms/my"],
};
