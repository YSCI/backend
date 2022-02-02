export default () => ({
  global: {
    environment: process.env.NODE_ENV ?? 'development',
    port: +process.env.HTTP_PORT ?? 8080,
  },
});
