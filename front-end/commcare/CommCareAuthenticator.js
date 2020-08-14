import React, {useState, useEffect}  from 'react';
import {
  Link,
} from "react-router-dom";
import {getOAuthClient, OAuthButton} from "./Auth";
import {getCommCareUser, getOAuth2TokenAuthorization} from "./Client";


function CommCareAuthenticator(props) {
  const oauthClient = getOAuthClient(props.config);
  const [isLoading, setIsLoading] = useState(Boolean(props.authToken));
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    if (props.authToken) {
      const authorization = getOAuth2TokenAuthorization(props.authToken);
      getCommCareUser(authorization, {
        baseUrl: props.config.COMMCARE_URL,
        onSuccess: (user) => {
          setIsLoading(false);
          setIsAuthenticated(true);
          props.setUser(user);
        }
      });
    }
  }, [props.authToken]);

  const getDisplayName = (user) => {
    return user ? ` ${user.first_name || user.username}` : '';
  };

  const helpText = (
    isAuthenticated ?
      <div>
        <p>Hello{getDisplayName(props.user)}!</p>
        <p>From here you can <Link to="/explorer">explore APIs</Link> or <Link to="/explorer">reports</Link>.</p>
        <p>If you're having issues you can also authorize again.</p>
      </div>
      :
      isLoading ?
        <p>Checking authentication status...</p> :
        <p>To use the tool you'll first have to authorize access to your CommCare data</p>
    );
  return (
    <div>
      {helpText}
      <OAuthButton client={oauthClient} />
    </div>
  );
}

export default CommCareAuthenticator;