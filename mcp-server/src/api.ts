import "dotenv/config";
import fetch from "node-fetch";

const BASE_URL = process.env.SECOND_BRAIN_API_URL ?? "http://localhost:8000/api/v1";
const API_KEY = process.env.SECOND_BRAIN_API_KEY ?? "";

export async function apiCall(
  method: string,
  path: string,
  body?: unknown,
  params?: Record<string, string>,
): Promise<unknown> {
  const url = new URL(`${BASE_URL}${path}`);
  if (params) {
    Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  }
  const res = await fetch(url.toString(), {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    throw new Error(`Second Brain API error ${res.status}: ${await res.text()}`);
  }
  return res.json();
}
