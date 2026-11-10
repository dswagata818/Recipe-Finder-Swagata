import api from "./api.js";

export async function getRecipes(params = {}) {
  const response = await api.get("/recipes", { params });
  return response.data;
}

export async function getRecipeById(id) {
  const response = await api.get(`/recipes/${encodeURIComponent(id)}`);
  return response.data;
}
