/**
 * Performs basic api fetch
 * @param {URL} reqUrl request url
 * @param {Object} reqOption request option
 * @returns JSOn or error
 */
async function basicApi(reqUrl, reqOption) {
  const response = await fetch(reqUrl, reqOption);
  try {
    const json = await response.json();
    return json;
  } catch (error) {
    throw new Error(response.statusText);
  }
}

export default basicApi;
