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

export const userServices = {
  createUserIntoDB,
};
