/** @type {import('next').NextConfig} */
const nextConfig = {
    publicRuntimeConfig: {
        NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
      },
}

module.exports = nextConfig
