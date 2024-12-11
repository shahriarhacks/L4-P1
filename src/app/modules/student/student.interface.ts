import { Types } from "mongoose";
import { IUser } from "../user/user.interface";
import { IAcademicSemester } from "../academicSemester/academicSemester.interface";
import { IAcademicDepartment } from "../academicDepartment/academicDepartment.interface";

export interface IUserName {
   firstName: string;
   middleName?: string;
   lastName: string;
}

export interface IGuardian {
   fatherName: string;
   motherName: string;
   fatherOccupation: string;
   motherOccupation: string;
   fatherContactNo: string;
   motherContactNo: string;
}

export interface ILocalGuardian {
   name: string;
   occupation: string;
   contactNo: string;
   address: string;
}

export interface IStudent {
   uid: string;
   user: Types.ObjectId | IUser;
   name: IUserName;
   gender: "male" | "female" | "other";
   dateOfBirth?: string;
   email: string;
   contactNo: string;
   emergencyContactNo: string;
   bloodGroup?: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
   presentAddress: string;
   permanentAddress: string;
   guardian: IGuardian;
   localGuardian: ILocalGuardian;
   profileImg?: string;
   admissionSemester: Types.ObjectId | IAcademicSemester;
   academicDepartment: Types.ObjectId | IAcademicDepartment;
   isDeleted: boolean;
}
