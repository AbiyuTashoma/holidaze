import { Button } from "react-bootstrap";
import usePage from "../../store/page";
import { shallow } from "zustand/shallow";
import { baseUrl } from "../../../js/constants";

function EnableDisable(nxtPage) {
  return Boolean(nxtPage) ? false : true;
}

function LoadMore() {
    const { nextPage, prevPage, updateUrl } = usePage(
      (state) => ({
        nextPage: state.nextPage,
        prevPage: state.prevPage,
        updateUrl: state.updateUrl,
      }),
      shallow
    );
  
  return (
    <div className="d-flex justify-content-evenly m-2">
      <Button className="btn-secondary" onClick={() => updateUrl(baseUrl + prevPage)} disabled={EnableDisable(prevPage)} aria-label="previous page">Prev page</Button>
      <Button className="btn-secondary" onClick={() => updateUrl(baseUrl + nextPage)} disabled={EnableDisable(nextPage)} aria-label="next page">Next page</Button>
    </div>
  );
}

export default LoadMore;
