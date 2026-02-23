# Node Vanilla Tasks API

[![](https://img.shields.io/badge/Project-NodeJS-green)](#)
[![](https://img.shields.io/badge/Version-Demo-red)](#)

## 📝 Description

This project developed a Node.js API for complete task management (CRUD). Essential functionalities include task creation, listing with filters by title and description, updating, deletion, and marking tasks as completed. The project's main differentiator is the implementation of a routine for importing tasks in bulk from a CSV file, using the csv-parse library.

This API uses pure Node.js, without external frameworks or libraries, apart from CSV management. Even the database layer is innovative, using Node.js' native file system to store and manage data directly in the project files.

This project demonstrates how to build a fully functional API from scratch, using only native Node.js modules.

## 🚩 Setup

Install Dependencies With

```bash
npm install
```

To run the project, use:

```bash
npm start
```

To run the project in developer mode, use:

```bash
npm run dev
```

## 📁 Import CSV Script

You can import tasks from a CSV file, as in the example located in the csv folder.

To import, run the API with `npm start` or `npm run dev` and use the command:

```bash
npm run import-csv
```

This script will import all the data within the `example.csv` file.

## 🔎 API Documentation

See the complete API documentation in this file:

- [API Documentation](./docs/api.md)

If you use Insomnia, you can import the endpoints with examples

- [Insomnia_Node_Vanilla_Tasks_API](./docs/Insomnia_Node_Vanilla_Tasks_API)
