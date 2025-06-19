import tailwindcss from "@tailwindcss/vite";
import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  build: {
    transpile: ["vuetify"],
  },
  runtimeConfig: {
    public: {
      apiBase: process.env.API_BASE_URL,
    },
  },
  // nitro: {
  //   routeRules: {
  //     "/sanctum/**": {
  //       proxy: "http://localhost:8000/sanctum/**",
  //       cors: true,
  //       headers: {
  //         "Access-Control-Allow-Origin": "http://localhost:3000",
  //         "Access-Control-Allow-Credentials": "true",
  //       },
  //     },
  //     "/api/**": {
  //       proxy: "http://localhost:8000/api/**",
  //       cors: true,
  //       headers: {
  //         "Access-Control-Allow-Origin": "http://localhost:3000",
  //         "Access-Control-Allow-Credentials": "true",
  //       },
  //     },
  //   },
  // },
  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook("vite:extendConfig", (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }));
      });
    },
    //...
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  vue: {
    template: {
      transformAssetUrls,
    },
  },
});
