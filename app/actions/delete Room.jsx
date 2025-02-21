"use server"

export async function createRoom(prevState, formData) {
  try {
    const response = await fetch("http://localhost:3000/api/room", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (!response.ok) {
      return { success: false, error: data.error || "Something went wrong" };
    }

    return { success: true };
  } catch (error) {
    console.error("Error creating room:", error);
    return { success: false, error: "Server error" };
  }
}
