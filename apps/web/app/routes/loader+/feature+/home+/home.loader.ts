import { User } from "@prisma/client";
import { redirect, type LoaderFunctionArgs } from "@remix-run/node";
import { getSession } from "~/server/services/auth/db.server";

export async function loader({
  request,
}: LoaderFunctionArgs): Promise<User | Response | null> {
  const session = await getSession(request);
  if (!session) {
    return redirect("/auth/signin");
  }
  return session.user as User;
}
