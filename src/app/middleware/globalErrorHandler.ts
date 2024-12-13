import { NextFunction, Request, Response } from "express";
import { TDetails } from "../types/error";
import { environment } from "../../config/environment";
import { ZodError } from "zod";
import zodErrorHandler from "../errors/zodError";
import validationError from "../errors/validationError";
import castErrorHandler from "../errors/castError";

const globalErrorHandler = (
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   error: any,
   _req: Request,
   res: Response,
   _next: NextFunction,
) => {
   let statusCode = error.statusCode || 500;
   let message = error.message || "Something went wrong!";
   let details: TDetails[] = [
      {
         path: "error",
         message: "Something went wrong!",
      },
   ];

   if (error instanceof ZodError) {
      const simplifiedError = zodErrorHandler(error);
      statusCode = simplifiedError.statusCode;
      message = simplifiedError.message;
      details = simplifiedError.details;
   } else if (error?.name === "ValidationError") {
      const simplifiedError = validationError(error);
      statusCode = simplifiedError.statusCode;
      message = simplifiedError.message;
      details = simplifiedError.details;
   } else if (error?.name === "CastError") {
      const simplifiedError = castErrorHandler(error);
      statusCode = simplifiedError.statusCode;
      message = simplifiedError.message;
      details = simplifiedError.details;
   }

   res.status(statusCode).json({
      success: false,
      message,
      details,
      // error,
      stack: environment.env === "development" ? error.stack : "🥞",
   });
};

export default globalErrorHandler;
