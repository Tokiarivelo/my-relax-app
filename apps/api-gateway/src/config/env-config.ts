export const envConfig = {
  // The port on which the application will run
  PORT: process.env.PORT || 3010,
  AUTH_URL: process.env.AUTH_URL || 'http://localhost:3001/graphql',
  PLACES_URL: process.env.PLACES_URL || 'http://localhost:3002/graphql',
};
