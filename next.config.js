/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["images.ctfassets.net", "nspruepytzau.usemoralis.com", "0wscxsxumeoq.usemoralis.com"],
  },
  env: {
    BASE_URL: process.env.BASE_URL,
    STAGE: process.env.STAGE,
    CONTENTFUL_MANAGEMENT_ACCESS_TOKEN: process.env.CONTENTFUL_MANAGEMENT_ACCESS_TOKEN,
    CONTENTFUL_CDA_ACCESS_TOKEN: process.env.CONTENTFUL_CDA_ACCESS_TOKEN,
    CONTENTFUL_SPACE_ID: process.env.CONTENTFUL_SPACE_ID,
    CONTENTFUL_ENV_ID: process.env.CONTENTFUL_ENV_ID,
    NEXT_AWS_S3_BUCKET: process.env.NEXT_AWS_S3_BUCKET,
    NEXT_AWS_REGION: process.env.NEXT_AWS_REGION,
    NEXT_AWS_ACCESS_KEY: process.env.NEXT_AWS_ACCESS_KEY,
    NEXT_AWS_SECRET_ACCESS_KEY: process.env.NEXT_AWS_SECRET_ACCESS_KEY
  }
}

module.exports = nextConfig
