import { NextFunction, Request, Response } from "express";

const globalErrorHandler = (
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   err: any,
   _req: Request,
   res: Response,
   _next: NextFunction,
) => {
   const statusCode = 500;
   const message = err.message || "Something went wrong!";

   return res.status(statusCode).json({
      success: false,
      message,
      error: err,
   });
};

export default globalErrorHandler;
