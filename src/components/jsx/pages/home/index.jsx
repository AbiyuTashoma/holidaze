import CreateButton from "../../resources/createVenue/createButton";
import LoadMore from "../../resources/loadMore";
import Search from "../../resources/search";
import ToTop from "../../resources/toTop";
import VenuesData from "../../resources/venuesData";

function Home() {
  return (
    <div>
      <CreateButton />
      <Search />
      <VenuesData />
      <LoadMore />
      <ToTop />
    </div>
  )
}

export default Home;