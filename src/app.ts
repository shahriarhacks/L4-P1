import express, { Application, Request, Response } from "express";
import cors from "cors";

const app: Application = express();

//Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.text());

//CORS
app.use(cors());

app.get("/", (_req: Request, res: Response) => {
   const x = 9;
   res.send(x);
});

export default app;
