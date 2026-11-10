import mongoose from "mongoose";
import Recipe from "../models/Recipe.js";

export const getRecipes = async (req, res) => {
    try {
        const filters = {};
        const { search, category } = req.query;

        if (search !== undefined && typeof search !== "string") {
            return res.status(400).json({
                success: false,
                message: "Search must be a single string",
                count: 0,
                recipes: [],
            });
        }

        if (category !== undefined && typeof category !== "string") {
            return res.status(400).json({
                success: false,
                message: "Category must be a single string",
                count: 0,
                recipes: [],
            });
        }

        if (search?.trim()) {
            // Escape user input so it is matched as literal text, not a regular expression.
            const searchTerm = search.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
            filters.$or = [
                { name: { $regex: searchTerm, $options: "i" } },
                { ingredients: { $regex: searchTerm, $options: "i" } },
            ];
        }

        if (category?.trim()) {
            filters.category = category.trim();
        }

        const recipes = await Recipe.find(filters);

        return res.status(200).json({
            success: true,
            message: "Recipes fetched successfully",
            count: recipes.length,
            recipes,
        });
    } catch (error) {
        console.error("Recipe fetch error:", error);

        return res.status(500).json({
            success: false,
            message: "Unable to fetch recipes",
            count: 0,
            recipes: [],
        });
    }
};

export const getRecipeById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.isObjectIdOrHexString(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid recipe ID",
                count: 0,
                recipe: null,
            });
        }

        const recipe = await Recipe.findById(id);

        if (!recipe) {
            return res.status(404).json({
                success: false,
                message: "Recipe not found",
                count: 0,
                recipe: null,
            });
        }

        return res.status(200).json({
            success: true,
            message: "Recipe fetched successfully",
            count: 1,
            recipe,
        });
    } catch (error) {
        console.error("Recipe fetch by ID error:", error);

        return res.status(500).json({
            success: false,
            message: "Unable to fetch recipe",
            count: 0,
            recipe: null,
        });
    }
};
