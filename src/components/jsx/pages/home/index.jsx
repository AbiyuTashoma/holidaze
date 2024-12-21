import CreateVenue from "../../resources/createVenue";
import LoadMore from "../../resources/loadMore";
import Search from "../../resources/search";
import ToTop from "../../resources/toTop";
import VenuesData from "../../resources/venuesData";

function Home() {
  return (
    <div>
      <CreateVenue />
      <Search />
      <VenuesData />
      <LoadMore />
      <ToTop />
    </div>
  )
}

export default Home;