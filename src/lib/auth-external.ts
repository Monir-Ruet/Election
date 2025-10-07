import axios from "axios";

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing env ${name}`);
  return value;
}

export function isExternalAuthEnabled(): boolean {
  return process.env.AUTH_EXTERNAL_ENABLED === "true";
}

function baseURL(): string {
  return requireEnv("AUTH_API_BASE_URL").replace(/\/$/, "");
}

function apiKey(): string | undefined {
  return process.env.AUTH_API_KEY;
}

function defaultHeaders(): Record<string, string> {
  const key = apiKey();
  return key ? { Authorization: `Bearer ${key}` } : {};
}

function mapTokens(data: any): { accessToken: string; refreshToken?: string; expiresIn?: number } {
  const ak = process.env.AUTH_ACCESS_TOKEN_KEY || "access_token";
  const rk = process.env.AUTH_REFRESH_TOKEN_KEY || "refresh_token";
  const ek = process.env.AUTH_EXPIRES_IN_KEY || "expires_in";
  return {
    accessToken: data[ak],
    refreshToken: data[rk],
    expiresIn: typeof data[ek] === "number" ? data[ek] : undefined,
  };
}

export async function requestMagicLink(email: string) {
  const path = requireEnv("AUTH_MAGIC_LINK_PATH");
  await axios.post(`${baseURL()}${path}`, { email }, { headers: defaultHeaders() });
}

export async function exchangeCodeForTokens(code: string, redirectUri: string) {
  const path = requireEnv("AUTH_TOKEN_EXCHANGE_PATH");
  const payload: Record<string, string> = {
    grant_type: "authorization_code",
    code,
    redirect_uri: redirectUri,
  };
  if (process.env.AUTH_CLIENT_ID) payload.client_id = process.env.AUTH_CLIENT_ID;
  if (process.env.AUTH_CLIENT_SECRET) payload.client_secret = process.env.AUTH_CLIENT_SECRET;

  const res = await axios.post(`${baseURL()}${path}`, payload, { headers: defaultHeaders() });
  return mapTokens(res.data);
}

export async function refreshTokens(refreshToken: string) {
  const path = requireEnv("AUTH_REFRESH_PATH");
  const payload: Record<string, string> = { grant_type: "refresh_token", refresh_token: refreshToken };
  if (process.env.AUTH_CLIENT_ID) payload.client_id = process.env.AUTH_CLIENT_ID;
  if (process.env.AUTH_CLIENT_SECRET) payload.client_secret = process.env.AUTH_CLIENT_SECRET;

  const res = await axios.post(`${baseURL()}${path}`, payload, { headers: defaultHeaders() });
  return mapTokens(res.data);
}

export async function introspectAccessToken(accessToken: string): Promise<boolean> {
  const path = process.env.AUTH_INTROSPECT_PATH;
  if (!path) return true; // If not configured, assume valid and rely on expiry/refresh
  try {
    const res = await axios.post(
      `${baseURL()}${path}`,
      { token: accessToken },
      { headers: { ...defaultHeaders(), "Content-Type": "application/json" } }
    );
    // Many providers return { active: boolean }
    if (typeof res.data?.active === "boolean") return !!res.data.active;
    return true;
  } catch {
    return false;
  }
}
