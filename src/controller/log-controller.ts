import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import {
  elasticsearchClient,
  elasticsearchClientCloud,
} from "../config/elasticConfig";
import { BadRequestError } from "../errors";
import {
  createIndexWithMapping,
  createIndexWithMappingCloud,
} from "../services/esIndexMapping-sevices";
import Logger from "../logger";

export const createLogs_cloud = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { logName } = req.params;
  const logData = req.body;

  if (!logData["@timestamp"]) {
   logData["@timestamp"] = new Date().toISOString();
  }

  if (!logName)
    throw new BadRequestError('"logName" params field is required ');

  if (!logData) {
    throw new BadRequestError(' "logData" fields are required');
  }
  const indexExists = await elasticsearchClientCloud.indices.exists({
    index: logName.toLowerCase(),
  });

  if (!indexExists) {
    await createIndexWithMappingCloud(logName.toLowerCase(), next);
  }
  const response = await elasticsearchClientCloud.index({
    index: logName.toLowerCase(),
    document: logData,
  });
  Logger.info('Success')
  return res
    .status(StatusCodes.CREATED)
    .json({ message: "success", data: response });
};

export const createLogs = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { logName } = req.params;
  const logData = req.body;

  if (!logData["@timestamp"]) {
    logData["@timestamp"] = new Date().toISOString();
   }

  if (!logName)
    throw new BadRequestError('"logName" params field is required ');

  if (!logData) {
    throw new BadRequestError(' "logData" fields are required');
  }

  const indexExists = await elasticsearchClient.indices.exists({
    index: logName.toLowerCase(),
  });

  if (!indexExists) {
    createIndexWithMapping(logName.toLowerCase(), next);
  }
  const response = await elasticsearchClient.index({
    index: logName.toLowerCase(),
    document: logData,
  });
  Logger.info('Success')
  return res
    .status(StatusCodes.CREATED)
    .json({ message: "success", data: response });
};
