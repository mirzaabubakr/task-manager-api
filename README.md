## Overview

The Task Manager API is a backend service designed to manage tasks and task logs. It provides a set of RESTful endpoints for creating, reading, updating, and deleting tasks and task logs. The API supports features such as sorting, filtering, and pagination to efficiently manage and retrieve tasks and logs. This project is built using Node.js and Express, and it uses PostgreSQL as the database.

Key functionalities include:

- Managing user tasks with CRUD operations.
- Managing task logs with CRUD operations.
- Sorting, filtering, and paginating tasks and task logs.

## Features

- Create, read, update, and delete user tasks.
- Retrieve a list of tasks with optional sorting, filtering, and pagination.
- Create, read, update, and delete task logs.
- Retrieve a list of task logs with pagination.

## Installation

1. Clone the repository:
   ```sh
   gh repo clone mirzaabubakr/task-manager-api
   ```
2. Navigate to the project directory:
   ```sh
   cd task-manager-api
   ```
3. Install dependencies:

   ```sh
   npm install

   ```

4. Add .env file as specified in .env.sample:
   ```sh
   npm install
   ```

## Usage

1. Start the server:
   ```sh
   npm run dev
   ```
2. The API will be available at `http://localhost:{PORT}`.

## API Endpoints

### Tasks

- `GET /api/tasks` - Retrieve a list of tasks with optional sorting, filtering, and pagination.
- `POST /api/tasks` - Create a new task.
- `PUT /api/tasks/:id` - Update an existing task by ID.
- `DELETE /api/tasks/:id` - Delete a task by ID.

### Task Logs

- `GET /api/task_logs` - Retrieve a list of task logs with pagination.

## License

This project is licensed under the MIT License.
