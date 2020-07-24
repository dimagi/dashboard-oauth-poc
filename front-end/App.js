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
import {getOAuthClient} from "./commcare/Auth";
import Config from "./commcare/Config";
import Cookies from 'js-cookie'

function App() {
  const config = Config();
  const devMode = config.COMMCARE_DEV_MODE || false;
  const authToken = Cookies.get('commcare-access-token');
  const refreshToken = Cookies.get('commcare-refresh-token');

  const [username, setUsername] = useState(config.COMMCARE_DEFAULT_USERNAME);
  const [apiKey, setApiKey] = useState(config.COMMCARE_DEFAULT_API_KEY);
  const navLinks = (
    <header>
      <Link to="/">Authentication</Link>
      <Link to="/explorer">API Explorer</Link>
      <Link to="/dashboard">Report Explorer</Link>
    </header>
  );
  const oauthClient = getOAuthClient(config);
  return (
    <Router>
      <div className="App">
        {navLinks}
        <Switch>
          <Route path="/explorer">
            <ApiExplorer config={config} devMode={devMode} username={username} apiKey={apiKey} authToken={authToken}/>
          </Route>
          <Route path="/dashboard">
            <ReportDashboard config={config} username={username} apiKey={apiKey} />
          </Route>
          <Route path="/">
            <ApiKey config={config} devMode={devMode} oauthClient={oauthClient} username={username} apiKey={apiKey}
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
