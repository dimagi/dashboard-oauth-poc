import React, {useState, useEffect, useRef} from 'react';
import DomainSelector from "./DomainSelector";
import {getOAuth2TokenAuthorization} from "./Client";
import {getDataSource, listDataSources, saveDataSource} from "./Reports";
import SchemaEditor from "../SchemaEditor";


function DataSourceSelector(props) {
  const [dataSources, setDataSources] = useState([]);
  const [dataSource, setDataSource] = useState(props.domain || '');

  // list data sources when domain is selected
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
      <select className="form-control" value={dataSource} onChange={(event) => dataSourceSelected(event.target.value)}>
        <option value=''>Select a Data Source</option>
        {dataSources.map((dataSourceObj, key) => {
          return <option key={key} value={dataSourceObj.id}>{dataSourceObj.display_name}</option>;
        })}
      </select>
    </p>
  )
}


function DataSourceEditingUI(props) {
  const [dataSource, setDataSource] = useState(null);
  const [notification, setNotification] = useState('')
  const editorRef = useRef(null);
  useEffect(() => {
    getDataSource(
      props.config.COMMCARE_URL, props.domain, props.dataSourceId, props.authorization, {
        onSuccess: setDataSource,
        onError: () => {
          console.error('error!');
        }
      });
  }, [props.dataSourceId]);

  const cleanedDataSource = {
    'display_name': dataSource?.display_name,
    'configured_filter': dataSource?.configured_filter,
    'configured_indicators': dataSource?.configured_indicators,
  }

  const dataSourceSaved = () => {
    console.log('succesfully saved data source!');
    setNotification(`Successfully saved ${editorRef.current.editor.getValue().display_name}`);
    setTimeout(2000, () => {
      setNotification('');
    })
  }

  const saveDataSourceEvent = () => {
    const updatedDataSource = editorRef.current.editor.getValue();
    console.log('saving', updatedDataSource);
    saveDataSource(
      props.config.COMMCARE_URL, props.domain, props.dataSourceId, updatedDataSource, props.authorization, {
        onSuccess: dataSourceSaved,
        onError: () => {
          console.error('error!');
        }
      }
    );
  }
  if (props.dataSourceId && dataSource?.id === props.dataSourceId) {
    return (
      <>
        <SchemaEditor ref={editorRef} dataSource={cleanedDataSource} {...props} />
        <button className="btn btn-primary" onClick={saveDataSourceEvent}>Save</button>
        {notification ? <p className='alert alert-success'>{notification}</p> : ''}
      </>
    );
  } else {
    return <p>Loading...</p>
  }

}

function DataSourceEditor(props) {
  const [schema, setSchema] = useState({});
  const [domain, setDomain] = useState('');
  const [allDataSources, setAllDataSources] = useState([]);
  const [selectedDataSource, setSelectedDataSource] = useState(null);
  const authorization = getOAuth2TokenAuthorization(props.authToken);

  // populate the schema when this component loads
  useEffect(() => {
    fetch(DATA_SOURCE_SCHEMA_URL)
      .then((resp) => resp.json())
      .then((schemaObj) => {
        setSchema(schemaObj);
      });
  }, []);


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
            {selectedDataSource && schema ?
            <DataSourceEditingUI
              config={props.config}
              domain={domain}
              authorization={authorization}
              schema={schema}
              dataSourceId={selectedDataSource}>
            </DataSourceEditingUI> : ''}
          </> :
          <p>Select a domain to see available data sources</p>
      }
    </>
  )
}


export default DataSourceEditor
