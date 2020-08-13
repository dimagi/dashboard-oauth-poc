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
import {getOAuthClient, OAuthButton} from "./commcare/Auth";
import Config from "./commcare/Config";
import Cookies from 'js-cookie'

function App() {
  const config = Config();
  const devMode = config.COMMCARE_DEV_MODE || false;
  const authToken = Cookies.get('commcare-access-token');
  const refreshToken = Cookies.get('commcare-refresh-token');

  const navLinks = (
    <header>
      <Link to="/">Authentication</Link>
      <Link to="/explorer">API Explorer</Link>
      <Link to="/dashboard">Report Explorer</Link>
    </header>
  );
  const oauthClient = getOAuthClient(config);
  const helpText = (
    authToken ?
      <div>
        <p>You've authenticated! Go <Link to="/explorer">explore APIs</Link> or <Link to="/explorer">reports</Link></p>
        <p>If you're having issues you can also authorize again</p>
      </div>
      :
      <p>To use the tool you'll first have to authorize access to your CommCare data</p>
    );
  return (
    <Router>
      <div className="App">
        {navLinks}
        <Switch>
          <Route path="/explorer">
            <ApiExplorer config={config} devMode={devMode} authToken={authToken}/>
          </Route>
          <Route path="/dashboard">
            <ReportDashboard config={config} authToken={authToken} />
          </Route>
          <Route path="/">
            <h2>Welcome to the CommCare API demo!</h2>
            {helpText}
            <OAuthButton client={oauthClient} />

          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
