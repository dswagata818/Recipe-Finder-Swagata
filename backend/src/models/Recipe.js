import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },

        description: {
            type: String,
            required: true,
        },

        category: {
            type: String,
            enum: ["Vegetarian", "Non-Vegetarian"],
            required: true,
        },

        cookingTime: {
            type: Number,
            required: true,
        },

        ingredients: {
            type: [String],
            required: true,
        },

        instructions: {
            type: [String],
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Recipe = mongoose.model("Recipe", recipeSchema);

export default Recipe;