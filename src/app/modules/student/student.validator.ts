import { z } from "zod";

const bloodGroup = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"] as const;

const createUserNameSchema = z.object({
   firstName: z.string({
      required_error: "First name is required",
      invalid_type_error: "First name must be a string",
   }),
   middleName: z.string().optional(),
   lastName: z.string({
      required_error: "Last name is required",
      invalid_type_error: "Last name must be a string",
   }),
});

const createGuardianSchema = z.object({
   fatherName: z.string({
      required_error: "Father's name is required",
      invalid_type_error: "Father's name must be a string",
   }),
   fatherOccupation: z.string({
      required_error: "Father's occupation is required",
      invalid_type_error: "Father's occupation must be a string",
   }),
   fatherContactNo: z.string({
      required_error: "Father's contact number is required",
      invalid_type_error: "Father's contact number must be a string",
   }),
   motherName: z.string({
      required_error: "Mother's name is required",
      invalid_type_error: "Mother's name must be a string",
   }),
   motherOccupation: z.string({
      required_error: "Mother's occupation is required",
      invalid_type_error: "Mother's occupation must be a string",
   }),
   motherContactNo: z.string({
      required_error: "Mother's contact number is required",
      invalid_type_error: "Mother's contact number must be a string",
   }),
});

const createLocalGuardianSchema = z.object({
   name: z.string({
      required_error: "Local guardian's name is required",
      invalid_type_error: "Local guardian's name must be a string",
   }),
   occupation: z.string({
      required_error: "Local guardian's occupation is required",
      invalid_type_error: "Local guardian's occupation must be a string",
   }),
   contactNo: z.string({
      required_error: "Local guardian's contact number is required",
      invalid_type_error: "Local guardian's contact number must be a string",
   }),
   address: z.string({
      required_error: "Local guardian's address is required",
      invalid_type_error: "Local guardian's address must be a string",
   }),
});

const createStudentSchema = z.object({
   body: z.object({
      uid: z.string({
         required_error: "UID is required",
         invalid_type_error: "UID must be a string",
      }),
      user: z.string({
         required_error: "User is required",
         invalid_type_error: "User must be a string",
      }),
      name: createUserNameSchema,
      gender: z.enum(["male", "female", "other"], {
         required_error: "Gender is required",
         invalid_type_error:
            "Gender must be one of 'male', 'female', or 'other'",
      }),
      dateOfBirth: z
         .string({ invalid_type_error: "Date of birth must be a string" })
         .optional(),
      email: z
         .string({
            required_error: "Email is required",
            invalid_type_error: "Email must be a string",
         })
         .email("Invalid email format"),
      contactNo: z.string({
         required_error: "Contact number is required",
         invalid_type_error: "Contact number must be a string",
      }),
      emergencyContactNo: z.string({
         required_error: "Emergency contact number is required",
         invalid_type_error: "Emergency contact number must be a string",
      }),
      bloodGroup: z
         .enum(bloodGroup, {
            invalid_type_error:
               "Blood group must be one of the predefined values",
         })
         .optional(),
      presentAddress: z.string({
         required_error: "Present address is required",
         invalid_type_error: "Present address must be a string",
      }),
      permanentAddress: z.string({
         required_error: "Permanent address is required",
         invalid_type_error: "Permanent address must be a string",
      }),
      guardian: createGuardianSchema,
      localGuardian: createLocalGuardianSchema,
      profileImg: z
         .string({ invalid_type_error: "Profile image must be a string" })
         .optional(),
      isDeleted: z
         .boolean({ invalid_type_error: "IsDeleted must be a boolean" })
         .default(false),
   }),
});

export const studentValidator = { createStudentSchema };
