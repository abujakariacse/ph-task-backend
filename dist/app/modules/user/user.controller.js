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
exports.userControllers = void 0;
const user_service_1 = require("./user.service");
const createStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.body;
        const result = yield user_service_1.userServices.createUserIntoDB(user);
        res.status(200).json({
            success: true,
            message: "User is created successfully",
            data: result,
        });
    }
    catch (error) {
        console.log(error);
    }
});
const getUserCoin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const email = (_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.email;
    const result = yield user_service_1.userServices.getUserCoinFromDB(email);
    res.status(200).json({
        success: true,
        message: "Coin retrive successfully",
        data: result,
    });
});
const rechargeCoin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const result = yield user_service_1.userServices.updateUserCoin(data);
    res.status(200).json({
        success: true,
        message: "Coin added to your account",
        data: result,
    });
});
const getUserAndRecipeCount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.userServices.getUserCountRecipeCount();
    res.status(200).json({
        success: true,
        message: "User and Recipe retrive successfully",
        data: result,
    });
});
exports.userControllers = {
    createStudent,
    getUserCoin,
    rechargeCoin,
    getUserAndRecipeCount,
};
