export const oauthConfig = {
  clientId: process.env.REACT_APP_OAUTH_CLIENT_ID || "",
  authorizationEndpoint: process.env.REACT_APP_OAUTH_AUTH_ENDPOINT || "",
  tokenEndpoint: process.env.REACT_APP_OAUTH_TOKEN_ENDPOINT || "",
  redirectUri: process.env.REACT_APP_OAUTH_REDIRECT_URI || "",
  scopes: process.env.REACT_APP_OAUTH_SCOPES?.split(" ") || "",
};
