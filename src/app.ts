import express, { Application, Request, Response } from "express";
import cors from "cors";
import globalErrorHandler from "./app/middleware/globalErrorHandler";
import { notFoundRouteHandler } from "./app/middleware/notFoundRouteHandler";
import router from "./app/routes";

const app: Application = express();

//Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.text());

//CORS
app.use(cors());

// Application routes
app.use("/api/v1", router);

// Default route
app.get("/", (_req: Request, res: Response) => {
   res.status(200).json({
      success: true,
      message: "Welcome to the API World!",
   });
});

// Health checkup route
app.get("/health", (_req: Request, res: Response) => {
   res.status(200).json({ status: "UP" });
});

// Global Error Handler
app.use(globalErrorHandler);

// Not Found Route Handler
app.use("*", notFoundRouteHandler);
export default app;
