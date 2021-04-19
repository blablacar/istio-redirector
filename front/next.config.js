module.exports = {
  publicRuntimeConfig: {
    GITHUB_ENABLED: false,
    API_URL: process.env.NEXT_PUBLIC_API_BASE_URL
      ? process.env.NEXT_PUBLIC_API_BASE_URL
      : "/",
  },
};
