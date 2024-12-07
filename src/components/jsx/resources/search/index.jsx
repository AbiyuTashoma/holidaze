import { shallow } from "zustand/shallow";
import SearchLabel from "./label";
import { baseUrl, searchUrl } from "../../../js/constants";
import usePage from "../../store/page";

function Search() {
  const {  updateUrl } = usePage(
      (state) => ({
        updateUrl: state.updateUrl,
      }),
      shallow
    );

  function handleOnChange (txt) {
    txt? updateUrl(searchUrl + txt) : updateUrl(baseUrl + "1");
  }

  return (
      <form className="input-group search-form" onSubmit={(event) => event.preventDefault()}>
        <SearchLabel />
        <input type="search" onChange={(event) => handleOnChange(event.target.value)} className="form-control" id="search" placeholder="search here"/>
      </form>
  );
}

export default Search;