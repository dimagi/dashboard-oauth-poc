import React from 'react';

export function ApiKey(props) {
  const startAuth = function () {
    window.location = props.oauthClient.code.getUri();
  }
  const oauthButton = (
    <div>
      <p>or</p>
      <button onClick={() => startAuth()}>Click to Authorize CommCare</button>
    </div>
  );

  return (
    <div className="api-key-form">
      <h2>CommCare Credentials</h2>
      <p>Username</p>
      <input type="text" value={props.username} onChange={(event) => props.onUsernameChanged(event.target.value)}/>
      <p>API Key</p>
      <input type="text" style={{width: "25em"}} value={props.apiKey} onChange={(event) => props.onApiKeyChanged(event.target.value)}/>
      {props.devMode ? oauthButton : ''}
    </div>
  )
}
