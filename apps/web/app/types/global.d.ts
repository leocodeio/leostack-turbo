// src/types/global.d.ts
interface Window {
  ENV: {
    API_URL: string;
    NODE_ENV: "development" | "production";
  };
}
