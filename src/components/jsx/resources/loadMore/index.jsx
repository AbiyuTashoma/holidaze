import { Button } from "react-bootstrap";
import useOffset from "../../store/offset";
import { shallow } from "zustand/shallow";

function LoadMore() {

  const { offset, setOffset, resetOffset } = useOffset(
    (state) => ({
      offset: state.offset,
      setOffset: state.setOffset,
      resetOffset: state.resetOffset,
    }),
    shallow
  );
  
  return (
    <div className="d-flex justify-content-center my-2">
      <Button className="btn-primary" onClick={ setOffset } aria-label="load more">Load more +</Button>
      <Button className="btn-primary" onClick={ resetOffset } aria-label="load more">Reset</Button>
    </div>
  );
}

export default LoadMore;