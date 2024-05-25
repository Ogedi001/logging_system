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
    index: logName.toLowerCase(),
  });

  if (!indexExists) {
    createIndexWithMapping(logName.toLowerCase(),next);
  }
  const response = await elasticsearchClientCloud.index({
    index: logName.toLowerCase(),
    document: {
      ...logData,
      "@timestamp": new Date().toISOString(),
    },
  });
 return res.status(StatusCodes.CREATED).json({ message: "success", data: response });
};
