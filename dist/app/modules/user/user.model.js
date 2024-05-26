"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    displayName: {
        type: String,
        required: [true, "User name is required"],
    },
    photoURL: {
        type: String,
        required: [true, "Photo Url is required"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
    },
    coin: {
        type: Number,
        default: 50,
    },
}, {
    timestamps: true,
});
exports.User = (0, mongoose_1.model)("User", userSchema);
