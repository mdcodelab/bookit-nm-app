import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

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
    
    return Response.json({ userId: decoded.userId });
  } catch (error) {
    return Response.json({ error: "Invalid token" }, { status: 401 });
  }
}
