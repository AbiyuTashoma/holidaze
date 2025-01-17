import CreateButton from "../../resources/createVenue/createButton";
import PrevNextPage from "../../resources/prevNextPage";
import SearchSort from "../../resources/searchSort";
import ToTop from "../../resources/toTop";
import VenuesData from "../../resources/venuesData";

/**
 * Displays the home page
 * @returns {HTMLElement} home page
 */
function Home() {
  return (
    <div>
      <CreateButton />
      <SearchSort />
      <VenuesData />
      <PrevNextPage />
      <ToTop />
    </div>
  )
}

export default Home;