import { Request, Response } from "express";
import { userServices } from "./user.service";
import { TCoinIncrement } from "./user.interface";

const createStudent = async (req: Request, res: Response) => {
  try {
    const user = req.body;
    const result = await userServices.createUserIntoDB(user);
    res.status(200).json({
      success: true,
      message: "User is created successfully",
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

const getUserCoin = async (req: Request, res: Response) => {
  const email = req?.body?.email;
  const result = await userServices.getUserCoinFromDB(email);
  res.status(200).json({
    success: true,
    message: "Coin retrive successfully",
    data: result,
  });
};

const rechargeCoin = async (req: Request, res: Response) => {
  const data = req.body;
  const result = await userServices.updateUserCoin(data as TCoinIncrement);
  res.status(200).json({
    success: true,
    message: "Coin added to your account",
    data: result,
  });
};

const getUserAndRecipeCount = async (req: Request, res: Response) => {
  const result = await userServices.getUserCountRecipeCount();
  res.status(200).json({
    success: true,
    message: "User and Recipe retrive successfully",
    data: result,
  });
};

export const userControllers = {
  createStudent,
  getUserCoin,
  rechargeCoin,
  getUserAndRecipeCount,
};
