import { NextFunction, Request, Response } from "express";

const globalErrorHandler = (
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   error: any,
   _req: Request,
   res: Response,
   _next: NextFunction,
) => {
   const statusCode = 500;
   const message = error.message || "Something went wrong!";

   res.status(statusCode).json({
      success: false,
      message,
      error: error,
   });
};

export default globalErrorHandler;
