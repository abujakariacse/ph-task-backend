import mongoose, { ObjectId } from "mongoose";
import { User } from "../user/user.model";
import { TQueryParam, TRecipe, TSuggestionQuery } from "./recipe.interface";
import { Recipe } from "./recipe.model";
import { Types } from "mongoose";

const createRecipeIntoDB = async (recipe: TRecipe) => {
  console.log({ recipe });

  const creatorEmail = recipe.creatorEmail;
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // Create recipe into DB
    const result = await Recipe.create([recipe], { session });

    // Update user coin for add recipe
    const userUpdateResult = await User.findOneAndUpdate(
      { email: creatorEmail },
      { $inc: { coin: 1 } },
      { new: true, session }
    );

    // Throwing error if user not found
    if (!userUpdateResult) {
      throw new Error("User not found");
    }
    await session.commitTransaction();
    return result[0];
  } catch (err) {
    await session.abortTransaction();
    throw err;
  } finally {
    session.endSession();
  }
};

const viewRecipe = async (
  viewerEmail: string,
  creatorEmail: string,
  recipeId: ObjectId
) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Update viewer's coin decrement by 10
    await User.findOneAndUpdate(
      { email: viewerEmail },
      { $inc: { coin: -10 } },
      { session }
    );

    // Update recipe creator's coin increment by 1
    await User.findOneAndUpdate(
      { email: creatorEmail },
      { $inc: { coin: 1 } },
      { session }
    );

    // Update recipe details: Increment watchCount by 1, push viewerEmail to purchasedBy array
    const updatedRecipe = await Recipe.findByIdAndUpdate(
      { _id: recipeId },
      {
        $inc: { watchCount: 1 },
        $addToSet: { purchasedBy: viewerEmail },
      },
      { new: true, session }
    );

    await session.commitTransaction();
    session.endSession();

    return updatedRecipe;
  } catch (error: any) {
    await session.abortTransaction();
    session.endSession();
    throw new Error("Error updating recipe details: " + error.message);
  }
};

const getAllRecipes = async () => {
  const result = await Recipe.find({});
  return result;
};

const getSingleRecipe = async (id: string) => {
  const result = await Recipe.findOne({ _id: id });
  return result;
};

const filterRecipe = async (categories: TQueryParam) => {
  if (!Array.isArray(categories)) {
    throw new Error("Categories should be an array");
  }
  const recipes = await Recipe.find({ category: { $in: categories } });
  return recipes;
};

const getSuggestions = async (query: TSuggestionQuery) => {
  const recipes = await Recipe.find({
    $or: [{ country: query?.country }, { category: query?.category }],
  });

  return recipes;
};

export const recipeServices = {
  createRecipeIntoDB,
  viewRecipe,
  getAllRecipes,
  getSingleRecipe,
  filterRecipe,
  getSuggestions,
};
