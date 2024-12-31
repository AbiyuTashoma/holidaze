/**
 * Creates media objects from url list
 * @param {Array} mediaArray list of media urls
 * @param {String} name name of the venue creator
 * @returns {Array} array of media objects
 */
function createMedia(mediaArray, name) {
  let media = [];
  mediaArray.map((item) =>
    media.push({
      url: item,
      alt: name + "venue",
    })
  );

  return media;
}

export default createMedia;
