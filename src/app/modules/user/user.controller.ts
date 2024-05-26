import { Request, Response } from "express";
import { userServices } from "./user.service";

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

export const userControllers = {
  createStudent,
  getUserCoin,
};
