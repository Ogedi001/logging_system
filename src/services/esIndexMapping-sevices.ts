import { elasticsearchClientCloud } from "../config/elasticConfig";

export const createIndexWithMapping = async (indexName: string) => {
  const mapping: Record<string, any> = {
    mappings: {
      properties: {
        "@timestamp": { type: "date" },
      },
    },
  };

  await elasticsearchClientCloud.indices.create({
    index: indexName,
    body: mapping,
  });
};
