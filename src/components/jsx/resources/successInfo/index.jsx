import { Link } from "react-router-dom";

function SuccessInfo() {

    return (
        <div className="text-center my-5">
            <p className="mb-0">Your booking is successfully placed. An email is sent to you with the booking details.</p>
            <p className="mt-0">Thank you for choosing us!</p>
            <Link to={"/"} className="btn btn-primary btn-sm">Back to home</Link>
        </div>
    );
}

export default SuccessInfo;