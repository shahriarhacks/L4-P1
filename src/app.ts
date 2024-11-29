import express, { Application, Request, Response } from "express";
import cors from "cors";
import { StudentRouter } from "./app/modules/student/student.routes";
import { UserRouter } from "./app/modules/user/user.routes";
import globalErrorHandler from "./app/middleware/globalErrorHandler";
import { notFoundRouteHandler } from "./app/middleware/notFoundRouteHandler";

const app: Application = express();

//Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.text());

//CORS
app.use(cors());

// Application routes

app.use("/api/v1/users", UserRouter);

app.get("/", (_req: Request, res: Response) => {
   const x = 9;
   res.send(x);
});

// Global Error Handler
app.use(globalErrorHandler);

// Not Found Route Handler
app.use("*", notFoundRouteHandler);
export default app;
