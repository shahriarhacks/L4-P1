import mongoose from "mongoose";
import { environment } from "../config/environment";

export const connectMongo = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      environment.mongo_uri as string
    );
    console.log(
      `🎉👌 MONGODB Connected Successfully!!✨ with hostname: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log({ what: `🤦‍♂️ MONGODB Connection ERROR!`, why: error });
    process.exit(1);
  }
};
