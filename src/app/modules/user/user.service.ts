import { TCoinIncrement, TUser } from "./user.interface";
import { User } from "./user.model";

const createUserIntoDB = async (user: TUser) => {
  const email = user?.email;
  const isUserExist = await User.findOne({ email });

  if (isUserExist) {
    return {
      result: "User already exist",
    };
  }

  const result = await User.create(user);
  return result;
};

const getUserCoinFromDB = async (email: string) => {
  if (email) {
    const result = await User.findOne({ email }, "coin");
    return result;
  }
};

const updateUserCoin = async (data: TCoinIncrement) => {
  const result = await User.findOneAndUpdate(
    { email: data?.email },
    { $inc: { coin: data?.coin } },
    { new: true }
  );

  return result;
};

export const userServices = {
  createUserIntoDB,
  getUserCoinFromDB,
  updateUserCoin,
};
