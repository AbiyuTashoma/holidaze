import createArray from "../createArray";

/**
 * Validates list of urls created from a string input
 * @param {String} value url value input
 * @returns {Boolean} validity of the value
 */
function validateUrl(value) {
  const urlMatch =
    /^(http(s)?:\/\/.)[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)$/;
  const urlArray = createArray(value);
  let valid = true;

  if (value) {
    urlArray.map((url) => (valid &&= urlMatch.test(url)));
  }

  return valid;
}

export default validateUrl;
