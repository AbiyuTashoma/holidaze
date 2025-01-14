import CreateButton from "../../resources/createVenue/createButton";
import PrevNextPage from "../../resources/prevNextPage";
import Search from "../../resources/search";
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
      <Search />
      <VenuesData />
      <PrevNextPage />
      <ToTop />
    </div>
  )
}

export default Home;