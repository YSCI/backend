export default () => ({
  global: {
    environment: process.env.NODE_ENV ?? 'development',
    port: +process.env.HTTP_PORT ?? 8080,
  },
  auth: {
    jwtSecret: process.env.JWT_SECRET ?? 'secretKey',
    jwtExpirationTime: process.env.JWT_EXPIRATION_TIME ?? '24h',
  },
});
