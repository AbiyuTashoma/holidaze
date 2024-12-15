async function api(reqUrl, reqOption) {
  const response = await fetch(reqUrl, reqOption);
  try {
    const json = await response.json();
    return json;
  } catch (error) {
    throw new Error(response.statusText);
  }
}

export default api;
