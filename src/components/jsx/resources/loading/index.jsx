import { Spinner } from "react-bootstrap";

function Loading () {
    return (
        <div className="text-center">
            <Spinner animation="border" className="border-dotted" data-testid="loading-spinner"/>
        </div>
    );
};

export default Loading;