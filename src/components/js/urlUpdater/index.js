/**
 * Creates a new url
 * @param {URL} currentUrl current url
 * @param {Number} newPage number value of the new page
 * @returns {URL} a new URL with given page
 */
function urlUpdater(currentUrl, newPage) {
  return currentUrl.slice(0, currentUrl.length - 1) + newPage;
}

export default urlUpdater;
