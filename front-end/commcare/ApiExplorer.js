import React, {useState}  from 'react';
import {fetchCommCareApi, getAPIKeyAuthorization, getOAuth2TokenAuthorization} from "./Client";


function ApiExplorer(props) {
  const [api, setApi] = useState(props.config.COMMCARE_DEFAULT_API);
  const [apiData, setApiData] = useState('')
  const [isLoading, setIsLoading] = useState(false);
  const authorization = getOAuth2TokenAuthorization(props.authToken);
  const hitApi = function () {
    setIsLoading(true);
    fetchCommCareApi(
      api, authorization, {
        onSuccess: (response) => {
          setIsLoading(false);
          setApiData(JSON.stringify(response, null, 2));
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
      <h1>CommCare API Explorer</h1>
      <h2>API Url</h2>
      <input type="text" style={{width: "60em"}} value={api} onChange={(event) => setApi(event.target.value)}/>
      <br />
      <br />
      <input type="button" onClick={() => hitApi()} value="Request API"/>
      <h2>API Results</h2>
      <pre>
        {isLoading ? "Loading..." : apiData}
      </pre>
    </div>
  );
}

export default ApiExplorer;
