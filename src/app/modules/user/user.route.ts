import express from "express";
import { userControllers } from "./user.controller";

const router = express.Router();

router.post("/create-user", userControllers.createStudent);

router.post("/get-coin", userControllers.getUserCoin);

export const userRoutes = router;
