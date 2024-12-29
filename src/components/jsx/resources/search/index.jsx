import { shallow } from "zustand/shallow";
import SearchLabel from "./label";
import { baseUrl, searchUrl } from "../../../js/constants";
import usePage from "../../store/page";

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
    txt? updateUrl(searchUrl + txt + "&_owner=true&page=1") : updateUrl(baseUrl + "1");
  }

  return (
    <form className="input-group search-form" onSubmit={(event) => event.preventDefault()}>
      <SearchLabel />
      <input type="search" onChange={(event) => handleOnChange(event.target.value)} className="form-control" id="search" value={searchText} placeholder="search here"/>
    </form>
  );
}

export default Search;