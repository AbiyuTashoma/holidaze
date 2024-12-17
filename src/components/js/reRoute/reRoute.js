/***
 * Opens the current window with given path
 * example: reRoute("/") -> opens home page
 */
export default function reRoute(path) {
  window.open(path, "_self");
}
