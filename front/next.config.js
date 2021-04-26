module.exports = {
  publicRuntimeConfig: {
    GITHUB_ENABLED: true,
    API_URL: process.env.NEXT_PUBLIC_API_BASE_URL ? process.env.NEXT_PUBLIC_API_BASE_URL : "/",
  },
};
