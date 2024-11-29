export interface IUser {
   uid: string;
   password: string;
   needsPasswordChange: boolean;
   role: string;
   status: string;
   isDeleted: boolean;
}
