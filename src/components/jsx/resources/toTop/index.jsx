import { Button } from "react-bootstrap";

/**
 * Creates a back to top button
 * @returns {HTMLElement} back to top button
 */
function ToTop() {
  return (
    <div className="d-flex justify-content-center my-2">
      <Button onClick={()=>window.scrollTo({ top: 0 })} variant="outline-primary">&#10595; Back to top</Button>
    </div>
  );
}

export default ToTop;
