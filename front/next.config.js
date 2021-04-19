module.exports = {
  publicRuntimeConfig: {
    GITHUB_ENABLED: true,
    GITHUB_ENV_NAMES_AVAILABLE: ["preprod-1", "prod-1"],
    API_URL: process.env.NEXT_PUBLIC_API_BASE_URL ? process.env.NEXT_PUBLIC_API_BASE_URL : "/",
  },
};
