# Node Dapr Sample

This is a sample Node.js project written in TypeScript. It provides examples of building Node.js applications using modern frameworks such as Nest.js and Next.js.

## Project Overview

The project consists of three microservices, all deployed within a Kubernetes environment:

- **ns-main-service**: A combined backend and frontend application built with Next.js.
- **ns-contract-service**: A contracts backend powered by Nest.js.
- **ns-client-service**: A clients backend powered by Nest.js.

## Key Features

The application leverages [Dapr](https://dapr.io) for service discovery and facilitating communication between microservices.

## Deployment

For instructions on deploying the application to a local Kubernetes cluster, refer to the [local Kubernetes deployment guide](k8s/local/README.md).