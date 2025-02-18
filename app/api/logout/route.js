import { NextResponse } from "next/server";


export async function POST(request) {
  try {
    // Creăm un răspuns gol (sau cu un mesaj)
    const response = NextResponse.json({ success: "Logged out successfully." });
    
    response.cookies.set("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 0, 
      path: "/",
    });
    
    return response;
  } catch (error) {
    console.error("Error in logout API:", error);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
