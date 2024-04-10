/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.hbs$/,
      loader: 'handlebars-loader'
    });

    return config;
  }
};

export default nextConfig;
