"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.recipeRoutes = void 0;
const express_1 = __importDefault(require("express"));
const recipe_controller_1 = require("./recipe.controller");
const router = express_1.default.Router();
router.get("/", recipe_controller_1.recipeControllers.retriveAllRecipes);
router.get("/get-one", recipe_controller_1.recipeControllers.getSingleRecipe);
router.post("/create-recipe", recipe_controller_1.recipeControllers.createRecipe);
router.post("/view-recipe", recipe_controller_1.recipeControllers.viewRecipe);
router.get("/filter", recipe_controller_1.recipeControllers.filterRecipeByCategory);
router.get("/suggestion", recipe_controller_1.recipeControllers.getSuggestions);
router.get("/find", recipe_controller_1.recipeControllers.findRecipe);
exports.recipeRoutes = router;
