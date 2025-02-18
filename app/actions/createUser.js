
"use server";
export async function createUser(name, email, password, rePassword) {
  try {
    const res = await fetch("https://bookit-app-fc55.onrender.com/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", 
      body: JSON.stringify({ name, email, password, rePassword }),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error in createUser action:", error);
    return { error: "Failed to register user." };
  }
}
