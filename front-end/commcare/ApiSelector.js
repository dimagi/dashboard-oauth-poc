import React, {useState, useEffect}  from 'react';


function ApiSelector(props) {
  const [selectedApi, setSelectedApi] = useState('');
  const domainApis = getDomainApis();

  function apiSelected(apiId) {
    // console.log(apiId);
    setSelectedApi(apiId);
    props.apiSelected(domainApis[apiId]);
  };
  return (
    <div className="form-row my-2">
      <select className="form-control" value={selectedApi} onChange={(event) => apiSelected(event.target.value)}>
        <option value=''>Select an API</option>
        {Object.entries(domainApis).map((entry, id) => {
          const [apiId, apiDetails] = entry;
          return <option key={id} value={apiId}>{apiDetails.name}</option>;
        })}
      </select>
    </div>
  );
}

export function constructApiUrl(baseUrl, domain, endpoint) {
  return `${baseUrl}/a/${domain}/api/v0.5/${endpoint}/`;
}


function getDomainApis() {
  return {
    'cases': {
      'name': 'List Cases',
      'endpoint': 'case',
    },
    'forms': {
      'name': 'List Forms',
      'endpoint': 'form',
    },
    'user': {
      'name': 'List Mobile Workers',
      'endpoint': 'user',
    },
    'web-user': {
      'name': 'List Web Users',
      'endpoint': 'web-user',
    },
    'application': {
      'name': 'List Applications',
      'endpoint': 'application',
    },
    'location-type': {
      'name': 'List Location Types',
      'endpoint': 'location_type',
    },
    'location': {
      'name': 'List Locations',
      'endpoint': 'location',
    },

  }
}
export default ApiSelector;
