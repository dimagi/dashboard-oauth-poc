import React, {useState, useEffect}  from 'react';
import {fetchCommCareApi, getAPIKeyAuthorization, getOAuth2TokenAuthorization} from "./Client";
import DomainSelector from "./DomainSelector";
import APISelector, {constructApiUrl} from "./ApiSelector";


function ApiExplorer(props) {
  const [apiUrl, setApiUrl] = useState(props.config.COMMCARE_DEFAULT_API);
  const [apiData, setApiData] = useState('');
  const [domain, setDomain] = useState('');
  const [apiDetails, setApiDetails] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isManual, setIsManual] = useState(true);
  const authorization = getOAuth2TokenAuthorization(props.authToken);
  const apiSelected = function(details) {
    setIsManual(false);
    setApiDetails(details);
  };
  const hasValidApi = domain && apiDetails;
  const computedApiUrl = ((hasValidApi && ! isManual) ?
    constructApiUrl(props.config.COMMCARE_URL, domain, apiDetails.endpoint)
    : apiUrl)
  ;

  const domainChanged = function(domain) {
    setIsManual(false);
    setDomain(domain);
  };

  const manuallySetApiUrl = function(url) {
    setIsManual(true);
    setApiUrl(url);
  };

  const hitApi = function () {
    setIsLoading(true);
    fetchCommCareApi(
      computedApiUrl, authorization, {
        onSuccess: (response) => {
          setIsLoading(false);
          try {
            setApiData(JSON.stringify(response, null, 2));
          } catch(err) {
            console.log(response);
          }
        },
        onError: (error) => {
          setIsLoading(false);
          console.error(error);
          setApiData(error.message);
        }
      }
    );
  };
  return (
    <div className="ApiExplorer">
      <p>Choose an API below, or enter the URL directly.</p>
      <DomainSelector baseUrl={props.config.COMMCARE_URL} authToken={props.authToken} domainSelected={(domain) => domainChanged(domain)} />
      <APISelector domain={domain} apiSelected={apiSelected}/>
      <label>API Url</label>
      <input className="form-control mb-2" type="text" style={{width: "60em"}} value={computedApiUrl} onChange={(event) => manuallySetApiUrl(event.target.value)}/>
      <input className="btn btn-primary" type="button" onClick={() => hitApi()} value="Request API"/>
      <h4 className="mt-4">API Results</h4>
      <pre className="bg-light px-2 py-2"><code>
        {isLoading ? "Loading..." : apiData}
      </code></pre>
    </div>
  );
}

export default ApiExplorer;
