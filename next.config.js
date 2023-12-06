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
          remotes: {
            property: `property@${process.env.WEBPMP_V5_PROPERTIES_URL}/_next/static/chunks/remoteEntry.js`,
          },
          filename: "static/chunks/remoteEntry.js",
          exposes: {
            "./listItems": "./items/index.ts",
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
