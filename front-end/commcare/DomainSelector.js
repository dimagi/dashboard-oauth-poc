import React, {useState, useEffect}  from 'react';
import {getDomains, getOAuth2TokenAuthorization} from "./Client";


function DomainSelector(props) {
  const [domains, setDomains] = useState([]);
  const [domain, setDomain] = useState(props.domain);

  const authorization = getOAuth2TokenAuthorization(props.authToken);
  useEffect(() => {
    getDomains(
      authorization, {
        baseUrl: props.baseUrl,
        onSuccess: setDomains,
      });
  }, [authorization]);

  const domainSelected = function (value) {
    setDomain(value);
    props.domainSelected(value);
  };

  return (
    <p>
      Domain:
      <select value={domain} onChange={(event) => domainSelected(event.target.value)}>
        <option value=''>Select a Domain</option>
        {domains.map((domainObj, key) => {
          return <option key={key} value={domainObj.domain_name}>{domainObj.project_name}</option>;
        })}
      </select>
      or
      <input type="text" value={domain} onChange={(event) => domainSelected(event.target.value)}/>
    </p>
  )
}

export default DomainSelector;
