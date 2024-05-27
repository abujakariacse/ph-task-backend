import { TUser } from "./user.interface";
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

export const userServices = {
  createUserIntoDB,
  getUserCoinFromDB,
};
