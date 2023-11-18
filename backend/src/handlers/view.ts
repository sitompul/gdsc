import { Database } from "better-sqlite3";
import { FastifyReply, FastifyRequest } from "fastify";

import { nil, num } from "../util";
import { Todo } from "../model";

type Req = FastifyRequest<{
  Params: {
    id: string;
  }
}>;

export function isReq(i: any): i is Req {
  return typeof i.params.id === "string";
}

export const view = (db: Database) => (req: Req, rep: FastifyReply) => {
  if (!isReq(req)) {
    rep.status(500).send({
      error: "errorParse"
    });
    return;
  }

  const id = num(req.params.id);
  const data = db.prepare("SELECT * FROM todo WHERE id = ?").get(id) as Todo;

  if (nil(data)) {
    rep.status(404).send({
      error: "errorNotFound",
    });
    return;
  }

  rep.send({
    data,
  })
}
