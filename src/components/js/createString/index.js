/**
 * Create a string separated by a comma
 * @param {Array} mediaObject array of media objects
 * @returns {String} a string separated by a comma
 */
function createString(mediaObject) {
  let rawString = "";
  mediaObject.map((item) => (rawString += item["url"] + ","));
  const mediaString = rawString.slice(0, rawString.length - 1);

  return mediaString;
}

export default createString;
