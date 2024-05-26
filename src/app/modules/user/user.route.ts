import express from "express";
import { userControllers } from "./user.controller";

const router = express.Router();

router.post("/create-user", userControllers.createStudent);

router.get("/get-coin", userControllers.getUserCoin);

export const userRoutes = router;
