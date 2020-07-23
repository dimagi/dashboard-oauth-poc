import React, {useState, useEffect}  from 'react';
import {fetchCommCareApi} from "./Client";
import {listReports} from "./Reports";

function ReportDashboard(props) {
  const [domain, setDomain] = useState(props.config.COMMCARE_DOMAIN);
  const [allReports, setAllReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);

  const ALL = 'all';
  const choiceFilterOptions = [ALL, "hiking", "running", "surfing"];
  const [selectedChoice, setSelectedChoice] = useState(choiceFilterOptions[0]);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    listReports(
      props.username, props.apiKey, domain, {
        onSuccess: setAllReports,
      });
  }, [domain]);


  return (
    <div className="ReportDashboard">
      <p>Domain</p>
      <input type="text" value={domain} onChange={(event) => setDomain(event.target.value)}/>
      <h2>All Reports in {domain}</h2>
      <ReportList reports={allReports} reportClicked={setSelectedReport}></ReportList>
      { selectedReport ? <Report domain={domain} username={props.username} apiKey={props.apiKey} {...selectedReport} /> : <p>Select a Report to View Data</p>}
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
      <table>
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
  const url = `https://www.commcarehq.org/a/${props.domain}/api/v0.5/configurablereportdata/${props.id}/`;
  useEffect(() => {
    fetchCommCareApi(
      url, props.username, props.apiKey, {
        onSuccess: setReportData,
      }
    );
  }, [props.id]);
  console.log(props);
  return <div className="Report">
    <h1>{props.title}</h1>
    <ReportTable {...reportData} />
  </div>
}


function ReportTable(props) {
  return (
    <table>
      <thead>
      <tr>
        {props.columns ? props.columns.map((item, index) => {
          console.log(item);
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
