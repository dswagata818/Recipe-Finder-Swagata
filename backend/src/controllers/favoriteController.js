import mongoose from "mongoose";
import Favorite from "../models/Favorite.js";
import Recipe from "../models/Recipe.js";

export const addFavorite = async (req, res) => {
    try {
        const { recipeId } = req.body;

        if (
            typeof recipeId !== "string" ||
            !mongoose.isObjectIdOrHexString(recipeId)
        ) {
            return res.status(400).json({
                success: false,
                message: "A valid recipe ID is required",
                count: 0,
                favorite: null,
            });
        }

        const recipe = await Recipe.findById(recipeId);

        if (!recipe) {
            return res.status(404).json({
                success: false,
                message: "Recipe not found",
                count: 0,
                favorite: null,
            });
        }

        const existingFavorite = await Favorite.findOne({
            user: req.user,
            recipeId: recipe._id.toString(),
        });

        if (existingFavorite) {
            return res.status(409).json({
                success: false,
                message: "Recipe is already in favorites",
                count: 1,
                favorite: existingFavorite,
            });
        }

        // The compound unique index also prevents duplicates in concurrent requests.
        const favorite = await Favorite.create({
            user: req.user,
            recipeId: recipe._id.toString(),
            recipeName: recipe.name,
            category: recipe.category,
        });

        return res.status(201).json({
            success: true,
            message: "Recipe added to favorites",
            count: 1,
            favorite,
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({
                success: false,
                message: "Recipe is already in favorites",
                count: 1,
                favorite: null,
            });
        }

        console.error("Add favorite error:", error);
        return res.status(500).json({
            success: false,
            message: "Unable to add recipe to favorites",
            count: 0,
            favorite: null,
        });
    }
};

export const getFavorites = async (req, res) => {
    try {
        const favorites = await Favorite.find({ user: req.user }).sort({
            createdAt: -1,
        });

        return res.status(200).json({
            success: true,
            message: "Favorites fetched successfully",
            count: favorites.length,
            favorites,
        });
    } catch (error) {
        console.error("Fetch favorites error:", error);
        return res.status(500).json({
            success: false,
            message: "Unable to fetch favorites",
            count: 0,
            favorites: [],
        });
    }
};

export const removeFavorite = async (req, res) => {
    try {
        const { recipeId } = req.params;

        if (!mongoose.isObjectIdOrHexString(recipeId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid recipe ID",
                count: 0,
            });
        }

        // Scope deletion to the authenticated user to prevent cross-account access.
        const favorite = await Favorite.findOneAndDelete({
            user: req.user,
            recipeId: recipeId.toLowerCase(),
        });

        if (!favorite) {
            return res.status(404).json({
                success: false,
                message: "Favorite not found",
                count: 0,
            });
        }

        return res.status(200).json({
            success: true,
            message: "Recipe removed from favorites",
            count: 1,
            favorite,
        });
    } catch (error) {
        console.error("Remove favorite error:", error);
        return res.status(500).json({
            success: false,
            message: "Unable to remove recipe from favorites",
            count: 0,
        });
    }
};
