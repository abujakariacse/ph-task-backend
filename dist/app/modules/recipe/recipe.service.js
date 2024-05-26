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
exports.recipeServices = void 0;
const user_model_1 = require("../user/user.model");
const recipe_model_1 = require("./recipe.model");
const createRecipeIntoDB = (recipe) => __awaiter(void 0, void 0, void 0, function* () {
    const creatorEmail = recipe.creatorEmail;
    const result = yield recipe_model_1.Recipe.create(recipe);
    const addPoint = yield user_model_1.User.findOneAndUpdate({ email: creatorEmail }, { $inc: { coin: 1 } }, { new: true });
    console.log(addPoint);
    return result;
});
exports.recipeServices = {
    createRecipeIntoDB,
};
