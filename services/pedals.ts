export async function getPedals() {
  try {
    const response = await fetch(
      `${process.env.PEDALS_API_URL}/api/v1/pedals`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    return response.json()
  } catch (error) {
    console.error("Error fetching pedals:", error)
  }
}
