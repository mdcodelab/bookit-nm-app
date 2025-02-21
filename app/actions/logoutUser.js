"use server";

export async function logoutUser() {
  try {
    const res = await fetch("http://localhost:3000/api/logout", {
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
