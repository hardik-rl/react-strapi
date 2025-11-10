// module.exports = () => ({});

export default {
  graphql: {
    enabled: true,
    config: {
      defaultLimit: 10,
      apolloServer: {
        introspection: true,
      },
    },
  },
};
