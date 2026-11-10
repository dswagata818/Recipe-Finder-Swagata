import api from "./api.js";

// Fetch all recipes with optional search and category filters
export const getRecipes = async (params = {}) => {
  const response = await api.get("/recipes", { params });
  return response.data;
};

// Fetch a single recipe by its ID
export const getRecipeById = async (id) => {
  const response = await api.get(`/recipes/${id}`);
  return response.data;
};