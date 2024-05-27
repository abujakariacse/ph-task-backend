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
exports.purchaseServices = void 0;
const config_1 = __importDefault(require("../../config"));
const stripe = require("stripe")(config_1.default.stripe_secret_key);
const makePaymentAndAddCoinToProfile = (prod) => __awaiter(void 0, void 0, void 0, function* () {
    console.log({ prod });
    const product = yield stripe.products.create({
        name: prod.name,
    });
    let price;
    if (product) {
        price = yield stripe.prices.create({
            product: `${product.id}`,
            unit_amount: (prod === null || prod === void 0 ? void 0 : prod.price) * 100,
            currency: "usd",
        });
    }
    if (price.id) {
        let session = yield stripe.checkout.sessions.create({
            line_items: [
                {
                    price: `${price.id}`,
                    quantity: prod === null || prod === void 0 ? void 0 : prod.quantity,
                },
            ],
            mode: "payment",
            success_url: "http://localhost:5173/payment-success",
            cancel_url: "http://localhost:5173/payment-failed",
            customer_email: prod === null || prod === void 0 ? void 0 : prod.customerEmail,
        });
        console.log({ session });
        return session;
    }
});
exports.purchaseServices = {
    makePaymentAndAddCoinToProfile,
};
