import { defineConfig } from "vitest/config";
import { loadEnv } from 'vite'

export default defineConfig({
    test: {
        testTimeout: 30000, // 30s timeout for Discord API calls
        hookTimeout: 30000, // 30s timeout for setup/teardown
        environment: "node",
        globals: false,
        env: loadEnv("", process.cwd(), '')
    },
}); 