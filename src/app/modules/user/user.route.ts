import express from "express";
import { studentControllers } from "./user.controller";

const router = express.Router();

router.post("/create-user", studentControllers.createStudent);

export const userRoutes = router;
