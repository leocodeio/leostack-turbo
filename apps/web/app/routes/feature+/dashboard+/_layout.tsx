import { Outlet, useLoaderData } from "@remix-run/react";
import { CommonSubHeader } from "~/components/common/CommonSubHeader";
import { getSession } from "~/server/services/auth/db.server";

export async function loader({ request }: any) {
  const session = await getSession(request);
  const user = session?.user;
  return { user: user };
}

export default function DashboardLayout() {
  const { user } = useLoaderData<typeof loader>();
  return (
    <>
      <CommonSubHeader
        userName={user?.name as string}
        role={user?.role as string}
        variant="default"
      />
      <Outlet />
    </>
  );
}
