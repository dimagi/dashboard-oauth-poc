import React from 'react';

export function ApiKey(props) {
  return (
    <div className="api-key-form">
      <h2>CommCare Credentials</h2>
      <p>Username</p>
      <input type="text" value={props.username} onChange={(event) => props.onUsernameChanged(event.target.value)}/>
      <p>API Key</p>
    </div>
  )
}
