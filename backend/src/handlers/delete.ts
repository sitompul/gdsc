import { Database } from "better-sqlite3"
import { FastifyReply, FastifyRequest } from "fastify"
import { num } from "../util";

type Req = FastifyRequest<{
  Params: {
    id: string;
  }
}>;

export function isReq(i: any): i is Req {
  return typeof i.params.id === "string";
}

export const del = (db: Database) => (req: Req, rep: FastifyReply) => {
  if (!isReq(req)) {
    rep.status(500).send({
      error: "errorParse"
    });
    return;
  }

  const id = num(req.params.id);
  db.prepare("DELETE FROM todo WHERE id = ?").run(id);

  rep.send({
    data: true
  });
}
