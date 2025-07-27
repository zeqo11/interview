import { defineConfig, loadEnv } from "vite";
import path from 'path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  const localhost = `${env.VITE_API}:${env.VITE_PORT}`

  return {
    define: {
      "import.meta.env.VITE_API_URL": JSON.stringify(localhost),
      "import.meta.env.VITE_PORT": JSON.stringify(env.VITE_PORT),
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
  };
});
