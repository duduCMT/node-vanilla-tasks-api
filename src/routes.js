import { randomUUID } from "node:crypto";

import { Database } from "./database.js";
import { buildRoutePath } from "./utils/build-route-path.js";

const database = new Database();

export const routes = [
  {
    method: "GET",
    path: buildRoutePath("/tasks"),
    handle: (req, res) => {
      const search = req.query && req.query.search ? req.query.search : null;
      const tasks = database.select(
        "tasks",
        search ? { title: search, description: search } : null,
      );
      return res.end(JSON.stringify(tasks));
    },
  },
  {
    method: "POST",
    path: buildRoutePath("/tasks"),
    handle: (req, res) => {
      const { title, description } = req.body;

      const task = {
        id: randomUUID(),
        created_at: new Date(),
        updated_at: null,
        completed_at: null,
        title,
        description,
      };

      database.insert("tasks", task);

      return res.writeHead(201).end(JSON.stringify({ task }));
    },
  },
  {
    method: "PUT",
    path: buildRoutePath("/tasks/:id"),
    handle: (req, res) => {
      const { id } = req.params;
      const { title, description } = req.body;

      const updatedData = database.update("tasks", id, {
        title,
        description,
        updated_at: new Date(),
      });

      if (updatedData) {
        return res.writeHead(204).end(JSON.stringify({ task: updatedData }));
      }

      return res.writeHead(404).end();
    },
  },
  {
    method: "DELETE",
    path: buildRoutePath("/tasks/:id"),
    handle: (req, res) => {
      const { id } = req.params;

      const deteled = database.delete("tasks", id);

      if (deteled) {
        return res.writeHead(204).end();
      }

      return res.writeHead(404).end();
    },
  },
];
