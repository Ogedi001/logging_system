import { elasticsearchClientCloud,elasticsearchClient } from "../config/elasticConfig";
import { NextFunction } from "express";


export const createIndexWithMapping = async (indexName: string,next:NextFunction) => {
  const mapping: Record<string, any> = {
    mappings: {
      properties: {
        "@timestamp": { type: "date" },
      },
    },
  };
try {
    await elasticsearchClient.indices.create({
        index: indexName,
        body: mapping,
      });
} catch (error) {
    next(error)
}
  
};


export const createIndexWithMappingCloud = async (indexName: string,next:NextFunction) => {
    const mapping: Record<string, any> = {
      mappings: {
        properties: {
          "@timestamp": { type: "date" },
        },
      },
    };
  try {
      await elasticsearchClientCloud.indices.create({
          index: indexName,
          body: mapping,
        });
  } catch (error) {
      next(error)
  }
    
  };
  