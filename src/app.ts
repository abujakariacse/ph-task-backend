import express, { Application, Request, Response } from "express";
import cors from "cors";
import { userRoutes } from "./app/modules/user/user.route";
import { recipeRoutes } from "./app/modules/recipe/recipe.route";
import { paymentRoutes } from "./app/modules/purchase/purchase.route";

const app: Application = express();

app.use(express.json());
app.use(cors());

// application routes
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/recipes", recipeRoutes);
app.use("/api/v1/users", userRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("App is running");
});

export default app;
