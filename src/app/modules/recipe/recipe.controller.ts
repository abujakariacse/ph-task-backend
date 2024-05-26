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

const viewRecipe = async (req: Request, res: Response) => {
  const viewerEmail = req?.body?.viewerEmail;
  const creatorEmail = req.body.creatorEmail;
  const recipeId = req?.body?.recipeId;

  const result = await recipeServices.viewRecipe(
    viewerEmail,
    creatorEmail,
    recipeId
  );
  res.status(200).json({
    success: true,
    message: "Recipe details updated successfully",
    data: result,
  });
};

export const recipeControllers = {
  createRecipe,
  viewRecipe,
};
