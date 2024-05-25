# logging_system

## Overview
The Logging System is a robust solution designed to collect, store, and visualize log data. It leverages Elasticsearch as the data store for logs and Grafana as the visualization tool to provide insightful dashboards and analysis. This repository contains the codebase and configuration files required to set up and run the logging system.

## Key Components
### 1. Elasticsearch
Elasticsearch is a powerful, open-source search and analytics engine. In this logging system, it is used as the primary datastore for storing log data. Elasticsearch allows for efficient indexing, querying, and analysis of large volumes of log data.

### 2. Grafana
Grafana is an open-source platform for monitoring and observability. It provides a rich set of tools to create, explore, and share dashboards, making it easy to visualize the data stored in Elasticsearch. Grafana's flexible query options and interactive visualizations help in gaining deep insights from log data.

### 3. Node.js Backend
The backend is built with Node.js and Express.js, providing APIs to ingest and manage log data. The backend communicates with Elasticsearch to index and retrieve logs.

## Features

 - **Log Ingestion:** API endpoints to ingest logs into Elasticsearch.
 - **Index Management:** Automatically create and manage indices in Elasticsearch.
 - **Data Visualization:** Pre-configured Grafana dashboards for log visualization and analysis.
 - **Timestamp Management:** Automatic addition of @timestamp field to log entries for precise time-based querying.

## Installation


### Prerequisites
- [Node.js and npm](https://nodejs.org/)
- [Elasticsearch](https://www.elastic.co/guide/en/elasticsearch/reference/8.13/setup.html)
- [Grafana](https://grafana.com/docs/grafana/latest/)


1. **Clone the Repository:**
    ```sh
    git clone https://github.com/Ogedi001/logging_system.git
    cd logging_system
    ```

2. **Install Dependencies:**
    ```sh
    npm install
    ```

3. **Environment Variables:**
    Create a `.env` file in the root of the project and add the following environment variables:
    ```env
    PORT=<PORT> #default port = 4000
    ELASTIC_URL=http://localhost:9200/  #elasticsearch runs locally on port 9200 by default
    ELASTIC_CLOUD_ID= <elastic cloud id>
    ELASTIC_CLOUD_PASSWORD=<cloud password>
    ELASTIC_USERNAME=elastic
    ELASTIC_PASSWORD=<local password> 
    ```

4. **Configure Elasticsearch:**
    - Ensure Elasticsearch is running locally if you want to use local endpoint .
    - Ensure Elasticsearch cloud is running if you want to use cloud endpoint

 **N/B** for more info on installation and set up visit [Elasticsearch](https://www.elastic.co/guide/en/elasticsearch/reference/8.13/setup.html)

5. **Configure Grafana:**
    - Ensure Grafana is running locally or on cloud
    - Configure and connect to elasticsearch datasource

 **N/B** for more info on installation and set up visit [Grafana](https://grafana.com/docs/grafana/latest/)

![alt text](<src/assets/grafana es config.jpg>)


6. **Run the Application:**
    ```sh
    npm start or npm run dev
    ```

    The application will start on `http://localhost:PORT`.



## Usage

### API Endpoints
  - Endpoint: `POST http://localhost:PORT/api/log/local`  //using local configuration
  - Endpoint: `POST http://localhost:PORT/api/log/cloud`  //using cloud configuration

- **Ingest Log Data cloud:**
    - Endpoint: `POST http://localhost:PORT/api/log/cloud`
    - Description: Ingest log data into Elasticsearch running on cloud
    - Body Parameters:
        - `logName` (string): The name of the log index.
        - `logData` (object): The log data to be ingested.

    Example Request:
    ```sh
    curl -X POST http://localhost:PORT/api/log/cloud` -H 'Content-Type: application/json' -d '{
        "logName": "example-log",
        "logData": {
            "message": "This is a log message",
            "level": "info"
        }
    }'
    ```

- **Ingest Log Data local:**
    - Endpoint: `POST http://localhost:PORT/api/log/local`
    - Description: Ingest log data into Elasticsearch.
    - Body Parameters:
        - `logName` (string): The name of the log index.
        - `logData` (object): The log data to be ingested.

    Example Request:
    ```sh
    curl -X POST http://localhost:PORT/api/log/local` -H 'Content-Type: application/json' -d '{
        "logName": "example-log",
        "logData": {
            "message": "This is a log message",
            "level": "info"
        }
    }'
    ```


## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## Contact
For any questions or inquiries, please contact ogedifavour2@gmail.com.

---

Enjoy using the Logging System!

