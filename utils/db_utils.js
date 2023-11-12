import mongoose from "mongoose";

export const connect = async () => {
  return await mongoose.connect(process.env.MONGODB_URI, () => {});
};
