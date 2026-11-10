import api from "./api.js";

export async function getFavorites() {
  const response = await api.get("/favorites");
  return response.data;
}

export async function addFavorite(recipeId) {
  const response = await api.post("/favorites", { recipeId });
  return response.data;
}

export async function removeFavorite(recipeId) {
  const response = await api.delete(`/favorites/${encodeURIComponent(recipeId)}`);
  return response.data;
}
