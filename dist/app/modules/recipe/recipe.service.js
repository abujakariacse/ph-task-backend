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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.recipeServices = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const user_model_1 = require("../user/user.model");
const recipe_model_1 = require("./recipe.model");
const createRecipeIntoDB = (recipe) => __awaiter(void 0, void 0, void 0, function* () {
    const creatorEmail = recipe.creatorEmail;
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        // Create recipe into DB
        const result = yield recipe_model_1.Recipe.create([recipe], { session });
        // Update user coin for add recipe
        const userUpdateResult = yield user_model_1.User.findOneAndUpdate({ email: creatorEmail }, { $inc: { coin: 1 } }, { new: true, session });
        // Throwing error if user not found
        if (!userUpdateResult) {
            throw new Error("User not found");
        }
        yield session.commitTransaction();
        return result[0];
    }
    catch (err) {
        yield session.abortTransaction();
        throw err;
    }
    finally {
        session.endSession();
    }
});
const viewRecipe = (viewerEmail, creatorEmail, recipeId) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    session.startTransaction();
    try {
        // Update viewer's coin decrement by 10
        yield user_model_1.User.findOneAndUpdate({ email: viewerEmail }, { $inc: { coin: -10 } }, { session });
        // Update recipe creator's coin increment by 1
        yield user_model_1.User.findOneAndUpdate({ email: creatorEmail }, { $inc: { coin: 1 } }, { session });
        // Update recipe details: Increment watchCount by 1, push viewerEmail to purchasedBy array
        const updatedRecipe = yield recipe_model_1.Recipe.findByIdAndUpdate({ _id: recipeId }, {
            $inc: { watchCount: 1 },
            $addToSet: { purchasedBy: viewerEmail },
        }, { new: true, session });
        yield session.commitTransaction();
        session.endSession();
        return updatedRecipe;
    }
    catch (error) {
        yield session.abortTransaction();
        session.endSession();
        throw new Error("Error updating recipe details: " + error.message);
    }
});
exports.recipeServices = {
    createRecipeIntoDB,
    viewRecipe,
};
