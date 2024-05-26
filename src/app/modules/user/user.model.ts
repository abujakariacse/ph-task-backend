import { Schema, model, connect } from "mongoose";
import { TUser } from "./user.interface";

const userSchema = new Schema<TUser>(
  {
    displayName: {
      type: String,
      required: [true, "User name is required"],
    },
    photoURL: {
      type: String,
      required: [true, "Photo Url is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
    },
    coin: {
      type: Number,
      default: 50,
    },
  },
  {
    timestamps: true,
  }
);

export const User = model<TUser>("User", userSchema);
