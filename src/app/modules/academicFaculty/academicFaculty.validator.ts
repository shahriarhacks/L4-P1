import { z } from "zod";

const createSchema = z.object({
   body: z.object({
      name: z
         .string({ required_error: "Name is required" })
         .min(3, "Name must be at least 3 characters long"),
   }),
});

export const AcademicFacultyValidator = { createSchema };
