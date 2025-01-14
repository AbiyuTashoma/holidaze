import { Link } from "react-router-dom";

/**
 * Creates a booking success confirmation elements
 * @returns {HTMLElement} booking success elements
 */
function SuccessInfo() {

    return (
        <div className="text-center my-5">
            <p className="mb-0">Your booking is successfully placed. Your booking is now available under your profile page.</p>
            <p className="mt-0">Thank you for choosing us!</p>
            <Link to={"/"} className="btn btn-primary btn-sm me-3">Back to home</Link>
            <Link to={"/profile"} className="btn btn-primary btn-sm">My profile</Link>
        </div>
    );
}

export default SuccessInfo;