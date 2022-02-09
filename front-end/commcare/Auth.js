import React from 'react';
import {
  useParams,
  useLocation,
} from "react-router-dom";
import ClientOAuth2 from 'client-oauth2';
import * as qs from "qs";

export function getOAuthClient(config) {
  const clientId = config.COMMCARE_CLIENT_ID;
  const clientSecret = config.COMMCARE_CLIENT_SECRET;
  const redirectURI = config.COMMCARE_REDIRECT_URI;
  const hqUrl = config.COMMCARE_URL;
  const auth = new ClientOAuth2({
    clientId: clientId,
    clientSecret: clientSecret,
    accessTokenUri: `${hqUrl}/oauth/token/`,
    authorizationUri: `${hqUrl}/oauth/authorize/`,
    redirectUri: redirectURI,
    scopes: ['access_apis'],  // this must match what you have set in HQ
  });
  return auth;
}


export function OAuthButton(props) {
  const startAuth = function () {
    window.location = props.client.code.getUri();
  }
  return <button className="btn btn-primary" onClick={() => startAuth()}>Click to Authorize CommCare</button>
}
