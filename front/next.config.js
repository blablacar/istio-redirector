module.exports = {
  publicRuntimeConfig: {
    GITHUB_ENABLED: true,
    GITHUB_ENV_NAMES_AVAILABLE: ["staging-1", "preprod-1", "prod-1"],
    GITHUB_ENV_NAMESPACE: ["infra", "spa", "istio-system", "v3"],
    API_URL: process.env.NEXT_PUBLIC_API_BASE_URL ? process.env.NEXT_PUBLIC_API_BASE_URL : "/",
  },
};
