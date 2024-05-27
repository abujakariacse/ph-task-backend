"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const user_route_1 = require("./app/modules/user/user.route");
const recipe_route_1 = require("./app/modules/recipe/recipe.route");
const purchase_route_1 = require("./app/modules/purchase/purchase.route");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// application routes
app.use("/api/v1/payment", purchase_route_1.paymentRoutes);
app.use("/api/v1/recipes", recipe_route_1.recipeRoutes);
app.use("/api/v1/users", user_route_1.userRoutes);
app.get("/", (req, res) => {
    res.send("App is running");
});
exports.default = app;
