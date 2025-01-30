/**
 ** Opens the current window with given path
 * example: reRoute("/") -> opens home page
 * @param {String} path
 */
function reRoute(path) {
  window.open(path, "_self");
}

export default reRoute;
