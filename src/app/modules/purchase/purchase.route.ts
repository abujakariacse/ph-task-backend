import express from "express";
import { purchaseControllers } from "./purchase.controller";

const router = express.Router();

router.post("/create-checkout-session", purchaseControllers.makePayment);

export const paymentRoutes = router;
