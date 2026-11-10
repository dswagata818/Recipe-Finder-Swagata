import express from "express";
import {
    getRecipeById,
    getRecipes,
} from "../controllers/recipeController.js";

const router = express.Router();

router.get("/", getRecipes);
router.get("/:id", getRecipeById);

export default router;
