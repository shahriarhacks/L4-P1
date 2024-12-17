import { z } from "zod";
import { createUserNameValidationSchema } from "../student/student.validator";
import { BloodGroup, Gender } from "../faculty/faculty.constant";

const createAdminValidationSchema = z.object({
   body: z.object({
      designation: z.string(),
      name: createUserNameValidationSchema,
      gender: z.enum([...Gender] as [string, ...string[]]),
      dateOfBirth: z.string().optional(),
      email: z.string().email(),
      contactNo: z.string(),
      emergencyContactNo: z.string(),
      bloodGroup: z.enum([...BloodGroup] as [string, ...string[]]).optional(),
      presentAddress: z.string(),
      permanentAddress: z.string(),
      profileImg: z.string().optional(),
   }),
});

export const adminValidator = { createAdminValidationSchema };
