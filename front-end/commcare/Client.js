


export function getAPIKeyAuthorization(username, apiKey) {
  return `ApiKey ${username}:${apiKey}`;
}

export function getOAuth2TokenAuthorization(token) {
  return `Bearer ${token}`;
}

export function fetchCommCareApi(api, authorization, options) {
  const url = new URL(api);
  const method = options?.method || 'GET';
  if (options.urlParams) {
    url.search = new URLSearchParams(options.urlParams).toString();
  }
  fetch(url,
    {
      method: method,
      headers: new Headers({
        Authorization: authorization,
        'Content-Type': 'application/json'
      }),
      body: options?.body,
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


export function getCommCareUser(authorization, options) {
  options = options || {};
  const baseUrl = options.baseUrl || 'https://www.commcarehq.org';
  const api = `${baseUrl}/api/v0.5/identity/`;
  fetchCommCareApi(api, authorization, options);
}


export function getDomains(authorization, options) {
  options = options || {};
  const baseUrl = options.baseUrl || 'https://www.commcarehq.org';
  const api = `${baseUrl}/api/v0.5/user_domains/`;
  fetchCommCareApi(api, authorization, {
    onSuccess: (response) => {
      options.onSuccess(response.objects);
    }
  });
}
