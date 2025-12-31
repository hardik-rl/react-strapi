// const { mergeConfig } = require('vite');

// module.exports = (config) => {
//   // Important: always return the modified config
//   return mergeConfig(config, {
//     resolve: {
//       alias: {
//         '@': '/src',
//       },
//     },
//   });
// };

const { mergeConfig } = require("vite");

module.exports = (config) => {
  return mergeConfig(config, {
    server: {
      allowedHosts: [
        "react-strapi-ztyl.onrender.com",
      ],
    },
    resolve: {
      alias: {
        "@": "/src",
      },
    },
  });
};
