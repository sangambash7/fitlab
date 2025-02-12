// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   images: {
//     domains: ["xmaaihljtfmgaqtseecq.supabase.co"],
//   },
// };

// export default nextConfig;

// module.exports = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "xmaaihljtfmgaqtseecq.supabase.co",
//         port: "",
//         pathname: "/storage/v1/object/public/**",
//         search: "",
//       },
//     ],
//   },
// };

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["xmaaihljtfmgaqtseecq.supabase.co"],
  },
};

module.exports = nextConfig;
