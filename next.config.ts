import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The dev server is shared through cloudflared quick tunnels for reviews;
  // Next 16 rejects dev requests from other origins unless they are listed.
  allowedDevOrigins: ["*.trycloudflare.com", "*.ngrok-free.app", "*.ngrok.app"],
};

export default nextConfig;
