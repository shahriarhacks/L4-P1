import { ZodError, ZodIssue } from "zod";
import { TGenericErrorResponse } from "../types/error";

const zodErrorHandler = (error: ZodError): TGenericErrorResponse => {
   const details = error.errors.map((err: ZodIssue) => ({
      path: err.path[err.path.length - 1],
      message: err.message,
   }));
   return {
      statusCode: 400,
      message: "Validation error",
      details,
   };
};
export default zodErrorHandler;
