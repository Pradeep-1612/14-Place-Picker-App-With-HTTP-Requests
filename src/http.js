export async function fetchAvailablePlaces() {
  const response = await fetch("http://localhost:3000/places");
  if (!response.ok) {
    throw new Error("Failed to fetch places!");
  }
  const jsonResponse = await response.json();
  return jsonResponse.places;
}

export async function updateUserPlaces(places) {
  const response = await fetch("http://localhost:3000/user-places", {
    method: "PUT",
    body: JSON.stringify({ places }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Failed to update the selected place.");
  }
  const jsonResponse = await response.json();
  return jsonResponse;
}

export async function fetchUserPlaces() {
    const response = await fetch("http://localhost:3000/user-places");
    if (!response.ok) {
      throw new Error("Failed to fetch user places!");
    }
    const jsonResponse = await response.json();
    return jsonResponse.places;
  }