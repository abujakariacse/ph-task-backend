import { User } from "../user/user.model";
import { TRecipe } from "./recipe.interface";
import { Recipe } from "./recipe.model";

const createRecipeIntoDB = async (recipe: TRecipe) => {
  const creatorEmail = recipe.creatorEmail;
  const result = await Recipe.create(recipe);

  const addPoint = await User.findOneAndUpdate(
    { email: creatorEmail },
    { $inc: { coin: 1 } },
    { new: true }
  );

  console.log(addPoint);
  return result;
};

export const recipeServices = {
  createRecipeIntoDB,
};
