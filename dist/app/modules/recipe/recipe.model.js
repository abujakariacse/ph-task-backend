"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Recipe = void 0;
const mongoose_1 = require("mongoose");
const recipeSchema = new mongoose_1.Schema({
    recipeName: {
        type: String,
        required: [true, "Recipe name is required"],
    },
    recipeImage: {
        type: String,
        required: [true, "Recipe image is required"],
    },
    recipeDetail: {
        type: String,
        required: [true, "Recipe details is required"],
    },
    videoCode: {
        type: String,
        required: [true, "Youtube video code is required"],
    },
    creatorEmail: {
        type: String,
        required: [true, "Creator email is required"],
    },
    category: {
        type: String,
        required: [true, "Category is required"],
    },
    country: {
        type: String,
        required: [true, "Country is required"],
    },
    purchasedBy: {
        type: [String],
        default: [],
    },
    watchCount: {
        type: Number,
        default: 0,
    },
}, {
    timestamps: true,
});
exports.Recipe = (0, mongoose_1.model)("Recipe", recipeSchema);
