export class ApiError extends Error {
  constructor(
    public readonly status: number,
    public readonly message: string
  ) {
    super(
      `An error occurred while communicating with the API.\nStatus: ${status} Message: ${message}`
    )
  }
}

type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE"

type FetchOptions = {
  method?: Method
  body?: unknown
  headers?: Record<string, string>
  next?: { revalidate?: number; tags?: string[] }
  timeoutInMs?: number
}

export async function apiFetch<T>(
  path: string,
  options: FetchOptions = {}
): Promise<T> {
  const {
    method = "GET",
    body,
    headers = {},
    next,
    timeoutInMs = 10_000,
  } = options

  // Token: tenta pegar do cookie no servidor, ignora no browser
  // "typeof window" é a forma padrão de checar se estamos no servidor
  //   let authHeader: Record<string, string> = {}
  //   if (typeof window === "undefined") {
  //     const { cookies } = await import("next/headers")
  //     const token = (await cookies()).get("session_token")?.value
  //     if (token) authHeader = { Authorization: `Bearer ${token}` }
  //   }

  const url =
    typeof window === "undefined"
      ? `${process.env.PEDALS_API_URL}${path}`
      : path

  const response = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
    signal: AbortSignal.timeout(timeoutInMs),
    // credentials: "include",
    ...(next ? { next } : {}),
  })

  if (!response.ok) {
    const text = await response.text().catch(() => "")
    throw new ApiError(response.status, text)
  }

  if (response.status === 204) return undefined as T

  return response.json() as Promise<T>
}
