"use server";

export async function logoutUser() {
  try {
    const res = await fetch("https://bookit-app-fc55.onrender.com/api/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error in logoutUser action:", error);
    return { error: "Failed to logout." };
  }
}
