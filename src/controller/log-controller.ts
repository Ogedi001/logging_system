import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import {
  elasticsearchClient,
  elasticsearchClientCloud,
} from "../config/elasticConfig";
import { BadRequestError } from "../errors";
import { createIndexWithMapping } from "../services/esIndexMapping-sevices";

export const createLogs = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { logName, logData }: { logName: string; logData: any } = req.body;

  if (!logName || !logData) {
    throw new BadRequestError(
      'Both "logName" and "logData" fields are required'
    );
  }

  const indexExists = await elasticsearchClientCloud.indices.exists({
    index: logName,
  });

  if (!indexExists) {
    createIndexWithMapping(logName);
  }
  const response = await elasticsearchClientCloud.index({
    index: logName,
    document: {
      ...logData,
      "@timestamp": new Date().toISOString(),
    },
  });
  res.status(StatusCodes.CREATED).json({ message: "success", data: response });
};
