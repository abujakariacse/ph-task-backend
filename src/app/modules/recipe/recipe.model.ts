import { model, Schema } from "mongoose";
import { TRecipe } from "./recipe.interface";

const recipeSchema = new Schema<TRecipe>(
  {
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
    purchased_by: {
      type: [String],
      default: [],
    },
    watchCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export const Recipe = model<TRecipe>("Recipe", recipeSchema);
