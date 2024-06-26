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
exports.userServices = void 0;
const recipe_model_1 = require("../recipe/recipe.model");
const user_model_1 = require("./user.model");
const createUserIntoDB = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const email = user === null || user === void 0 ? void 0 : user.email;
    if (!email) {
        console.log("Data not found");
        return;
    }
    const isUserExist = yield user_model_1.User.findOne({ email });
    if (isUserExist) {
        return {
            result: "User already exist",
        };
    }
    const result = yield user_model_1.User.create(user);
    return result;
});
const getUserCoinFromDB = (email) => __awaiter(void 0, void 0, void 0, function* () {
    if (email) {
        const result = yield user_model_1.User.findOne({ email }, "coin");
        return result;
    }
});
const updateUserCoin = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findOneAndUpdate({ email: data === null || data === void 0 ? void 0 : data.email }, { $inc: { coin: data === null || data === void 0 ? void 0 : data.coin } }, { new: true });
    return result;
});
const getUserCountRecipeCount = () => __awaiter(void 0, void 0, void 0, function* () {
    const userCount = yield user_model_1.User.countDocuments({});
    const recipeCount = yield recipe_model_1.Recipe.countDocuments({});
    return {
        userCount: userCount,
        recipeCount: recipeCount,
    };
});
exports.userServices = {
    createUserIntoDB,
    getUserCoinFromDB,
    updateUserCoin,
    getUserCountRecipeCount,
};
