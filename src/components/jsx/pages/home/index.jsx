import CreateButton from "../../resources/createVenue/createButton";
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
      <ToTop />
    </div>
  )
}

export default Home;