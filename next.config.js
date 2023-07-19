const { i18n } = require("./next-i18next.config");

module.exports = {
  i18n,
  images: {
    domains: ["res.cloudinary.com", "cdn.pixabay.com"],
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
};
