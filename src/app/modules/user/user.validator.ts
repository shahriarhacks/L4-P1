import { z } from "zod";

const userValidationSchema = z.object({
   password: z
      .string({
         invalid_type_error: "Password must be string",
      })
      .max(33, { message: "Password can not be more than 33 characters" })
      .min(6, { message: "Password can not be less than 6 characters" })
      .optional(),
});

export const UserValidation = {
   userValidationSchema,
};
