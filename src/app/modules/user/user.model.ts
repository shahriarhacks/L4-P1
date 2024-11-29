import { model, Schema } from "mongoose";
import bcrypt from "bcrypt";
import { IUser } from "./user.interface";
import { environment } from "../../../config/environment";

const userSchema = new Schema<IUser>(
   {
      uid: {
         type: String,
         required: true,
         unique: true,
      },
      password: {
         type: String,
         required: true,
         select: false,
      },
      needsPasswordChange: {
         type: Boolean,
         required: true,
         default: true,
      },
      role: {
         type: String,
         enum: ["admin", "student", "faculty"],
         required: true,
      },
      status: {
         type: String,
         enum: ["active", "inactive"],
         required: true,
         default: "active",
      },
      isDeleted: {
         type: Boolean,
         required: true,
         default: false,
      },
   },
   {
      timestamps: true,
   },
);

userSchema.pre("save", async function (next) {
   this.password = await bcrypt.hash(
      this.password,
      Number(environment.bcrypt_salt),
   );
   next();
});

userSchema.post("save", function (doc, next) {
   doc.password = "********";
   next();
});

export const User = model<IUser>("User", userSchema);
