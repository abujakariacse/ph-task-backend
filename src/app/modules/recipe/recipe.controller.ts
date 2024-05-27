import { Request, Response } from "express";
import { recipeServices } from "./recipe.service";
import { Types } from "mongoose";
import { TQueryParam, TSuggestionQuery } from "./recipe.interface";

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

const retriveAllRecipes = async (req: Request, res: Response) => {
  const result = await recipeServices.getAllRecipes();
  res.status(200).json({
    success: true,
    message: "Recipes retrive successfully",
    data: result,
  });
};

const getSingleRecipe = async (req: Request, res: Response) => {
  const { id } = req.query;
  const result = await recipeServices.getSingleRecipe(id as string);
  res.status(200).json({
    success: true,
    message: "Recipe retrieve successfully",
    data: result,
  });
};

const filterRecipeByCategory = async (req: Request, res: Response) => {
  let query = req.query.category;
  if (typeof query === "string") {
    query = [query];
  }
  if (typeof query === undefined) {
    query = [];
  }

  const result = await recipeServices.filterRecipe(query as TQueryParam);
  res.status(200).json({
    status: true,
    message: "Recipe filtered successfully",
    data: result,
  });
};

const getSuggestions = async (req: Request, res: Response) => {
  const query = req.query;

  if (query?.country !== undefined && query?.category !== undefined) {
    const result = await recipeServices.getSuggestions(
      query as TSuggestionQuery
    );

    res.status(200).json({
      success: true,
      message: "Sugegstions retrieve successfully",
      data: result,
    });
  }
};

const findRecipe = async (req: Request, res: Response) => {
  const { search } = req.query;
  const result = await recipeServices.getFoundRecipe(search as string);
  res.status(200).json({
    success: true,
    message: "Search result retrieve",
    data: result,
  });
};
export const recipeControllers = {
  createRecipe,
  viewRecipe,
  retriveAllRecipes,
  getSingleRecipe,
  filterRecipeByCategory,
  getSuggestions,
  findRecipe,
};
