// remix.config.ts
import type { AppConfig } from "@remix-run/dev";

const RemixExternalConfigs: AppConfig = {
  watchPaths: ["../../packages/*"],
};

export default RemixExternalConfigs;
