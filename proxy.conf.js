const PROXY_CONFIG = [
  {
    context: [
      '/api-token-auth',
      '/api-token-refresh',
      '/graphql',
    ],
    target: 'http://localhost:8081',
    secure: false
  }
];

module.exports = PROXY_CONFIG;
