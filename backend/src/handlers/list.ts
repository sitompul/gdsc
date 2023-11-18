import { Database } from "better-sqlite3";
import { FastifyReply, FastifyRequest } from "fastify";

import { nil, nilStr, num } from "../util";
import { Todo } from "../model";

type Req = FastifyRequest<{
  Querystring: {
    page?: string;
    limit?: string;
    search?: string;
    done?: string;
  }
}>;

export function isReq(i: any): i is Req {
  return typeof nilStr(i.query.page) &&
    nilStr(i.query.limit) &&
    nilStr(i.query.search) &&
    nilStr(i.query.done);
}

export const list = (db: Database) => (req: Req, rep: FastifyReply) => {
  if (!isReq(req)) {
    rep.status(500).send({
      error: "errorParse"
    });
    return;
  }

  const page = num(req.query.page) || 1;
  const limit = num(req.query.limit) <= 0 || num(req.query.limit) > 1000
    ? 10
    : num(req.query.limit);
  const offset = (page - 1) * limit;
  const search = req.query.search || "";
  const done = req.query.done || "";

  let count = 0;
  let doneQuery = "";

  if (done === "true") {
    doneQuery = "AND done = 1";
  } else if (done === "false") {
    doneQuery = "AND done = 0";
  }
  const q = `SELECT * FROM todo WHERE description LIKE ? COLLATE NOCASE ${doneQuery} LIMIT ? OFFSET ?`;
  const countQ = `SELECT COUNT(*) as rowCount FROM todo WHERE description LIKE ? COLLATE NOCASE ${doneQuery}`;
  const res = db.prepare(countQ).get(`%${search}%`) as { rowCount: number };
  count = res.rowCount || 0;
  const items = db.prepare(q).all(`%${search}%`, limit, offset) as Todo[];

  if (nil(items)) {
    rep.send({
      data: {
        items: [],
        totalItems: 0,
      },
    });
    return;
  }

  rep.send({
    data: {
      items,
      totalItems: count,
    },
  });
}
