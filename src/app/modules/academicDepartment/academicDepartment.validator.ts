import { z } from "zod";

const createSchema = z.object({
   body: z.object({
      name: z.string({
         required_error: "Name is required",
         invalid_type_error: "Name must be a string",
      }),
      academicFaculty: z.string({
         required_error: "Academic Faculty is required",
         invalid_type_error: "Academic Faculty must be a string",
      }),
   }),
});
const updateSchema = z.object({
   body: z.object({
      name: z
         .string({
            invalid_type_error: "Name must be a string",
         })
         .optional(),
      academicFaculty: z
         .string({
            invalid_type_error: "Academic Faculty must be a string",
         })
         .optional(),
   }),
});

export const AcademicDepartmentValidator = {
   createSchema,
   updateSchema,
};
