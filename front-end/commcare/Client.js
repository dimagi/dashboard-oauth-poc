


export function getAPIKeyAuthorization(username, apiKey) {
  return `ApiKey ${username}:${apiKey}`;
}

export function getOAuth2TokenAuthorization(token) {
  return `Bearer ${token}`;
}

export function fetchCommCareApi(api, authorization, options) {
  let url = new URL(api);
  if (options.urlParams) {
    url.search = new URLSearchParams(options.urlParams).toString();
  }
  fetch(url,
    {
      method: "GET",
      headers: new Headers({
        Authorization: authorization,
      })
    }
  )
    .then(res => res.json())
    .then(response => {
      if (options.onSuccess) {
        options.onSuccess(response);
      }
    })
    .catch(error => {
      if (options.onError) {
        console.error(error);
        options.onError(error);
      }
    });
}
