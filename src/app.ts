import express, { Application, Request, Response } from "express";
import cors from "cors";
import { StudentRouter } from "./app/modules/student/student.route";

const app: Application = express();

//Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.text());

//CORS
app.use(cors());

// Application routes

app.use("/api/v1/students", StudentRouter);

app.get("/", (_req: Request, res: Response) => {
   const x = 9;
   res.send(x);
});

export default app;
