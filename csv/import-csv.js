import fs from "node:fs";
import { parse } from "csv-parse";
import http from "node:http";

const csvPath = new URL("./example.csv", import.meta.url);

// função para fazer POST
function sendTask({ title, description }) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({ title, description });

    const req = http.request(
      "http://localhost:3333/tasks",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(data),
        },
      },
      (res) => {
        res.on("data", () => {});
        res.on("end", resolve);
      },
    );

    req.on("error", reject);
    req.write(data);
    req.end();
  });
}

async function run() {
  const parser = parse({
    columns: true,
    skip_empty_lines: true,
  });

  const stream = fs.createReadStream(csvPath).pipe(parser);

  for await (const row of stream) {
    try {
      await sendTask({
        title: row.title,
        description: row.description,
      });

      console.log(`Task sent: ${row.title}`);
    } catch (error) {
      console.error("Error sending task:", error);
    }
  }

  console.log("Import finished");
}

run();
