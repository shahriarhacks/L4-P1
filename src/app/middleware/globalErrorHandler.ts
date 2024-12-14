import { NextFunction, Request, Response } from "express";
import { TDetails } from "../types/error";
import { environment } from "../../config/environment";
import { ZodError } from "zod";
import zodErrorHandler from "../errors/zodError";
import validationError from "../errors/validationError";
import castErrorHandler from "../errors/castError";
import duplicateKeyEntry from "../errors/duplicateKeyEntry";
import ApplicationError from "../errors/applicationError";

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
   } else if (error?.code === 11000) {
      const simplifiedError = duplicateKeyEntry(error);
      statusCode = simplifiedError.statusCode;
      message = simplifiedError.message;
      details = simplifiedError.details;
   } else if (error instanceof ApplicationError) {
      statusCode = error.statusCode;
      message = error.message;
      details = [
         {
            path: "error",
            message: error.message,
         },
      ];
   } else if (error instanceof Error) {
      message = error.message;
      details = [
         {
            path: "error",
            message: error.message,
         },
      ];
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
