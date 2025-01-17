import { shallow } from "zustand/shallow";
import SearchLabel from "./label";
import { createdUrl, defaultUrl, nameUrl, priceUrl, ratingUrl, searchUrl } from "../../../js/constants";
import usePage from "../../store/page";
import { Col, Row } from "react-bootstrap";

/**
 * Creates a search and sort form
 * @returns {HTMLElement} a search and sort form
 */
function SearchSort() {
  const { searchText, updateUrl, updateSearchText } = usePage(
      (state) => ({
        searchText: state.searchText,
        updateUrl: state.updateUrl,
        updateSearchText: state.updateSearchText,
      }),
      shallow
    );

  function handleOnSearchChange (txt) {
    updateSearchText(txt);
    txt? updateUrl(searchUrl + txt + "&_owner=true&page=1") : updateUrl(defaultUrl);
  }

  function handleOnSortChange (sortUrl) {
    updateUrl(sortUrl)
  }
  return (
    <Row>
      <Col>
        <form className="input-group sort-form mt-3 mb-2 mb-md-3 mb-lg-4" onChange={(event) => handleOnSortChange(event.target.value)}>
          <label className="input-group-text" htmlFor="sortVenue">Sort by</label>
          <select id="sortVenue" name="sortVenue" className="form-control">
            <option value={createdUrl}>Date</option>
            <option value={nameUrl}>Name</option>
            <option value={ratingUrl}>Rating</option>
            <option value={priceUrl}>Price</option>
          </select>
        </form>
      </Col>
      <Col>
        <form className="input-group search-form mt-3 mb-2 mb-md-3 mb-lg-4" onSubmit={(event) => event.preventDefault()}>
          <SearchLabel />
          <input type="search" onChange={(event) => handleOnSearchChange(event.target.value)} className="form-control" id="search" value={searchText} placeholder="search for venues here"/>
        </form>
      </Col>
    </Row>
  );
}

export default SearchSort;