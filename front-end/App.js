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

  const navLinks = (
    <header>
      <Link to="/">Authentication</Link>
      <Link to="/explorer">API Explorer</Link>
      <Link to="/dashboard">Report Explorer</Link>
    </header>
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
            <CommCareAuthenticator config={config} authToken={authToken} refreshToken={refreshToken}
                                   user={user} setUser={(newUser) => setUser(newUser)}/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
