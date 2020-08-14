import React, {useState, useEffect}  from 'react';
import {
  Link,
} from "react-router-dom";
import {getOAuthClient, OAuthButton} from "./Auth";


function CommCareAuthenticator(props) {
  const oauthClient = getOAuthClient(props.config);
  const helpText = (
    props.authToken ?
      <div>
        <p>You've authenticated! Go <Link to="/explorer">explore APIs</Link> or <Link to="/explorer">reports</Link></p>
        <p>If you're having issues you can also authorize again</p>
      </div>
      :
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
