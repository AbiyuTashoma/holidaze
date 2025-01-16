import { Button } from "react-bootstrap";
import usePage from "../../store/page";
import { shallow } from "zustand/shallow";
import urlUpdater from "../../../js/urlUpdater";
import enableDisable from "../../../js/enableDisable";

/**
 * Creates previous next navigation elements
 * @returns {HTMLElement} previous next navigation
 */
function PrevNextPage() {
  const { url, nextPage, prevPage, updateUrl } = usePage(
    (state) => ({
      url: state.url,
      nextPage: state.nextPage,
      prevPage: state.prevPage,
      updateUrl: state.updateUrl,
    }),
    shallow
  );
  
  return (
    <div className="d-flex justify-content-evenly m-2">
      <Button 
        className="btn-secondary" 
        onClick={() => updateUrl(urlUpdater(url, prevPage))}
        href={"/venues/page=" + prevPage}
        disabled={enableDisable(prevPage)} 
        aria-label="previous page">
          Prev page
      </Button>
      <Button 
        className="btn-secondary" 
        onClick={() => updateUrl(urlUpdater(url, nextPage))} 
        href={"/venues/page=" + nextPage}
        disabled={enableDisable(nextPage)} 
        aria-label="next page">
          Next page
      </Button>
    </div>
  );
}

export default PrevNextPage;
