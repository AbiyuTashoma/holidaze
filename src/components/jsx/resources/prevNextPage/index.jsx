import { Button } from "react-bootstrap";
import usePage from "../../store/page";
import { shallow } from "zustand/shallow";
import urlUpdater from "../../../js/urlUpdater";
import enableDisable from "../../../js/enableDisable";

/**
 * Creates previous next navigation elements
 * @returns {HTMLElement} previous next navigation
 */
function PrevNextPage({prevPage, nextPage, currentPage}) {
  const { url, updateUrl } = usePage(
    (state) => ({
      url: state.url,
      updateUrl: state.updateUrl,
    }),
    shallow
  );

  function handlePrevNextClick(urlAdr, page, cPage) {
    updateUrl(urlUpdater(urlAdr, page, cPage));
  }
  
  return (
    <div className="d-flex justify-content-evenly m-2">
      <Button 
        className="btn-secondary" 
        onClick={() => handlePrevNextClick(url, prevPage, currentPage)}
        href={"/venues/page=" + prevPage}
        disabled={enableDisable(prevPage)} 
        aria-label="previous page">
          Prev page
      </Button>
      <Button 
        className="btn-secondary" 
        onClick={() => handlePrevNextClick(url, nextPage, currentPage)} 
        href={"/venues/page=" + nextPage}
        disabled={enableDisable(nextPage)} 
        aria-label="next page">
          Next page
      </Button>
    </div>
  );
}

export default PrevNextPage;
