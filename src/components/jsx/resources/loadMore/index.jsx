import { Button } from "react-bootstrap";
import usePage from "../../store/page";
import { shallow } from "zustand/shallow";

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
    <div className="d-flex justify-content-between m-2">
      <Button className="btn-secondary" onClick={() => updateUrl(prevPage)} disabled={EnableDisable(prevPage)} aria-label="previous page">Prev page</Button>
      <Button className="btn-secondary" onClick={() => updateUrl(nextPage)} disabled={EnableDisable(nextPage)} aria-label="next page">Next page</Button>
    </div>
  );
}

export default LoadMore;
