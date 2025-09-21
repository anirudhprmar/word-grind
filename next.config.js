/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";

/** @type {import("next").NextConfig} */
const config = {
reactStrictMode: false,
  typescript: {
    ignoreBuildErrors: true,
  },
  // allowedDevOrigins:["https://98e1d4909b5a.ngrok-free.app"]
};

export default config;
