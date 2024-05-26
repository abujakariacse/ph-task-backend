import express from "express";
import { recipeControllers } from "./recipe.controller";

const router = express.Router();

router.post("/create-recipe", recipeControllers.createRecipe);

export const recipeRoutes = router;
