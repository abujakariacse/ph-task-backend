import { Request, Response } from "express";
import { recipeServices } from "./recipe.service";

const createRecipe = async (req: Request, res: Response) => {
  try {
    const recipe = req.body;
    const result = await recipeServices.createRecipeIntoDB(recipe);
    res.status(200).json({
      success: true,
      message: "Recipe is created successfully",
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

export const recipeControllers = {
  createRecipe,
};
