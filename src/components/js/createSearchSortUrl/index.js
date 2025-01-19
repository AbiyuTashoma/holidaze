import { venuesUrl, limit, searchUrl } from "../constants";

/**
 * Creates a url to search and/or sort venues with
 * @param {String} sort a standard sort value to sort venues with
 * @param {String} search a string value to be searched for
 * @returns {URL} a search-sort url
 */
function createSearchSortUrl(sort, search) {
  const sortOrder = sort === "name" ? "asc" : "desc";
  return search
    ? `${searchUrl}${search}&sort=${sort}&sortOrder=${sortOrder}&_owner=true&limit=${limit}&page=1`
    : `${venuesUrl}?sort=${sort}&sortOrder=${sortOrder}&_owner=true&limit=${limit}&page=1`;
}

export default createSearchSortUrl;
