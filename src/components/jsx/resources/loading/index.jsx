import { Spinner } from "react-bootstrap";

/**
 * Creates loading spinner
 * @returns {HTMLElement} loading spinner
 */
function Loading () {
    return (
        <div className="text-center my-5">
            <Spinner animation="border" className="border-dotted" data-testid="loading-spinner"/>
        </div>
    );
};

export default Loading;