import { Null } from "../types/general";
import { req } from "../utils/fetch";

type Response<T> = {
  data?: T;
  error?: string;
}

type ListResponse<T> = {
  data?: {
    totalItems: number;
    items: T[]
  },
  error?: string;
}

const url = "http://localhost:8080";

/**
 * View todo, returns null if not found or error, returns todo otherwise.
 * @param id Todo id
 * @returns Nullable Todo.
 */
export async function viewTodo(id: number): Promise<Null<Todo>> {
  const [res] =  await req<Response<Todo>>("GET", `${url}/todos/${id}`);
  return res?.data || null;
};

/**
 * Delete todo, returns true if success and vice versa.
 * @param id Todo id
 * @returns status of deletion
 */
export async function deleteTodo(id: number): Promise<boolean> {
  const [res] =  await req<Response<boolean>>("DELETE", `${url}/todos/${id}`);
  return res?.data || false;
}

/**
 * Create todo, returns todo if success and null otherwise.
 * @param description Todo description
 * @param deadline todo deadline
 * @param done is todo is already done
 * @returns Nullable todo
 */
export async function createTodo(description: string, deadline: Date, done: boolean): Promise<Null<Todo>>  {
  const [res] =  await req<Response<Todo>, Omit<Todo, "id">>("POST", `${url}/todos`, {
    body: {
      description,
      done: Number(done),
      deadline: deadline.getTime(),
    },
  });
  return res?.data || null;
}

/**
 * Paginate todo.
 * @param page current page viewed.
 * @param limit how many items per page.
 * @param search todo description search
 * @param done done check status 
 * @returns array of todo and todo count for pagination
 */
export async function listTodo(page: number, limit: number, search: string, done: string): Promise<[Todo[], number]> {
  const u = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    search,
    done,
  });
  const [res] =  await req<ListResponse<Todo>>("GET", `${url}/todos?${u.toString()}`);
  const items = res?.data?.items || [];
  const count = res?.data?.totalItems || 0;
  return [items, count];
}
