import React, {useState, useEffect}  from 'react';
import {fetchCommCareApi, getOAuth2TokenAuthorization} from "./Client";
import {listReports} from "./Reports";
import DomainSelector from "./DomainSelector";

function ReportDashboard(props) {
  const [domain, setDomain] = useState('');
  const [allReports, setAllReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const authorization = getOAuth2TokenAuthorization(props.authToken);
  const ALL = 'all';
  const choiceFilterOptions = [ALL, "hiking", "running", "surfing"];
  const [selectedChoice, setSelectedChoice] = useState(choiceFilterOptions[0]);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    setSelectedReport(null);
    setAllReports([]);
    listReports(
      props.config.COMMCARE_URL, domain, authorization, {
        onSuccess: setAllReports,
        onError: () => {
          console.error('error!');
        }
      });
  }, [domain]);


  const noDomain = (
    <>
      <p><strong>Select a domain to see available reports</strong></p>
      <p>Note: only project reports (e.g. those created in report builder) show up here.</p>
    </>
  )

  return (
    <div className="ReportDashboard">
      <h2>CommCare Report Explorer</h2>
      <DomainSelector baseUrl={props.config.COMMCARE_URL} authToken={props.authToken} domainSelected={(domain) => setDomain(domain)} />
      {
        domain ?
          <>
            <h3>All Reports in {domain}</h3>
            <ReportList reports={allReports} reportClicked={setSelectedReport}></ReportList>
          </> :
          noDomain
      }

      { selectedReport ?
        <Report commcareUrl={props.config.COMMCARE_URL} domain={domain} authorization={authorization} {...selectedReport} /> :
        allReports.length ? <p>Select a Report to View Data</p> : ''}
      {/*<h2>Filters</h2>*/}
      {/*<p>Type</p>*/}
      {/*<select onChange={(event) => setSelectedChoice(event.target.value)}>*/}
        {/*{choiceFilterOptions.map((choice, index) => {*/}
          {/*return <option key={index} value={choice} >{choice}</option>*/}
        {/*})}*/}
      {/*</select>*/}
    </div>
  )
}

function ReportList(props) {
  if (props.reports.length) {
    return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Report</th>
          </tr>
        </thead>
        <tbody>
        {props.reports.map((report, index) => {
          return (
            <tr key={index} onClick={() => props.reportClicked(report)}>
              <td>{report.title}</td>
            </tr>
          )
        })}
        </tbody>
      </table>
    )
  } else {
    return <p>No reports found...</p>
  }
}

function Report(props) {
  const [reportData, setReportData] = useState({});
  const url = `${props.commcareUrl}/a/${props.domain}/api/v0.5/configurablereportdata/${props.id}/`;
  useEffect(() => {
    fetchCommCareApi(
      url, props.authorization, {
        onSuccess: setReportData,
      }
    );
  }, [props.id]);
  return <div className="Report">
    <h3>{props.title}</h3>
    <ReportTable {...reportData} />
  </div>
}


function ReportTable(props) {
  return (
    <table className="table table-striped">
      <thead>
      <tr>
        {props.columns ? props.columns.map((item, index) => {
          return <th key={index}>{item.header}</th>
        }) : <th>No data</th>}
      </tr>
      </thead>
      <tbody>
      {props.data ? props.data.map((row, index) => {
        return (
          <tr key={index}>
            { Object.keys(row).map((item, index) => {
              return <td key={index}>{row[item]}</td>
            })}
          </tr>
        )
      }) : <tr><td>No data</td></tr>}
      </tbody>
    </table>
  )
}

export default ReportDashboard;
