import { MsalAuthProvider, LoginType } from 'react-aad-msal'
import config from '../Config'

// Msal Configurations
const authConfig: any = {
  auth: {
    // authority: 'https://login.microsoftonline.com/common',
    clientId: config.appId,
    // redirectUri: '<OPTIONAL REDIRECT URI>'
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: true
  }
};

// Authentication Parameters
const authenticationParameters = {
  scopes: config.scopes
}

// Options
const options = {
  loginType: LoginType.Redirect,
//   tokenRefreshUri: window.location.origin + '/auth.html'
}

export const authProvider = new MsalAuthProvider(authConfig, authenticationParameters, options)