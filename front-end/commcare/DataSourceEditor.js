import React, {useState, useEffect}  from 'react';
import DomainSelector from "./DomainSelector";
import {getOAuth2TokenAuthorization} from "./Client";
import {listDataSources} from "./Reports";


function DataSourceSelector(props) {
  const [dataSources, setDataSources] = useState([]);
  const [dataSource, setDataSource] = useState(props.domain || '');

  useEffect(() => {
    listDataSources(
      props.config.COMMCARE_URL, props.domain, props.authorization, {
        onSuccess: setDataSources,
        onError: () => {
          console.error('error!');
        }
      });
  }, [props.authorization, props.domain]);

  const dataSourceSelected = function (value) {
    setDataSource(value);
    props.dataSourceSelected(value);
  };

  return (
    <p>
      Data Source:
      <select value={dataSource} onChange={(event) => dataSourceSelected(event.target.value)}>
        <option value=''>Select a Data Source</option>
        {dataSources.map((dataSourceObj, key) => {
          return <option key={key} value={dataSourceObj.id}>{dataSourceObj.display_name}</option>;
        })}
      </select>
    </p>
  )
}


function DataSourceEditor(props) {
  const [domain, setDomain] = useState('');
  const [allDataSources, setAllDataSources] = useState([]);
  const [selectedDataSource, setSelectedDataSource] = useState(null);
  const authorization = getOAuth2TokenAuthorization(props.authToken);

  return (
    <>
      <h2>CommCare Data Source Editor</h2>
      <DomainSelector baseUrl={props.config.COMMCARE_URL} authToken={props.authToken} domainSelected={(domain) => setDomain(domain)} />

      {
        domain ?
          <>
            <h3>All Data Sources in {domain}</h3>
            <DataSourceSelector
              config={props.config}
              domain={domain}
              authorization={authorization}
              dataSources={allDataSources}
              dataSourceSelected={setSelectedDataSource}>
            </DataSourceSelector>
          </> :
          <p>Select a domain to see available data sources</p>
      }
    </>
  )
}


export default DataSourceEditor
