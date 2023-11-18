import { FastifyReply, FastifyRequest } from "fastify";

import { Todo } from "../model";
import { Database } from "better-sqlite3";
import { nil, num } from "../util";

type Req = FastifyRequest<{
  Params: {
    id: string;
  },
  Body: Omit<Todo, "id">
}>;

export function isReq(i: any): i is Req {
  return typeof i.body.description === "string" &&
    typeof i.body.done === "number" &&
    typeof i.body.deadline === "number";
}

export const update = (db: Database) => (req: Req, rep: FastifyReply) => {
  if (!isReq(req)) {
    rep.status(500).send({
      error: "errorParse"
    });
    return;
  }

  const id = num(req.params.id);
  const r = db.prepare(`UPDATE todo SET description = ?,
    done = ?,
    deadline = ?
  WHERE id = ?`).run(req.body.description, req.body.done, req.body.deadline, id);

  const data = db.prepare("SELECT * FROM todo WHERE id = ?").get(r.lastInsertRowid) as Todo;
  
  if (nil(data)) {
    rep.status(404).send({
      error: "errorNotFound",
    });
    return;
  }

  rep.send({
    data,
  });
}
