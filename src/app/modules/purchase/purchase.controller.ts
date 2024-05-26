import { Request, Response } from "express";
import { purchaseServices } from "./purchase.service";

const makePayment = async (req: Request, res: Response) => {
  console.log("Controller hitted");
  const product = req.body;

  const result = await purchaseServices.makePaymentAndAddCoinToProfile(product);
  res.json(result);
};

export const purchaseControllers = {
  makePayment,
};
