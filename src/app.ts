import "dotenv/config";
import "express-async-errors";
import express, { Request, Response, Application } from "express";
import { createServer } from "http";

import Logger from "./logger";
import { ApplicationRoute } from "./routes";

import { errorHandlerMiddleware,pageNotFound } from "./middleware";
import { StatusCodes } from "http-status-codes";

const app: Application = express();
const server = createServer(app);
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api", (req: Request, res: Response) => {
  return res
    .status(StatusCodes.OK)
    .json({ message: "Welcome to Backend Api version 1.0 🔥🔥🔥" });
});

app.use("/api", ApplicationRoute);
app.use(errorHandlerMiddleware);
app.use(pageNotFound);

const startServer = () => {
  server.listen(PORT, () => {
    Logger.info(`App is running @localhost:${PORT}`);
  });

  const shutdown = () => {
    server.close(() => {
      Logger.info("Server is shut down");
      process.exit(0);
    });
  };
  process.on("SIGTERM", shutdown);
  process.on("SIGINT", shutdown);
};

startServer();
