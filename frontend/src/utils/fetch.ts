import { Null } from "../types/general";

/**
 * Send Fetch request, with simpler input and generics.
 */
export async function req<Response, Body = Record<string, unknown>>(
  method: "POST" | "GET" | "PUT" | "DELETE" | "PATCH",
  url: string,
  opt?: {
    headers?: Record<string, string>,
    body?: Body,
  }
): Promise<[response: Null<Response>, error: string]> {
  try {
    let headersRequest: Record<string, string> = {
      "Content-Type": "application/json",
    };
    if (opt?.headers) {
      headersRequest = {
        ...headersRequest,
        ...opt.headers,
      };
    }
    const response = await fetch(url, {
      method,
      body: opt?.body && Object.keys(opt.body).length
        ? JSON.stringify(opt.body)
        : undefined,
      headers: headersRequest,

      // IMPORTANT:
      // If your backend authentication requires you to include cookie, please enable this code
      // below
      // credentials: "include",
    });
    const data = await response.json() as Response;
    return [data, ""];
  } catch (e) {
    const message: string = (e as Error)?.message || "";
    return [null, message];
  }
}
