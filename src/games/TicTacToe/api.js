const BASE = "https://game-room-api.fly.dev";

export async function createRoom(initialState) {
  const res = await fetch(`${BASE}/api/rooms`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ initialState }),
  });
  if (!res.ok) throw new Error("Failed to create room");
  return res.json();
}

export async function getRoom(roomId) {
  const res = await fetch(`${BASE}/api/rooms/${roomId}`);
  if (!res.ok) throw new Error("Room not found");
  return res.json();
}

export async function updateRoom(roomId, gameState) {
  const res = await fetch(`${BASE}/api/rooms/${roomId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ gameState }),
  });
  if (!res.ok) throw new Error("Failed to update room");
  return res.json();
}

export async function listRooms() {
  const res = await fetch(`${BASE}/api/rooms`);
  if (!res.ok) throw new Error("Failed to list rooms");
  return res.json();
}

export default { createRoom, getRoom, updateRoom, listRooms };
