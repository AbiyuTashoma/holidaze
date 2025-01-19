import { shallow } from "zustand/shallow";
import SearchLabel from "./label";
import usePage from "../../store/page";
import { Col, Row } from "react-bootstrap";
import createSearchSortUrl from "../../../js/createSearchSortUrl";

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

  function handleOnSearchChange (search) {
    updateSearchText(search);
    updateUrl(createSearchSortUrl(sortBy, search));
  }

  function handleOnSortChange (sortValue) {
    updateSortBy(sortValue);
    updateUrl(createSearchSortUrl(sortValue, searchText));
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