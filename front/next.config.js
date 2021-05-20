module.exports = {
  publicRuntimeConfig: {
    API_URL: process.env.NEXT_PUBLIC_API_BASE_URL ? process.env.NEXT_PUBLIC_API_BASE_URL : "/",
  },
};
