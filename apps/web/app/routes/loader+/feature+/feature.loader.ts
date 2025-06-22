import { redirect, type LoaderFunctionArgs } from "@remix-run/node";
import { getSession } from "~/server/services/auth/db.server";

export const ROUTE_PATH = "/feature" as const;

export async function loader({ request }: LoaderFunctionArgs): Promise<any> {
  const session = await getSession(request);
  if (!session) {
    return redirect("/auth/signin");
  }
  return { user: session.user };
}
