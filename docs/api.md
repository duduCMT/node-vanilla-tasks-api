# API Documentation

## Base URL

```
http://localhost:3333
```

## Task Object Structure

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "title": "string",
  "description": "string",
  "completed_at": "2026-02-23T10:30:00.000Z" | null,
  "created_at": "2026-02-23T10:30:00.000Z",
  "updated_at": "2026-02-23T10:30:00.000Z"
}
```

---

## Endpoints

### POST /tasks

Creates a new task.

**Request:**

```bash
POST /tasks
```

**Body:**

```json
{
  "title": "Task title",
  "description": "Task description"
}
```

**Parameters:**

- `title` (string, required): The title of the task
- `description` (string, required): A detailed description of the task

**Response: 201 Created**

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "title": "Task title",
  "description": "Task description",
  "completed_at": null,
  "created_at": "2026-02-23T10:30:00.000Z",
  "updated_at": "2026-02-23T10:30:00.000Z"
}
```

**Error Responses:**

- `400 Bad Request`: Missing required fields (title or description)

---

### GET /tasks

Lists all existing tasks with optional filtering.

**Request:**

```bash
GET /tasks
GET /tasks?search=keyword
```

**Query Parameters:**

- `search` (string, optional): Filter tasks by title or description

**Response: 200 OK**

```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "title": "Task title",
    "description": "Task description",
    "completed_at": null,
    "created_at": "2026-02-23T10:30:00.000Z",
    "updated_at": "2026-02-23T10:30:00.000Z"
  },
  {
    "id": "660e8400-e29b-41d4-a716-446655440001",
    "title": "Another task",
    "description": "Another description",
    "completed_at": "2026-02-23T11:45:00.000Z",
    "created_at": "2026-02-23T10:00:00.000Z",
    "updated_at": "2026-02-23T11:45:00.000Z"
  }
]
```

---

### PUT /tasks/:id

Updates a specific task by ID.

**Request:**

```bash
PUT /tasks/:id
```

**Parameters:**

- `id` (string, required): The UUID of the task to update

**Body:**

```json
{
  "title": "Updated title",
  "description": "Updated description"
}
```

**Body Parameters:**

- `title` (string, optional): New task title
- `description` (string, optional): New task description
- At least one of the fields must be provided

**Response: 200 OK**

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "title": "Updated title",
  "description": "Updated description",
  "completed_at": null,
  "created_at": "2026-02-23T10:30:00.000Z",
  "updated_at": "2026-02-23T11:00:00.000Z"
}
```

**Error Responses:**

- `400 Bad Request`: No fields to update or invalid data
- `404 Not Found`: Task with the specified ID does not exist

---

### DELETE /tasks/:id

Removes a specific task by ID.

**Request:**

```bash
DELETE /tasks/:id
```

**Parameters:**

- `id` (string, required): The UUID of the task to delete

**Response: 204 No Content**

No body is returned on successful deletion.

**Error Responses:**

- `404 Not Found`: Task with the specified ID does not exist

---

### PATCH /tasks/:id/complete

Toggles the completion status of a task by modifying the `completed_at` field.

**Request:**

```bash
PATCH /tasks/:id/complete
```

**Parameters:**

- `id` (string, required): The UUID of the task to toggle completion status

**Body:**
No body required (or empty object)

**Response: 200 OK**

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "title": "Task title",
  "description": "Task description",
  "completed_at": "2026-02-23T11:30:00.000Z",
  "created_at": "2026-02-23T10:30:00.000Z",
  "updated_at": "2026-02-23T11:30:00.000Z"
}
```

**Behavior:**

- If `completed_at` is `null`, it will be set to the current date/time
- If `completed_at` has a value, it will be set back to `null` (toggling the completion status)

**Error Responses:**

- `404 Not Found`: Task with the specified ID does not exist

---

## Error Handling

All error responses follow this format:

```json
{
  "error": "Error message describing what went wrong"
}
```

### HTTP Status Codes

| Status | Meaning                                 |
| ------ | --------------------------------------- |
| 200    | OK - Request succeeded                  |
| 201    | Created - Resource created successfully |
| 204    | No Content - Successful deletion        |
| 400    | Bad Request - Invalid request data      |
| 404    | Not Found - Resource not found          |
| 500    | Internal Server Error - Server error    |

---

## CSV Import

To import tasks from a CSV file, use the `import-csv.js` script:

```bash
node import-csv.js
```

The CSV file should have the following format:

```csv
title,description
Task 01,Description of Task 01
Task 02,Description of Task 02
```

**Note:** The script will skip the header row and send POST requests to `/tasks` for each data row.
