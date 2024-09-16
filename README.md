# Job Search Application - Docker Setup

This project is a job search application built with the MERN stack (MongoDB, Express, React, Node.js). This guide explains how to set up and run the application using Docker and Docker Compose.

## Prerequisites

Before you begin, make sure you have the following installed on your machine:

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Setting Up Environment Variables

To configure the application, you need to create a `.env` file in the project root directory with the required environment variables.

1. **Create a `.env` file**:

   Create a new `.env` file in the api folder root of project, based on the example provided.

2. **Run Docker for application**:

   Once your environment variables are set, you can run the application using Docker Compose.

   ```
   docker compose up

   ```
