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
    scopes: ['view_reports']
  });
  return auth;
}


export function AuthCallback(props) {
  const location = useLocation();
  const params = qs.parse(location.search, { ignoreQueryPrefix: true });
  const success = <p>You successfully authed!</p>;
  const error = <p>There was an error! {params.error}</p>;
  if (params.code) {
    props.oauthClient.code.getToken(location).then((user) => {
      console.log('success!');
      console.log(user);
      user.refresh().then(function (updatedUser) {
        console.log(updatedUser.accessToken);
        user.sign({
          method: 'get',
          url: process.env.REACT_APP_COMMCARE_DEFAULT_API,
        });


      });
    })

  }
  return (
    <div>
    {params.code ? success : error}
    </div>
  );
}

