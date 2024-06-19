import { defineConfig, loadEnv } from "vite";
import viteBaseConfig from "./vite.base.config";
import viteDevConfig from "./vite.dev.config";
import viteProdConfig from "./vite.prod.config";

const envResolver = {
    build: () => {
      console.log('prod...');

        return Object.assign(viteBaseConfig, viteProdConfig);
    },
    serve: () => {
        console.log('dev...');

        return Object.assign(viteBaseConfig, viteDevConfig);
    },
};
// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
    const env = loadEnv(mode, process.cwd(), "");
    // console.log("mode", mode);
    // console.log('env', env);
    
    return envResolver[command]();
});
