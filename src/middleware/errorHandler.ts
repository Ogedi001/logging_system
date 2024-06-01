import { StatusCodes } from "http-status-codes";
import { errors as esErrors } from "@elastic/elasticsearch";
import Logger from "../logger";
import { Response, Request, NextFunction } from "express";
import { CustomError } from "../errors";

export const errorHandlerMiddleware = async (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    Logger.error(err.serializeErrors());
    return res.status(err.statusCode).json({ errors: err.serializeErrors() });
  }

  if (err instanceof esErrors.ElasticsearchClientError) {
    Logger.error({
      message: "Elasticsearch error",
      name: err.name,
      error: err.message,
    });

    if (err instanceof esErrors.ConnectionError) {
      return res.status(StatusCodes.SERVICE_UNAVAILABLE).json({
        errors: [
          {
            message: "Elasticsearch connection error",
            details: err.message,
          },
        ],
      });
    }

    if (err instanceof esErrors.TimeoutError) {
      return res.status(StatusCodes.GATEWAY_TIMEOUT).json({
        errors: [
          {
            message: "Elasticsearch request timed out",
            details: err.message,
          },
        ],
      });
    }

    if (err instanceof esErrors.ResponseError) {
      return res.status(StatusCodes.BAD_GATEWAY).json({
        errors: [
          { message: "Elasticsearch response error", details: err.message },
        ],
      });
    }

    // Handle other Elasticsearch-specific errors
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: [{ message: "Elasticsearch error", details: err.message }],
    });
  }

  // Other uncaught errors
  Logger.error({
    message: "Internal server error",
    error: err.message,
  });
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    errors: [{ message: err.message }],
  });
};
