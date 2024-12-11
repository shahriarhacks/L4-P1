import { Response } from "express";

interface IResponder<T> {
   statusCode: number;
   success: boolean;
   message?: string;
   data?: T;
}

const responder = <T>(res: Response, data: IResponder<T>) =>
   res.status(data.statusCode).json({
      success: data.success,
      message: data.message,
      data: data.data,
   });

export default responder;
