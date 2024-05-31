import { Client } from "@elastic/elasticsearch"


export const elasticsearchClient = new Client({
  node: process.env.ELASTIC_URL,
  auth: {
    username: <string>process.env.ELASTIC_USERNAME,
    password: <string>process.env.ELASTIC_PASSWORD
  },
  maxRetries: 5,
  requestTimeout: 60000,
  sniffOnStart: true
})



export const elasticsearchClientCloud = new Client({
  cloud: {
    id: <string>process.env.ELASTIC_CLOUD_ID
  },
  auth: {
    username: <string>process.env.ELASTIC_USERNAME,
    password: <string>process.env.ELASTIC_CLOUD_PASSWORD
  }
})