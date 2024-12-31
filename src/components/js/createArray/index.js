/**
 * Creates array of strings split at comma(,) and trimmed
 * @param {String} value input string value to be processed
 * @returns {Array} array of strings split at comma(,)
 */
function createArray(value) {
  const rawArray = value.split(",");
  let outputArray = [];
  rawArray.forEach((element) => {
    outputArray.push(element.trim());
  });

  return outputArray;
}

export default createArray;
