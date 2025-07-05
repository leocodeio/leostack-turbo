// import { UserData } from "~/model/user-data";
// import { getUserInfo } from "./session.server";

import { throw500Error } from "./error-validations.server";

// Environment configuration with defaults
const ENV = {
  BACKEND_API_URL: process.env.BACKEND_API_URL?.trim(),
  BACKEND_API_KEY: process.env.BACKEND_API_KEY?.trim(),
  BACKEND_VERSION: process.env.BACKEND_VERSION?.trim(),
};

export function getApiKey() {
  const authApiKey = process.env.BACKEND_API_KEY as string;
  if (!authApiKey) {
    throw new Error("BACKEND_API_KEY is not set");
  }
  return authApiKey;
}

export async function getFrontendCorrelationId() {
  // const userData = (await getUserInfo(request)) as Partial<UserData>;
  // const frontendCorrelationId = userData?.id || "FRONTEND-CORRELATION-ID";
  // if (!frontendCorrelationId) {
  //   throw new Error("FRONTEND_CORRELATION_ID is not set");
  // }
  // return frontendCorrelationId as string;
  return "FRONTEND-CORRELATION-ID";
}

/**
 * Creates headers for BFF API requests
 * @param access_token User's access token
 * @param correlationId Request correlation ID
 * @returns Headers object
 */
async function createHeaders(
  access_token?: string
  // request: Request
): Promise<HeadersInit> {
  return {
    ...(access_token && { Authorization: `Bearer ${access_token}` }),
    "x-api-key": getApiKey(),
    "Content-Type": "application/json",
    "x-correlation-id": await getFrontendCorrelationId(),
  };
}

/**
 * Makes an API request to the BFF layer
 * @param endpoint API endpoint
 * @param options Request options
 * @returns Promise with API response
 * @throws Error if request fails
 */
export async function makeApiRequest<T, B = Record<string, unknown>>(
  endpoint: string,
  options: {
    method: string;
    request: Request;
    access_token?: string;
    body?: B;
    params?: Record<string, string>;
    pathParams?: Record<string, string>;
  }
): Promise<Response | undefined> {
  console.log("--- request to backend begin ---");
  const { access_token, method, request, body, params, pathParams } = options;

  // Replace path parameters if any
  let url = endpoint;
  if (pathParams) {
    Object.entries(pathParams).forEach(([key, value]) => {
      url = url.replace(`:${key}`, value);
    });
  }

  // Append query parameters if any
  let fullUrl = `${ENV.BACKEND_API_URL}/${ENV.BACKEND_VERSION}${url}`;
  console.log("sending request to url", fullUrl);
  if (params) {
    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value) queryParams.append(key, value);
    });

    if (queryParams.toString()) {
      fullUrl += `?${queryParams.toString()}`;
    }
  }
  console.log("sending request with params", params);
  console.log("sending request with body", body);
  console.log(
    "sending request with headers",
    await createHeaders(access_token)
  );
  console.log("--- request to backend end ---");
  try {
    const response = await fetch(fullUrl, {
      method,
      headers: await createHeaders(access_token),
      ...(body && { body: JSON.stringify(body) }),
    });
    console.log("--- response from backend begin ---");
    console.log("debug log 2 - makeApiRequest", response.ok);
    console.log("debug log 3 - makeApiRequest", response.status);
    console.log("debug log 4 - makeApiRequest", response.statusText);
    console.log("debug log 5 - makeApiRequest", response.body);
    console.log("debug log 6 - makeApiRequest", await response.clone().json());
    console.log("--- response from backend end ---");
    return response;
  } catch (error) {
    console.error(`Error in API request to ${endpoint}:`, error);
    await throw500Error(request);
  }
}
