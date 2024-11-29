import { Response } from "express";

interface IResponder<T> {
   statuscode: number;
   success: boolean;
   message?: string;
   data?: T;
}

const responder = <T>(res: Response, data: IResponder<T>) =>
   res.status(data.statuscode).json({
      success: data.success,
      message: data.message,
      data: data.data,
   });

export default responder;
