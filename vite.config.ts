import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "",
  assetsInclude: ["**/*.gltf", "**/*.png"],
  resolve: {
    alias: {
      "@": `${path.resolve(__dirname, "./src/")}`,
      gltf: `${path.resolve(__dirname, "./src/assets/gltf")}`,
      textures: `${path.resolve(__dirname, "./src/assets/textures")}`,
      public: `${path.resolve(__dirname, "./public")}`,
    },
  },
});
