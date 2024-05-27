"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.recipeControllers = void 0;
const recipe_service_1 = require("./recipe.service");
const createRecipe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const recipe = req.body;
        const result = yield recipe_service_1.recipeServices.createRecipeIntoDB(recipe);
        res.status(200).json({
            success: true,
            message: "Recipe is created successfully",
            data: result,
        });
    }
    catch (err) {
        console.log(err);
    }
});
const viewRecipe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const viewerEmail = (_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.viewerEmail;
    const creatorEmail = req.body.creatorEmail;
    const recipeId = (_b = req === null || req === void 0 ? void 0 : req.body) === null || _b === void 0 ? void 0 : _b.recipeId;
    const result = yield recipe_service_1.recipeServices.viewRecipe(viewerEmail, creatorEmail, recipeId);
    res.status(200).json({
        success: true,
        message: "Recipe details updated successfully",
        data: result,
    });
});
const retriveAllRecipes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield recipe_service_1.recipeServices.getAllRecipes();
    res.status(200).json({
        success: true,
        message: "Recipes retrive successfully",
        data: result,
    });
});
const getSingleRecipe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.query;
    const result = yield recipe_service_1.recipeServices.getSingleRecipe(id);
    res.status(200).json({
        success: true,
        message: "Recipe retrieve successfully",
        data: result,
    });
});
const filterRecipeByCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let query = req.query.category;
    if (typeof query === "string") {
        query = [query];
    }
    if (typeof query === undefined) {
        query = [];
    }
    const result = yield recipe_service_1.recipeServices.filterRecipe(query);
    res.status(200).json({
        status: true,
        message: "Recipe filtered successfully",
        data: result,
    });
});
const getSuggestions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query;
    if ((query === null || query === void 0 ? void 0 : query.country) !== undefined && (query === null || query === void 0 ? void 0 : query.category) !== undefined) {
        const result = yield recipe_service_1.recipeServices.getSuggestions(query);
        console.log({ result });
        res.status(200).json({
            success: true,
            message: "Sugegstions retrieve successfully",
            data: result,
        });
    }
});
exports.recipeControllers = {
    createRecipe,
    viewRecipe,
    retriveAllRecipes,
    getSingleRecipe,
    filterRecipeByCategory,
    getSuggestions,
};
