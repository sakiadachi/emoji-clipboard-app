import { getCookie } from "../hooks/useCookie";

const baseHeaders = { "Content-Type": "application/json" };

export async function fetchApi(
  path: string,
  options?: RequestInit,
  additionalHeaders?: HeadersInit
): Promise<Response> {
  const csrfToken = getCookie("csrftoken");
  if (csrfToken === undefined) {
    console.warn("Expected csrfToken");
  }
  const csrfHeader =
    csrfToken === undefined
      ? undefined
      : {
          "X-CSRFToken": csrfToken,
        };
  return await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/${path}`, {
    ...options,
    headers: {
      ...additionalHeaders,
      ...csrfHeader,
    },
  });
}
