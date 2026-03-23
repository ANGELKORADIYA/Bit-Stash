# Codeseverywhere

## Overview

This project, Codeseverywhere, is a Spring Boot application that allows users to upload and share code snippets. The application provides functionality for users to upload their code, which can then be viewed by others.

## Database Setup and Hosting Guide (PostgreSQL)

This project has been migrated to use **PostgreSQL**. It is configured to spin up seamlessly using **Docker Compose** for local development, and allows for an easy deployment target on free-tier platforms like Render.

### Prerequisites for Local Run
- [Docker](https://docs.docker.com/get-docker/) installed.
- [Docker Compose](https://docs.docker.com/compose/install/) (comes with Docker Desktop).

### Local Setup (Build and Start)
Navigate to the root of this project (where `docker-compose.yml` is located) and run the following command to build the app and start the PostgreSQL database in the background:

```bash
docker-compose up --build -d
```

This will:
1. Launch a PostgreSQL 15 container named `codeseverywhere-db`.
2. Automatically create the database `29db`.
3. Build the Spring Boot application using the provided multi-stage `Dockerfile`.
4. Start the application on port `8080`, hooked up to the db.

### Accessing the Database Locally
The default configurations bind the database to port `5432` on your machine. You can connect using a visual SQL editor like **pgAdmin** or **DBeaver** with these credentials:
- **Host**: `localhost`
- **Port**: `5432`
- **Database**: `29db`
- **User**: `postgres`
- **Password**: `root`

### Deploying to Render (Free Tier)
Render offers a managed PostgreSQL database that is free to use. Here is how you deploy both the database and the app:

**Step 1: Create the Database**
1. Go to your Render Dashboard -> **New +** -> **PostgreSQL**.
2. Give it a name (e.g., `codeseverywhere-db`).
3. Select the **Free** instance type and click **Create Database**.
4. Once it's created, copy the **Internal Database URL** (it looks like `postgres://user:password@hostname/dbname`).

**Step 2: Deploy the Spring Boot App**
1. Go to your Dashboard -> **New +** -> **Web Service**.
2. Connect your GitHub repository containing this code.
3. Render will use the `Dockerfile` to build the app automatically.
4. Scroll down to **Environment Variables** and add:
   - `SPRING_DATASOURCE_URL` = `jdbc:<paste your Internal Database URL here>` (Wait, for Spring Boot it should start with `jdbc:postgresql://...`)
     - *Example:* `jdbc:postgresql://dpg-cabcde123:5432/my_db_name`
   - `SPRING_DATASOURCE_USERNAME` = `<username from your Render DB dashboard>`
   - `SPRING_DATASOURCE_PASSWORD` = `<password from your Render DB dashboard>`
5. Click **Deploy Web Service**.

Your app is now hosted securely in the cloud via Render!