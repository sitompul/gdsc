import fastify from "fastify";
import Database from "better-sqlite3";
import cors from "@fastify/cors";

import { create } from "./handlers/create";
import { view } from "./handlers/view";
import { del } from "./handlers/delete";
import { update } from "./handlers/update";
import { list } from "./handlers/list";

async function main() {
  // Save into RAM.
  // const db = new Database(":memory:");

  // Save into HDD.
  const db = new Database("random_name.db");

  db.pragma("journal_mode = WAL");
  db.pragma("foreign_keys = ON");

  // Database migration.
  db.exec(`
    CREATE TABLE IF NOT EXISTS todo (
      id          INTEGER PRIMARY KEY AUTOINCREMENT,
      done        INTEGER NOT NULL,
      description TEXT,
      deadline    INTEGER
    );
  `);

  const s = fastify();

  // Allow everything.
  await s.register(cors, { 
    origin: (_, cb) => {
      cb(null, true);
    }
  })

  s.get("/todos/:id", view(db));
  s.get("/todos", list(db));
  s.post("/todos", create(db));
  s.put("/todos/:id", update(db));
  s.delete("/todos/:id", del(db));

  s.listen({ port: 8080 }, (err, address) => {
    if (err) {
      console.error(err)
      process.exit(1)
    }
    console.log(`Server listening at ${address}`)
  });
}

main();
