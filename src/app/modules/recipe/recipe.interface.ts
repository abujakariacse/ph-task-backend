export type TRecipe = {
  recipeName: string;
  recipeImage: string;
  recipeDetail: string;
  videoCode: string;
  country: string;
  category: string;
  creatorEmail: string;
  watchCount: number;
  purchasedBy: string[];
};

export type TQueryParam = {
  query: {
    category: string[];
  };
};
