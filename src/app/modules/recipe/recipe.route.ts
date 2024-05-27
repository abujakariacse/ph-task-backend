import express from "express";
import { recipeControllers } from "./recipe.controller";

const router = express.Router();

router.get("/", recipeControllers.retriveAllRecipes);

router.get("/get-one", recipeControllers.getSingleRecipe);

router.post("/create-recipe", recipeControllers.createRecipe);

router.post("/view-recipe", recipeControllers.viewRecipe);

router.get("/filter", recipeControllers.filterRecipeByCategory);

export const recipeRoutes = router;
