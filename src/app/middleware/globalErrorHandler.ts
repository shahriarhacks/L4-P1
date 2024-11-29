import { ErrorRequestHandler } from "express";
import { environment } from "../../config/environment";

const globalErrorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
   error.statusCode = error.statusCode || 500;
   error.message = error.message || "Internal Server Error";

   res.status(error.statusCode).json({
      success: false,
      message: error.message,
      error: environment.env === "development" ? error.errors : null,
      stack: environment.env === "development" ? error.stack : null,
   });
};
export default globalErrorHandler;
