import { loader as dashboardLoader } from "../loader+/feature+/dashboard+/dashboard.loader";
import { Outlet } from "@remix-run/react";

// export const loader = dashboardLoader;

export default function FeatureIndex() {
  return <Outlet />;
}
