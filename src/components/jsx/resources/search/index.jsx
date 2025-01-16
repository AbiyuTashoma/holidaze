import { shallow } from "zustand/shallow";
import SearchLabel from "./label";
import { createdByUrl, searchUrl } from "../../../js/constants";
import usePage from "../../store/page";

/**
 * Creates a search form
 * @returns {HTMLElement} a search form
 */
function Search() {
  const { searchText, updateUrl, updateSearchText } = usePage(
      (state) => ({
        searchText: state.searchText,
        updateUrl: state.updateUrl,
        updateSearchText: state.updateSearchText,
      }),
      shallow
    );

  function handleOnChange (txt) {
    updateSearchText(txt);
    txt? updateUrl(searchUrl + txt + "&_owner=true&page=1") : updateUrl(createdByUrl + "1");
  }

  return (
    <form className="input-group search-form mt-3 mb-2 mb-md-3 mb-lg-4" onSubmit={(event) => event.preventDefault()}>
      <SearchLabel />
      <input type="search" onChange={(event) => handleOnChange(event.target.value)} className="form-control" id="search" value={searchText} placeholder="search for venues here"/>
    </form>
  );
}

export default Search;