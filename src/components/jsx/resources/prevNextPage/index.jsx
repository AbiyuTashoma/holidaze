import usePage from "../../store/page";
import { shallow } from "zustand/shallow";
import urlUpdater from "../../../js/urlUpdater";
import enableDisable from "../../../js/enableDisable";
import { Link } from "react-router-dom";

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
    <div className="d-flex justify-content-evenly gap-3 align-items-center my-4">
      <Link 
        className={prevPage ? "btn btn-secondary" : "btn btn-secondary disabled"}
        to={"/venues/page=" + prevPage}
        onClick={() => handlePrevNextClick(url, prevPage, currentPage)}
        disabled={enableDisable(prevPage)} 
        aria-label="previous page">
          Prev page
      </Link>
      <div className="text-decoration-underline">{currentPage}</div>
      <Link 
        className={nextPage ? "btn btn-secondary" : "btn btn-secondary disabled"}
        to={"/venues/page=" + nextPage}
        onClick={() => handlePrevNextClick(url, nextPage, currentPage)} 
        disabled={enableDisable(nextPage)} 
        aria-label="next page">
          Next page
      </Link>
    </div>
  );
}

export default PrevNextPage;
