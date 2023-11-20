/** @type {import('next').NextConfig} */
const NextFederationPlugin = require("@module-federation/nextjs-mf");

const nextConfig = {
  reactStrictMode: true,
  webpack(config, options) {
    if (!options.isServer) {
      //config.cache=false
      config.plugins.push(
        new NextFederationPlugin({
          name: "items",
          remotes: {},
          filename: "static/chunks/remoteEntry.js",
          exposes: {
            "./list": "./pages/index.tsx",
            "./components": "./components/index.ts",
          },
          shared: {},
          extraOptions: {},
        })
      );
    }

    return config;
  },
};

module.exports = nextConfig;
