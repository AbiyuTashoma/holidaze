/**
 * Creates a new url
 * @param {URL} currentUrl current url
 * @param {Number} newPage number value of the new page
 * @param {Number} currentPage number value of the current page
 * @returns {URL} a new URL with new page
 */
function urlUpdater(currentUrl, newPage, currentPage) {
  const currentPageLength = currentPage.toString().length;
  const newUrl =
    currentUrl.slice(0, currentUrl.length - currentPageLength) + newPage;
  return newUrl;
}

export default urlUpdater;
