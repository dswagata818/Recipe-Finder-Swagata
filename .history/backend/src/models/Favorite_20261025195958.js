
import mongoose from "mongoose";

const favoriteSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        recipeId: {
            type: String,
            required: true,
            trim: true,
        },

        recipeName: {
            type: String,
            required: true,
            trim: true,
        },

        image: {
            type: String,
            default: "",
        },

        category: {
            type: String,
            default: "",
        },
    },
    {
        timestamps: true,
    }
);

// A user cannot save the same recipe twice.
favoriteSchema.index(
    { user: 1, recipeId: 1 },
    { unique: true }
);

const Favorite = mongoose.model("Favorite", favoriteSchema);

export default Favorite;
