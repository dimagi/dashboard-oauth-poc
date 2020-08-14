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


