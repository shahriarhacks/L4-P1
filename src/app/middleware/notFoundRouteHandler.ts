import { NextFunction, Request, Response } from "express";

export const notFoundRouteHandler = (
   _req: Request,
   res: Response,
   _next: NextFunction,
): void => {
   res.status(404).json({
      success: false,
      message: "API Not Found !!",
      error: "Requesting route aren't exist on our server!",
   });
};
