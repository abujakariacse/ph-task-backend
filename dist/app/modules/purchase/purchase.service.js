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
exports.purchaseServices = void 0;
const stripe = require("stripe")("sk_test_51L3CyAHOPT1y061MMwyV3Ch7IqE68OBUUJ8Ib0PGk6NVzKWOHW5ghwipv6yn0Gjjrwgo6S1lBNxA0TA6vtqJvKaw001Pna2zaR");
const makePaymentAndAddCoinToProfile = (prod) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield stripe.products.create({
        name: prod.name,
    });
    console.log({ product });
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
            success_url: "http://localhost:3000/success",
            cancel_url: "http://localhost:3000/cancel",
            customer_email: "demo@gmail.com",
        });
        return session;
    }
});
exports.purchaseServices = {
    makePaymentAndAddCoinToProfile,
};
