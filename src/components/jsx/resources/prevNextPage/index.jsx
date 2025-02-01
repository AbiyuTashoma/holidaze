import usePage from "../../store/page";
import { shallow } from "zustand/shallow";
import urlUpdater from "../../../js/urlUpdater";
import { Link } from "react-router-dom";

/**
 * Creates previous next navigation elements
 * @returns {HTMLElement} previous next navigation
 */
function PrevNextPage({prevPage, nextPage, currentPage, lastPage}) {
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
    <div className="d-flex justify-content-center gap-4 align-items-center my-4">
      <div>
        <Link 
          className={prevPage ? "btn btn-secondary btn-sm me-3" : "btn btn-secondary btn-sm me-3 disabled"}
          to={"/venues/page=" + 1}
          onClick={() => handlePrevNextClick(url, 1, currentPage)}
          aria-label="first page">
            1
        </Link>
        <Link 
          className={prevPage ? "btn btn-secondary" : "btn btn-secondary disabled"}
          to={"/venues/page=" + prevPage}
          onClick={() => handlePrevNextClick(url, prevPage, currentPage)}
          aria-label="previous page">
            <span>&#10094;&#10094;</span>
        </Link>
      </div>      
      <div className="text-decoration-underline fw-semibold">{currentPage}</div>
      <div>
        <Link 
          className={nextPage ? "btn btn-secondary" : "btn btn-secondary disabled"}
          to={"/venues/page=" + nextPage}
          onClick={() => handlePrevNextClick(url, nextPage, currentPage)} 
          aria-label="next page">
            <span>&#10095;&#10095;</span>
        </Link>
        <Link 
          className={nextPage ? "btn btn-secondary btn-sm ms-3" : "btn btn-secondary btn-sm ms-3 disabled"}
          to={"/venues/page=" + lastPage}
          onClick={() => handlePrevNextClick(url, lastPage, currentPage)}
          aria-label="last page">
            {lastPage}
        </Link>
      </div>
    </div>
  );
}

export default PrevNextPage;
