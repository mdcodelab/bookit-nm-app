"use server";

export async function loginUser(email, password) {
  try {
    const res = await fetch("https://bookit-app-fc55.onrender.com/api/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error in loginUser action:", error);
    return { error: "Failed to login user." };
  }
}
