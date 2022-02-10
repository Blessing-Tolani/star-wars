export async function client(endpoint) {
  let data;

  try {
    const response = await fetch(endpoint);
    data = await response.json();
    if (response.ok) {
      return {
        status: response.status,
        data,
      };
    }
    throw new Error(response.statusText);
  } catch (err) {
    return Promise.reject(err.message ? err.message : data);
  }
}

client.get = function (endpoint) {
  return client(endpoint);
};
