// import { useState } from "react";
// import { Button } from "@./shadcn";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { CommonSidebar } from "../../components/common/CommonSidebar";
import { loader as dashboardLoader } from "../loader+/feature+/dashboard+/dashboard.loader";
import { Outlet, useLoaderData } from "@remix-run/react";
import { CommonHeader } from "../../components/common/CommonHeader";
export const loader = dashboardLoader;
import { NavLinks } from "~/models/navlinks";

export default function Dashboard() {
  const { user } = useLoaderData<typeof loader>();

  return (
    <SidebarProvider>
      <CommonSidebar data={NavLinks} variant="inset" />
      <SidebarInset>
        <CommonHeader user={user} />
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  );
}
