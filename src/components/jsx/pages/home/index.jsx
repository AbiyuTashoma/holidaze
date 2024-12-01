import LoadMore from "../../resources/loadMore";
import Search from "../../resources/search";
import ToTop from "../../resources/toTop";
import VenuesData from "../../resources/venuesData";

function Home() {
  return (
    <div>
      <Search />
      <VenuesData />
      <LoadMore />
      <ToTop />
    </div>
  )
}

export default Home;