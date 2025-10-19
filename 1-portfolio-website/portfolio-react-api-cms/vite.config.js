import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [react()],
    server: {
      proxy: env.VITE_PROXY_TARGET
        ? {
            "/proxy": {
              target: env.VITE_PROXY_TARGET,
              changeOrigin: true,
              secure: false,
              rewrite: (path) => path.replace(/^\/proxy/, ""),
            },
          }
        : undefined,
    },
  };
});
