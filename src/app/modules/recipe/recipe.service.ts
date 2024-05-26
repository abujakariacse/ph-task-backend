import mongoose from "mongoose";
import { User } from "../user/user.model";
import { TRecipe } from "./recipe.interface";
import { Recipe } from "./recipe.model";

const createRecipeIntoDB = async (recipe: TRecipe) => {
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

export const recipeServices = {
  createRecipeIntoDB,
};
