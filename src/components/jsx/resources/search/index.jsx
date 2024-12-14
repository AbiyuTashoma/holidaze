import { shallow } from "zustand/shallow";
import SearchLabel from "./label";
import { baseUrl, searchUrl } from "../../../js/constants";
import usePage from "../../store/page";
import useApi from "../../store/api";

function Search() {
  const { updateUrl } = usePage(
      (state) => ({
        updateUrl: state.updateUrl,
      }),
      shallow
    );

  const { searchText, updateSearchText } = useApi(
    (state) => ({
      searchText: state.searchText,
      updateSearchText: state.updateSearchText,
    }),
    shallow
  );

  function handleOnChange (txt) {
    updateSearchText(txt);
    txt? updateUrl(searchUrl + txt + "&page=1") : updateUrl(baseUrl + "1");
  }

  return (
    <form className="input-group search-form" onSubmit={(event) => event.preventDefault()}>
      <SearchLabel />
      <input type="search" onChange={(event) => handleOnChange(event.target.value)} className="form-control" id="search" value={searchText} placeholder="search here"/>
    </form>
  );
}

export default Search;