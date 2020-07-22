import React, {useState}  from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";

import './App.sass';
import ApiExplorer from "./commcare/ApiExplorer";
import ReportDashboard from "./commcare/ReportDashboard";
import {ApiKey} from "./commcare/ApiKey";
import {getOAuthClient, AuthCallback} from "./commcare/Auth";
import Config from "./commcare/Config";

function App() {
  const config = Config();

  const devMode = config.COMMCARE_DEV_MODE || false;
  const authToken = config.COMMCARE_AUTH_TOKEN;
  const [username, setUsername] = useState(config.COMMCARE_DEFAULT_USERNAME);
  const [apiKey, setApiKey] = useState(config.COMMCARE_DEFAULT_API_KEY);
  const navLinks = (
    <header>
      <Link to="/">Authentication</Link>
      <Link to="/explorer">API Explorer</Link>
      {devMode ? <Link to="/dashboard">Report Explorer</Link> : '' }
    </header>
  );
  const oauthClient = getOAuthClient();
  return (
    <Router>
      <div className="App">
        {navLinks}
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/explorer">
            <ApiExplorer devMode={devMode} username={username} apiKey={apiKey} authToken={authToken}/>
          </Route>
          <Route path="/dashboard">
            <ReportDashboard username={username} apiKey={apiKey} />
          </Route>
          <Route path="/auth">
            <AuthCallback oauthClient={oauthClient}/>
          </Route>
          <Route path="/">
            <ApiKey devMode={devMode} oauthClient={oauthClient} username={username} apiKey={apiKey}
              onUsernameChanged={(username) => setUsername(username)}
              onApiKeyChanged={(apiKey) => setApiKey(apiKey)}
            />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
