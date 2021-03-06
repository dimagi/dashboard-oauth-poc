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
import Config from "./commcare/Config";
import Cookies from 'js-cookie'
import CommCareAuthenticator from "./commcare/CommCareAuthenticator";

function App() {
  const config = Config();
  const devMode = config.COMMCARE_DEV_MODE || false;
  const authToken = Cookies.get('commcare-access-token');
  const refreshToken = Cookies.get('commcare-refresh-token');
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const navLinks = (
    <header>
      <Link to="/">API Explorer</Link>
      <Link to="/reports">Report Explorer</Link>
    </header>
  );

  const userConnected = function(user) {
    setUser(user);
    setIsAuthenticated(true);
  };

  return (
    <Router>
      <div className="App">
        {navLinks}
        <Switch>
          <Route path="/reports">
            <ReportDashboard config={config} authToken={authToken} />
          </Route>
          <Route path="/">
            <h1>CommCare API Explorer</h1>
            <CommCareAuthenticator config={config} authToken={authToken} refreshToken={refreshToken}
                                   user={user} setUser={userConnected}/>
            {isAuthenticated ? <ApiExplorer config={config} devMode={devMode} authToken={authToken} /> : ''}
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
