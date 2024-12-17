import { Types } from "mongoose";
import { IUserName } from "../student/student.interface";
import { IUser } from "../user/user.interface";

export interface IAdmin {
   uid: string;
   user: Types.ObjectId | IUser;
   designation: string;
   name: IUserName;
   gender: "male" | "female" | "other";
   dateOfBirth?: string;
   email: string;
   contactNo: string;
   emergencyContactNo: string;
   bloodGroup?: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
   presentAddress: string;
   permanentAddress: string;
   profileImg?: string;
   managementDepartment?: string;
   isDeleted: boolean;
}
