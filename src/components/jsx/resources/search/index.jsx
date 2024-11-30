import useApi from "../../store/api";
import useSearch from "../../store/search";
import { shallow } from "zustand/shallow";
import SearchLabel from "./label";


function Search() {
  const { updateVenues } = useApi(
    (state) => ({
      updateVenues: state.updateVenues,
    }),
    shallow
  );

  const { searchVenues } = useSearch(
    (state) => ({
      searchVenues: state.searchVenues,
    }),
    shallow
  );

  function handleOnChange (txt) {
    const newVenues = searchVenues.filter((item) => item['name'].toLowerCase().includes(txt.toLowerCase()));
    updateVenues(newVenues);
  }

  return (
      <form className="input-group search-form" onSubmit={(event) => event.preventDefault()}>
        <SearchLabel />
        <input type="search" onChange={(event) => handleOnChange(event.target.value)} className="form-control" id="search" placeholder="search here"/>
      </form>
  );
}

export default Search;