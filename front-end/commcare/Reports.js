import {fetchCommCareApi} from "./Client";

// export class Report {
//   constructor(data) {
//     this.data = data;
//   }
// }

export function listReports(username, apiKey, domain, options) {
  const api = `https://www.commcarehq.org/a/${domain}/api/v0.5/simplereportconfiguration/?format=json`;
  fetchCommCareApi(
    api, username, apiKey, {
      onSuccess: (response) => {
        console.log(response);
        options.onSuccess(response.objects);
      }
    }
  )
}


