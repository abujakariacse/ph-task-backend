import express from "express";
import { recipeControllers } from "./recipe.controller";

const router = express.Router();

router.get("/", recipeControllers.retriveAllRecipes);

router.get("/get-one", recipeControllers.getSingleRecipe);

router.post("/create-recipe", recipeControllers.createRecipe);

router.post("/view-recipe", recipeControllers.viewRecipe);

router.get("/filter", recipeControllers.filterRecipeByCategory);

router.get("/suggestion", recipeControllers.getSuggestions);

router.get("/find", recipeControllers.findRecipe);

export const recipeRoutes = router;
