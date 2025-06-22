import { redirect, type LoaderFunctionArgs } from "@remix-run/node";
import { getSession } from "~/server/services/auth/db.server";

export const ROUTE_PATH = "/auth/signin" as const;

export async function loader({
  request,
}: LoaderFunctionArgs): Promise<Response | null> {
  // If user is already authenticated, redirect to dashboard
  const session = await getSession(request);
  if (session) {
    return redirect("/feature/home");
  }
  return null;
}
