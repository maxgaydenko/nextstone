/** @type {import('next').NextConfig} */
const {withKeystone} = require("@keystone-6/core/next");

const nextConfig = {
  reactStrictMode: true,
}

// module.exports = nextConfig

module.exports = withKeystone(nextConfig);
