// module.exports = () => ({});

// export default {
//   graphql: {
//     enabled: true,
//     config: {
//       defaultLimit: 10,
//       apolloServer: {
//         introspection: true,
//       },
//     },
//   },
// };

// module.exports = ({ env }) => ({
//   upload: {
//     config: {
//       provider: 'cloudinary',
//       providerOptions: {
//         cloud_name: env('dazfzwvi8'),
//         api_key: env('838742257568562'),
//         api_secret: env('CLOUDINARY_SECRET'),
//       },
//     },
//   },
// });

export default ({ env }) => ({
  upload: {
    config: {
      provider: 'cloudinary',
      providerOptions: {
        cloud_name: env('CLOUDINARY_NAME'),
        api_key: env('CLOUDINARY_KEY'),
        api_secret: env('CLOUDINARY_SECRET'),
      },
      actionOptions: {
        upload: {},
        delete: {},
      },
    },
  },
});

