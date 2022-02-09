import React, {useState, useEffect}  from 'react';
import {getDomains, getOAuth2TokenAuthorization} from "./Client";


function DomainSelector(props) {
  const [domains, setDomains] = useState([]);
  const [domain, setDomain] = useState(props.domain || '');

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
    <div className="form-row">
      <select className="form-control col-md-4" value={domain} onChange={(event) => domainSelected(event.target.value)}>
        <option value=''>Select a Domain</option>
        {domains.map((domainObj, key) => {
          return <option key={key} value={domainObj.domain_name}>{domainObj.project_name}</option>;
        })}
      </select>
      <span className="mx-2"> or </span>
      <input placeholder="domain" className="form-control col-md-4" type="text" value={domain} onChange={(event) => domainSelected(event.target.value)}/>
    </div>
  )
}

export default DomainSelector;
