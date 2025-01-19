import { shallow } from "zustand/shallow";
import SearchLabel from "./label";
import { defaultUrl, limit, searchUrl } from "../../../js/constants";
import usePage from "../../store/page";
import { Col, Row } from "react-bootstrap";
import createSortUrl from "../../../js/createSortUrl";

/**
 * Creates a search and sort form
 * @returns {HTMLElement} a search and sort form
 */
function SearchSort() {
  const { searchText, sortBy, updateUrl, updateSearchText, updateSortBy } = usePage(
      (state) => ({
        searchText: state.searchText,
        sortBy: state.sortBy,
        updateUrl: state.updateUrl,
        updateSearchText: state.updateSearchText,
        updateSortBy: state.updateSortBy,
      }),
      shallow
    );

  function handleOnSearchChange (txt) {
    updateSearchText(txt);
    txt? updateUrl(`${searchUrl}${txt}&_owner=true&limit=${limit}&page=1`) : updateUrl(defaultUrl);
  }

  function handleOnSortChange (sortValue) {
    updateUrl(createSortUrl(sortValue));
    updateSortBy(sortValue);
    updateSearchText("");
  }
  return (
    <Row className="justify-content-center mx-auto search-sort">
      <Col>
        <form className="input-group mt-3 mb-2 mb-md-3 mb-lg-4" onChange={(event) => handleOnSortChange(event.target.value)}>
          <label className="input-group-text" htmlFor="sortVenue">Sort by</label>
          <select id="sortVenue" name="sortVenue" defaultValue={sortBy} className="form-control">
            <option value="created">Date</option>
            <option value="name">Name</option>
            <option value="rating">Rating</option>
            <option value="price">Price</option>
          </select>
        </form>
      </Col>
      <Col>
        <form className="input-group mt-3 mb-2 mb-md-3 mb-lg-4" onSubmit={(event) => event.preventDefault()}>
          <SearchLabel />
          <input type="search" onChange={(event) => handleOnSearchChange(event.target.value)} className="form-control" id="search" value={searchText} placeholder="search for venues here"/>
        </form>
      </Col>
    </Row>
  );
}

export default SearchSort;