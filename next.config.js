// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   // output: "export",
//   // basePath: "/whiteboxLearning-wbl",
//   // images: {
//   //   unoptimized: true,
//   // },
//   experimental: { missingSuspenseWithCSRBailout: false, },
// };

// module.exports = nextConfig;



/** @type {import('next').NextConfig} */
const nextConfig = { 

   images: {
    domains: ['whitebox-learning.com'],
  },
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  reactStrictMode: false,
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL ,
  },
};

module.exports = nextConfig;
