/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";

/** @type {import("next").NextConfig} */
const config = {
    // allowedDevOrigins:[
    //     "https://11dd4857a44b.ngrok-free.app"
    // ]
};

export default config;
