import mongoose, { ObjectId } from "mongoose";
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

export const recipeServices = {
  createRecipeIntoDB,
  viewRecipe,
};
