const API_BASE = 'https://602fc537a1e9d20017af105e.mockapi.io/api/v1/';

export async function parseJsonResponse(response) {
  let json = null;
  try {
    json = await response.json();
  } catch (e) {
    // TODO Do something if response has no, or invalid JSON
  }

  if (response.ok) {
    return json;
  } else {
    const error = new Error(response.statusText);
    error.isFromServer = true;
    error.response = response;
    error.responseJson = json;

    throw error;
  }
}

export async function apiRequest(method, path, body = null) {
  const options = { method };
  if (body && method !== 'GET') {
    options.body = JSON.stringify(body);
  }

  const finalPath = API_BASE + path;
  const response = await fetch(finalPath, options);

  return parseJsonResponse(response);
}
