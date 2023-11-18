import { FastifyReply, FastifyRequest } from "fastify";

import { Todo } from "../model";
import { Database } from "better-sqlite3";

type Req = FastifyRequest<{
  Body: Omit<Todo, "id">
}>;

export function isReq(i: any): i is Req {
  return typeof i.body.description === "string" &&
    typeof i.body.done === "number" &&
    typeof i.body.deadline === "number";
}

export const create = (db: Database) => (req: Req, rep: FastifyReply) => {
  if (!isReq(req)) {
    rep.status(500).send({
      error: "errorParse"
    });
    return;
  }

  const r = db.prepare(`INSERT INTO todo (
    description,
    done,
    deadline
  ) VALUES (?, ?, ?)`).run(req.body.description, req.body.done, req.body.deadline);

  const data = db.prepare("SELECT * FROM todo WHERE id = ?").get(r.lastInsertRowid) as Todo;
  rep.send({
    data,
  });
}
