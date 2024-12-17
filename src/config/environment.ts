import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export const environment = {
   env: process.env.NODE_ENV,
   port: process.env.PORT,
   mongo_uri: process.env.DB_URI_MONGO,
   bcrypt_salt: process.env.BCRYPT_SALT_ROUNDS,
   student_def_pass: process.env.STUDENT_DEF_PASS,
   faculty_def_pass: process.env.FACULTY_DEF_PASS,
};
