import { venuesUrl, limit } from "../constants";

/**
 * Creates a url to sort venue request
 * @param {String} sort a standard sort value to sort venues with
 * @returns {URL} a sorting url
 */
function createSortUrl(sort) {
  const sortOrder = sort === "name" ? "asc" : "desc";
  return `${venuesUrl}?sort=${sort}&sortOrder=${sortOrder}&_owner=true&limit=${limit}&page=1`;
}

export default createSortUrl;
