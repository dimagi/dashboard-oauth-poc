import {fetchCommCareApi} from "./Client";


export function listReports(baseUrl, domain, authorization, options) {
  const api = `${baseUrl}/a/${domain}/api/v0.5/simplereportconfiguration/?format=json`;
  fetchCommCareApi(
    api, authorization, {
      onSuccess: (response) => {
        options.onSuccess(response.objects);
      },
      onError: options.onError,
    }
  )
}


export function listDataSources(baseUrl, domain, authorization, options) {
  const api = `${baseUrl}/a/${domain}/api/v0.5/ucr_data_source/?format=json`;
  fetchCommCareApi(
    api, authorization, {
      onSuccess: (response) => {
        options.onSuccess(response.objects);
      },
      onError: options.onError,
    }
  )
}


export function getDataSource(baseUrl, domain, dataSourceId, authorization, options) {
  const api = `${baseUrl}/a/${domain}/api/v0.5/ucr_data_source/${dataSourceId}/?format=json`;
  fetchCommCareApi(
    api, authorization, {
      onSuccess: (response) => {
        options.onSuccess(response);
      },
      onError: options.onError,
    }
  )
}
