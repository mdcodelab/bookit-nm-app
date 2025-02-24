import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token"); 

    if (!token) {
      return Response.json({ error: "Not authenticated" }, { status: 401 });
    }

    // Decodifică userId din token (dacă folosești JWT)
    const decoded = jwt.verify(token.value, process.env.JWT_SECRET);
    console.log(decoded.userId);
    
    return NextResponse.json({ userId: decoded.userId });
  } catch (error) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}

export async function POST () {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token"); 
  console.log(cookieStore);
  console.log(token);
  cookiesStore.delete("auth_token");
  return NextResponse.json({success: "Signed out successful."})
}
