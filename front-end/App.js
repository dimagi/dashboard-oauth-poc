import React, {useState}  from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";

import ApiExplorer from "./commcare/ApiExplorer";
import ReportDashboard from "./commcare/ReportDashboard";
import Config from "./commcare/Config";
import Cookies from 'js-cookie'
import CommCareAuthenticator from "./commcare/CommCareAuthenticator";
import DataSourceEditor from "./commcare/DataSourceEditor";

function App() {
  const config = Config();
  const devMode = config.COMMCARE_DEV_MODE || false;
  const authToken = Cookies.get('commcare-access-token');
  const refreshToken = Cookies.get('commcare-refresh-token');
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const navLinks = (
    <header>
      <ul className="nav">
        <li className="nav-item">
          <Link className="nav-link" to="/" >API Explorer</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/reports/">Report Explorer</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/data-source-editor/">Data Source Editor</Link>
        </li>
      </ul>
    </header>
  );

  const userConnected = function(user) {
    setUser(user);
    setIsAuthenticated(true);
  };

  return (
    <Router>
      <div className="container-xl">
        {navLinks}
        <Switch>
          <Route path="/reports/">
            <ReportDashboard config={config} authToken={authToken} />
          </Route>
          <Route path="/data-source-editor/">
            <DataSourceEditor config={config} authToken={authToken} />
          </Route>
          <Route path="/">
            <h2>CommCare API Explorer</h2>
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
